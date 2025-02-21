import { useState } from "react";
import "./edit.css";
import useAuth from "../../Store/useAuthStore";
import { useNavigate } from "react-router-dom";
import profile from '../../assets/profile.jpg'
import ClipLoader from "react-spinners/ClipLoader";
import Logo from "../topBar/component/Logo";

const Edit = () => {
  const { authUser, updateProfile, isProfileUpdating } = useAuth();
  const [name, setName] = useState(authUser?.username || "");
  const [bio, setBio] = useState(authUser?.bio || "ABOUT ME");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    authUser?.profilePicture || ""
  );

  const userId = authUser._id;
  const navigate = useNavigate()
  const handleNameChange = (e) => setName(e.target.value);
  const handleBioChange = (e) => setBio(e.target.value);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setProfileImage(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", name);
    formData.append("bio", bio);
    if (profileImage) {
      formData.append("profilePicture", profileImage);
    }
    updateProfile(userId, formData);
    navigate('/profile')
  };


  return (
    <div>
    <Logo className="logo-upload"/>
    <div className="edit-profile">
      {/* {!isProfileUpdating && (
        <div className="overlay">
          <div className="spinner-container">
            <ClipLoader color="#ffffff" loading={isProfileUpdating} size={50} />
          </div>
        </div>
      )} */}
      <h2>Edit Profile</h2>
      <form onSubmit={handleFormSubmit} className="edit-form">
        <div className="profile-pic-edit">
          <div className="profile-picture-container">
            <img
              src={previewImage || profile}
              alt="Profile Preview"
              className="profile-preview"
            />
            <input
              type="file"
              id="upload-button"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-button" className="upload-label">
              ✎
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
            className="edit-textfield"
          />
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea className="edit-textfield" value={bio} onChange={handleBioChange}></textarea>
        </div>
        {isProfileUpdating ? (
          <button type="submit" className="update-btn">
            Updating..
          </button>
        ) : (
          <button type="submit" className="update-btn">
            Update Profile
          </button>
        )}
      </form>
    </div>
    </div>
  );
};

export default Edit;
