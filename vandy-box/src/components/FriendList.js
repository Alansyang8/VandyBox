import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import anonymousPic from "../assets/anonymous_user_img.jpg";
import { Link } from "react-router-dom";

const FriendList = ({ friend }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [handle, setHandle] = useState(friend);

  useEffect(() => {
    //gets FriendsList Information
    const fetchFriendData = async () => {
      const docRef = doc(db, "users", friend);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setImage(docSnap.data().image);
        setName(docSnap.data().name);
      }
    };
    fetchFriendData();
  }, []);

  return (
    <div className="flex justify-center items-center h-80">
      <div className="h-full w-64 flex justify-center items-center bg-lime-100 rounded-lg py-3">
        <div className="p-2">
          <div className="rounded-full overflow-hidden h-32 w-32 flex justify-center items-center">
            <img src={image ? image : anonymousPic} alt="Friend image" />
          </div>
          <h3
            className="mt-6 text-center text-xl text-gray-900 font-medium leading-8"
            data-testid="name">
            {name}
          </h3>
          <div className="text-center text-gray-400 text-xs font-semibold">
            <p data-testid="handle">@{handle}</p>
          </div>
          {/* Click this to get to another friend's user profile */}
          <div className="text-center my-3">
            
         {window.location.href.includes("profile") && <Link className="ml-auto" to={`../profi1e`} state={{userId: `${handle}`}}>
            View Profile
          </Link>}

          {window.location.href.includes("profi1e") && <Link className="ml-auto" to={`../profile`} state={{userId: `${handle}`}}>
            View Profile
          </Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
