import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchCurrentUserDataHome, logOut } from "../auth/auth";
import anonymousPic from "../assets/anonymous_user_img.jpg";

function Header() {
  const [userData, setUserData] = useState();
  const [userImage, setUserImage] = useState("");

  const getUserData = async () => {
    const userData = await fetchCurrentUserDataHome();
    setUserData(userData);
    setUserImage(userData.image);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <nav className="navbar flex w-screen   p-2 pl-10 pr-10 shadow-md gap-10 bg-lime-100 justify-start items-center">
      <ul className="flex gap-5   font-bold items-center">
        {/* Opens Homepage */}
        <li className="pr-10 text-3xl font-black">
          <Link to="/">VandyBox</Link>
        </li>
        {/* Opens Search Movies Page */}
        <li className="">
          <Link to="/search">Search Movies</Link>
        </li>
        {/* Opens Find Friends Page */}
        <li className="">
          <Link to="/users">Find Friends</Link>
        </li>
        <li
          onClick={() => {
            logOut();
          }}>
          <span className="text-red-500">Log out</span>
        </li>
      </ul>
      {/* Opens User's Profile Page */}
      {userData && (
        <Link className="ml-auto" to={`/profile`} state={{userId: `${userData.handle}`}}>
          <img
            src={userImage != "" ? userImage : anonymousPic}
            className="object-cover rounded-full w-16 h-16 "
          />
        </Link>
      )}
      {/* Loading Placeholder */}
      {!userData && (
        <Link className="ml-auto" to={`/`}>
          <div className="rounded-full w-16 h-16 bg-red-100"></div>
        </Link>
      )}
    </nav>
  );
}

export default Header;
