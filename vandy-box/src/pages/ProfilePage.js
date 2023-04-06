import React from 'react'
import { useLoaderData } from "react-router-dom";
import ProfileHeader from '../components/ProfileHeader';
import UserProfile from '../components/UserProfile';

const ProfilePage = () => {
    const userData = useLoaderData();
    return (
        <div className="Profile">
            <ProfileHeader />
            <UserProfile userData={userData} />
        </div>
      );
}
export default ProfilePage;