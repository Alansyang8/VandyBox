import React from "react";
import SuzyBaePic from "../assets/SuzyBaePic.png";
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <nav className="navbar flex w-screen   p-2 pl-10 pr-10 shadow-md gap-10 bg-amber-200 justify-start items-center">
      <ul className="flex gap-5   font-bold items-center">
        <li className="pr-10 text-3xl font-black">VandyBox</li>
        <li className="">
          <Link to="/">Home</Link>
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

        <li className="">
          <Link to="/search">Search</Link>
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
      <a className="ml-auto" href="">
        <img
          src={SuzyBaePic}
          className="object-cover rounded-full w-16 h-16 "
        />
      </a>
    </nav>
  );
}

export default Header;
