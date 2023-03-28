import Body from "../components/Body";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  addToFavorites,
  deleteFromFavorites,
  addToToWatch,
  deleteFromToWatch,
  addToToSeen,
  deleteFromSeen
} from "../api/firebaseWriter";
import { useLoaderData } from "react-router-dom";

function Home() {
  //const userData = useLoaderData();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [listOfFavorites, setListOfFavorites] = useState([]);
  const [toWatchList, setToWatchList] = useState([]);
  const [seenList, setSeenWatchList] = useState([]);

  

  async function handleAddToFavorites(userId, movieID)  {
    const userEmail = auth.currentUser.email;
    const userIdRef = doc(db, "userIdMap", userEmail);
    const docSnap = await getDoc(userIdRef);
    if (docSnap.exists()) {
      addToFavorites(userId, movieID)
    } else {
      console.error("Could not find document.");
    }
  };

  async function handleRemoveFromFavorites(userId, movieID)  {
    const userEmail = auth.currentUser.email;
    const userIdRef = doc(db, "userIdMap", userEmail);
    const docSnap = await getDoc(userIdRef);
    if (docSnap.exists()) {
      deleteFromFavorites(userId, movieID)
    } else {
      console.error("Could not find document.");
    }
  };

  async function handleAddToWatch(userId, movieID)  {
    const userEmail = auth.currentUser.email;
    const userIdRef = doc(db, "userIdMap", userEmail);
    const docSnap = await getDoc(userIdRef);
    if (docSnap.exists()) {
      addToToWatch(userId, movieID)
    } else {
      console.error("Could not find document.");
    }
  };

  async function handleRemoveFromWatch(userId, movieID)  {
    const userEmail = auth.currentUser.email;
    const userIdRef = doc(db, "userIdMap", userEmail);
    const docSnap = await getDoc(userIdRef);
    if (docSnap.exists()) {
      deleteFromToWatch(userId, movieID)
    } else {
      console.error("Could not find document.");
    }
  };

  async function handleAddToSeen(userId, movieID)  {
    const userEmail = auth.currentUser.email;
    const userIdRef = doc(db, "userIdMap", userEmail);
    const docSnap = await getDoc(userIdRef);
    if (docSnap.exists()) {
      addToToSeen(userId, movieID)
    } else {
      console.error("Could not find document.");
    }
  };

  async function handleRemoveFromSeen(userId, movieID)  {
    const userEmail = auth.currentUser.email;
    const userIdRef = doc(db, "userIdMap", userEmail);
    const docSnap = await getDoc(userIdRef);
    if (docSnap.exists()) {
      deleteFromSeen(userId, movieID)
    } else {
      console.error("Could not find document.");
    }
  };


  useEffect(() => {
    // Observe auth state to redirect to login/home page
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      navigate("/");
      const userEmail = user.email;
      const userIdRef = doc(db, 'userIdMap', userEmail);
      const docSnap = await getDoc(userIdRef);

      if (docSnap.exists()) {
        setUserId(docSnap.data().userId);
        //setListOfFavorites(userData.favorites)

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
      <Body userId={userId} listOfFavorites={listOfFavorites} handleAddToFavorites={handleAddToFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={toWatchList} handleAddToSeen={handleAddToSeen} handleRemoveFromSeen={handleRemoveFromSeen} seenList={seenList}></Body>
    </div>
  );
}

export default Home;