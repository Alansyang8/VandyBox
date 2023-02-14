import React from "react";

function Header() {
    return (
        <nav className="navbar shadow-md">
        <ul className="flex bg-amber-200 p-5 gap-10 justify-end pr-10 font-bold items-center">
            <li className="mr-auto font text-3xl font-black">VandyBox</li>
            <li className=""><a href="">Home</a></li>
            <li className=""><a href="">My Profile</a></li>
            <li className=""><a href="">Trending</a></li>
        </ul>
        </nav>
    )
}

export default Header