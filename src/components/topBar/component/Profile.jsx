import  {useState} from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../context/useAuthStore";
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
const {authUser, logout} = useAuth()
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = async() => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  }
  return (
    <div  className="profile-dropdown">
      <button onClick={toggleDropdown} className="profile-image">
        <img
          className="main-profile-pic"
          src={authUser.profilePicture}
          alt=""
        />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/edit")}>Edit</li>
          <li onClick={() => navigate("/security")}>Security</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      )}
    </div>
  );
};

export default Profile;
