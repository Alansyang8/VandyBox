import React, { useState, useRef } from "react";
import { auth, db, storage } from "../firebase";
import {
  modifyAddInfo,
  modifyName,
  modifyStatusMsg,
} from "../api/firebaseWriter";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import anonymousImg from "../assets/anonymous_user_img.jpg";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

const ProfileEditPopUp = ({ setEditMode, currentUserData }) => {
  const [userName, setUserName] = useState(currentUserData.name);
  const [statusMsg, setStatusMsg] = useState(currentUserData.statusMsg);
  const [additionalInfo, setAdditionalInfo] = useState(
    currentUserData.additionalInfo
  );
  const [userImage, setUserImage] = useState(currentUserData.image);
  const imageLoaderRef = useRef(null);

  const handleUpdate = async () => {
    const userEmail = auth.currentUser.email;
    const userIdRef = doc(db, "userIdMap", userEmail);
    const docSnap = await getDoc(userIdRef);
    let userId = "";
    if (docSnap.exists()) {
      userId = docSnap.data().userId;
      modifyName(userId, userName);
      modifyStatusMsg(userId, statusMsg);
      modifyAddInfo(userId, additionalInfo);
    } else {
      console.error("Could not find document.");
    }

    if (userId !== "" && userImage) {
      const storageRef = ref(storage, `profilePic/${userId}`);
      const uploadTask = uploadString(storageRef, userImage, "data_url");
      uploadTask
        .then(() => {
          getDownloadURL(storageRef).then(async (url) => {
            await updateDoc(
              doc(db, "users", userId),
              {
                image: url,
              }
            );
          });
          setTimeout(() => {
            window.location.reload(true);
          }, 200);
        })
        .catch((e) => {
          console.error("Error uploading image: ", e);
        });
    }
  };

  const updateUserImage = (e) => {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target) {
        setUserImage(readerEvent.target.result);
      }
    };
  };

  return (
    <div className="absolute inset-0 m-auto w-96 h-fit max-w-screen-xl bg-white rounded-2xl flex justify-evenly border-2 flex-col">
      <div className="h-32 w-full bg-lime-100 rounded-t-2xl flex justify-center">
        <span className="font-l text-md mt-4 font-bold">Edit Profile</span>
      </div>
      <div className="flex items-center justify-center mt-4 mb-12">
        <input
          ref={imageLoaderRef}
          onChange={updateUserImage}
          type="file"
          hidden
        />
        <div className="flex justify-center items-center rounded-full absolute cursor-pointer hover:opacity-70 overflow-clip h-[8rem] w-[8rem]">
          <img
            src={userImage ? userImage : anonymousImg}
            alt="User image"
            width="144"
            height="144"
            onClick={() => imageLoaderRef.current.click()}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2 mb-8 p-6">
        <label className="font-bold">Name</label>
        <input
          data-testid="name-input"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Your name"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label className="font-bold">Status Message</label>
        <input
          data-testid="status-msg-input"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Status message"
          value={statusMsg}
          onChange={(e) => {
            setStatusMsg(e.target.value);
          }}
        />
        <label className="font-bold">Additional Info</label>
        <input
          data-testid="add-info-input"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Additional info"
          value={additionalInfo}
          onChange={(e) => {
            setAdditionalInfo(e.target.value);
          }}
        />
      </div>
      <div className="space-x-4 p-6">
        <button
          data-testid="cancel-btn"
          className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
          onClick={() => {
            setEditMode(false);
          }}>
          Cancel
        </button>
        <button
          data-testid="update-btn"
          className="bg-gray-200 p-2 rounded-md text-red-500 hover:bg-gray-300"
          onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default ProfileEditPopUp;
