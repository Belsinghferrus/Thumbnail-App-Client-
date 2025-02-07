import { useState } from "react";
import "./Edit.css";
import useAuth from "./../../context/useAuthStore";

const Edit = () => {
  const { authUser, updateProfile, isProfileUpdating } = useAuth();
  const [name, setName] = useState(authUser?.username || "");
  const [bio, setBio] = useState(authUser?.bio || "ABOUT ME");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    authUser?.profilePicture || ""
  );

  const userId = authUser._id;

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
  };

  return (
    <div className="edit-profile">
      <h2>Edit Profile</h2>
      <form onSubmit={handleFormSubmit} className="edit-form">
        <div className="profile-pic-edit">
          <div className="profile-picture-container">
            <img
              src={previewImage}
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
          />
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea value={bio} onChange={handleBioChange}></textarea>
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
  );
};

export default Edit;
