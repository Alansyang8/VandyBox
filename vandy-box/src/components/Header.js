import React, { useEffect, useState } from "react";
import SuzyBaePic from "../assets/SuzyBaePic.png";
import { Link } from 'react-router-dom';
import { logOut } from "../auth/auth";
import { auth, db } from "../firebase";
import { onValue, ref } from "firebase/database";

function Header(props) {

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
          <a href="">Watch Groups</a>
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
      <Link className="ml-auto" to={`/profile/${props.userId}`}>
        <img
          src={SuzyBaePic}
          className="object-cover rounded-full w-16 h-16 "
        />
      </Link>
    </nav>
  );
}

export default Header;
