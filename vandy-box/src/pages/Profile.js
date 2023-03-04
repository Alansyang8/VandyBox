import Header from "../components/Header";
import ProfileHeader from "../components/ProfileHeader";
import UserProfile from "../components/UserProfile";

function Profile() {
  return (
    <div className="Profile">
        <ProfileHeader />
        <UserProfile/>
    </div>
  );
}

export default Profile;