import React from "react";
import { Link } from 'react-router-dom';

function ProfileHeader() {
  return (
    <div className="h-40 w-full bg-lime-100 flex flex-row-reverse">
        <span data-testid="ProfileHeader" className="font-bold mr-10 mt-8 text-3xl"><Link to="/">VandyBox</Link></span>
    </div>
  );
}

export default ProfileHeader;