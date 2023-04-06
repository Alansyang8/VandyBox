import Body from "../components/Body";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


function Home() {
  //const userData = useLoaderData();
  const navigate = useNavigate();


  useEffect(() => {
    // Observe auth state to redirect to login/home page
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      navigate("/");
      const userEmail = user.email;
      const userIdRef = doc(db, 'userIdMap', userEmail);
      const docSnap = await getDoc(userIdRef);

      if (docSnap.exists()) {
        
      } else {
        console.error("Could not find document.");
      }
    } else {
      navigate("/login");
    }
  });
  }, [auth]);

  return (
    <div className="Home">
      <Body></Body>
    </div>
  );
}

export default Home;