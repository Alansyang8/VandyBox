import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { fetchCurrentUserDataHome, fetchCurrentUserData, logOut } from "../auth/auth";
import anonymousPic from "../assets/anonymous_user_img.jpg";
import { auth, db } from "../firebase";
import { onValue, ref } from "firebase/database";
import { render } from "@testing-library/react";

function Header() {
  const [userData, setUserData] = useState();
  const [userImage, setUserImage] = useState("");



  const getUserData = async () => {
    const userData = await fetchCurrentUserDataHome();
    setUserData(userData)
    setUserImage(userData.image);
  }

  useEffect(() => {
    getUserData()
  }, [])
  






  return (
    <nav className="navbar flex w-screen   p-2 pl-10 pr-10 shadow-md gap-10 bg-lime-100 justify-start items-center">
      <ul className="flex gap-5   font-bold items-center">
        <li className="pr-10 text-3xl font-black"><Link to="/">VandyBox</Link></li>
        <li className="">
          <a href="">Favorites</a>
        </li>
        <li className="">
          <a href="">Recommendations</a>
        </li>
    
       

        <li className="">
          <Link to="/search">Search</Link>
        </li>
        <li onClick={() => { logOut(); }}>
          <span className="text-red-500">Log out</span>
        </li>

      </ul>
      {/* <input
        type="search"
        className="bg-stone-10 border border-gray-300 text-gray-900 w-1/3 text-sm rounded-lg block p-2.5 searchBar"
        placeholder="Search..."
        defaultValue={""}
        onClick={window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        })}
        onChange={(event) => props.HandleSearch(event.target.value)}
      /> */}
      {userData && <Link className="ml-auto" to={`/profile/${userData.handle}`}>
        <img
          src={userImage != "" ? userImage : anonymousPic}
          className="object-cover rounded-full w-16 h-16 "
        />
      </Link>  
}
{!userData && <Link className="ml-auto" to={`/`}>
        <div  className="rounded-full w-16 h-16 ">
        
         
          </div>
      </Link>  
}
    </nav>
  );
}

export default Header;
