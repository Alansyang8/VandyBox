import React, { useState } from "react";
import { redirectToSignInPopup } from "../auth/auth"
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
        const userIdRef = doc(db, 'userIdMap', userEmail);
        const docSnap = await getDoc(userIdRef);
        let id = "";
        if (docSnap.exists()) {

          id = docSnap.data().userId;
          const userDataRef = doc(db, "users", id);
          const userDataSnap = await getDoc(userDataRef);

          if (!userDataSnap.exists()) {
            await setDoc(doc(db, "users", id), {
              additionalInfo: "",
              favorites: [],
              handle: id,
              name: "",
              statusMsg: "",
              toWatch: [],
              seen: [],
              topThreeMovies: [],
              friends: []
            });
          }
        } else {
          console.error("Could not find document.");
        }
        navigate("/");
      }
    })
  }

  return (
    <div>
      <div className="flex justify-center items-center w-screen h-screen">
        <div
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center items-center space-y-4"
        >
          <span className="font-bold text-2xl">VandyBox</span>
          <div className="flex items-center justify-between">
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Login with Vandy Email
            </button>
          </div>
          {errorOccurred && <span className="font-light text-red-600 text-sm italic">Error occurred while logging in.</span>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
