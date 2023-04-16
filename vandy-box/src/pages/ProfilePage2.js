import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import UserProfile from "../components/UserProfile";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const ProfilePage2 = () => {
  const location = useLocation()
  const userId  = location.state.userId
  useEffect(() => {
    getOtherUsersData()
  }, []);

  console.log(userId)

  const [otherUserData, setOtherUserData] = useState();

  const getOtherUsersData = async () => {
    console.log("database read");
    const userDataRef = doc(db, "users", userId);
    const userDataSnap = await getDoc(userDataRef);
    if (userDataSnap.exists()) {
      let userDataTemp =  userDataSnap.data();
      setOtherUserData(userDataTemp)
    }
    return null;
  };

  return (
    <div className="Profile">
      <ProfileHeader />
      {otherUserData && <UserProfile userData={otherUserData} />}
    </div>
  );
};

export default ProfilePage2;
