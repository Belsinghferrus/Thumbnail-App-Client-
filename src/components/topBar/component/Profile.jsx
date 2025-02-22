import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Store/useAuthStore";
import profile from "../../../assets/profile.jpg";
import user from "../../../assets/user.png";
import edit from "../../../assets/edit.png";
import password from "../../../assets/password.png";
import privacy from "../../../assets/privacy.png";
import file from "../../../assets/file.png";
import exit from "../../../assets/exit.png";
// import password from '../../../assets/password.png'
import { useClickOutside } from "react-haiku";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();
  const ref = useRef(null);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useClickOutside(ref, handleClickOutside);

  return (
    <div className="profile-dropdown" ref={ref}>
      <button onClick={toggleDropdown}  className="profile-image">
        <img
        onError={(e) => e.target.src = profile}
          className="main-profile-pic"
          src={authUser?.profilePicture || profile}
          alt=""
        />
      </button>
      {isOpen && (
        <div   className="dropdown-menu" >
          <div className="menu-profile-image">
            <img onError={(e) => e.target.src = profile} src={authUser?.profilePicture || profile} />
            <p>
              {authUser?.username.length > 7
                ? authUser?.username.slice(0, 7) + ".."
                : authUser?.username || "Not User"}
            </p>
          </div>
          <hr />
          {authUser ? (
            <>
              <li className="menu-list" onClick={() => navigate("/profile")}>
                <img src={user} />
                Profile
              </li>
              <li className="menu-list" onClick={() => navigate("/edit")}>
                <img src={edit} />
                Edit
              </li>
              <li className="menu-list" onClick={() => navigate("/security")}>
                <img src={password} />
                Security
              </li>
              <li className="menu-list" onClick={() => navigate("/disclaimer")}>
                <img src={file} />
                Disclaimer
              </li>
              <li
                className="menu-list"
                onClick={() => navigate("/privacy-policy")}
              >
                <img src={privacy} />
                Privacy Policy
              </li>
              <li className="menu-list" onClick={handleLogout}>
                <img src={exit} />
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="menu-list" onClick={() => navigate("/login")}>
                <img src={exit} />
                Login
              </li>
              <li className="menu-list" onClick={() => navigate("/disclaimer")}>
                <img src={file} />
                Disclaimer
              </li>
              <li
                className="menu-list"
                onClick={() => navigate("/privacy-policy")}
              >
                <img src={privacy} />
                Privacy Policy
              </li>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
