import React, { useState } from "react";
import { redirectToSignInPopup } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errorOccurred, setErrorOccurred] = useState(false);

  const handleSubmit = async () => {
    redirectToSignInPopup();

    // Observe auth state to redirect to login/home page
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userEmail = user.email;
        const userIdRef = doc(db, "userIdMap", userEmail);
        let docSnap = await getDoc(userIdRef);

        let id = "";
        if (!docSnap.exists()) {
          let newId = user.email.substring(0, user.email.indexOf("@"));
          newId = newId.replace(/[^a-zA-Z ]/g, "")
          await setDoc(doc(db, "userIdMap", user.email), {
            userId: newId,
          });
          docSnap = await getDoc(userIdRef);
        }
        
          id = docSnap.data().userId;
          const userDataRef = doc(db, "users", id);
          const userDataSnap = await getDoc(userDataRef);

          if (!userDataSnap.exists()) {
            await setDoc(doc(db, "users", id), {
              additionalInfo: "",
              favorites: [38757],
              handle: id,
              name: "",
              statusMsg: "",
              toWatch: [502356],
              seen: [38757, 181812],
              topThreeMovies: [],
              friends: ["richardtli"],
              Likes: [38757],
              Dislikes: [181812],
              image: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FSD56w%2FbtrAdb05hgt%2FkWCR1qc8YyE0sjrg1hx7Ek%2Fimg.jpg"
            });
          }
        navigate("/");
      }
    });
  };

  return (
    <div>
      <div className="flex justify-center items-center w-screen h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center space-y-4">
          <span className="font-bold text-2xl">VandyBox</span>
          <div className="flex items-center justify-between">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}>
              Login with Vandy Email
            </button>
          </div>
          {errorOccurred && (
            <span className="font-light text-red-600 text-sm italic">
              Error occurred while logging in.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
