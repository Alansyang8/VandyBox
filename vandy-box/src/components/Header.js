import React from "react";
import lisaProfilePic from "../assets/lisaProfilePic.jpg";

function Header() {
  return (
    <nav className="navbar flex w-screen   p-2 pl-10 pr-10 shadow-md gap-10 bg-amber-200 justify-start items-center">
      <ul className="flex gap-5   font-bold items-center">
        <li className="pr-10 text-3xl font-black">VandyBox</li>
        <li className="">
          <a href="">Home</a>
        </li>
        <li className="">
          <a href="">Favorites</a>
        </li>
        <li className="">
          <a href="">Categories</a>
        </li>
        <li className="">
          <a href="">Rankings</a>
        </li>
      </ul>
      <input
        type="text"
        className="bg-stone-10 border border-gray-300 text-gray-900 w-1/3 text-sm rounded-lg block p-2.5"
        placeholder="Search..."
        required
      />
      <a className="ml-auto" href="">
        <img
          src={lisaProfilePic}
          className="object-cover rounded-full w-16 h-16 "
        />
      </a>
    </nav>
  );
}

export default Header;
