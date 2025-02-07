import { useEffect, useState } from "react";
import "./profilePage.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuthStore";
import useThumbnailStore from "../../context/useThumbnailStore";
import Topbar_Profile from "../../components/topBar/Topbar_Profile";
import { MoreVertical } from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuth();
  const { myThumbnail, getMyThumbnail, savedThumbnails, getSavedThumbnails } =
    useThumbnailStore();
  const [activeMenuId, setActiveMenuId] = useState(null);

  const toggleMenu = (thumbnailId) => {
    setActiveMenuId(activeMenuId === thumbnailId ? null : thumbnailId);
  };
  useEffect(() => {
    getMyThumbnail();
    getSavedThumbnails();
  }, []);

  const navigate = useNavigate();

  const handleUpload = () => {
    // Logic to handle thumbnail upload
    navigate("/upload");
  };

  const goToThumbnailPage = (id) => {
    console.log("Navigating to thumbnail with ID:", id); 
    navigate(`/thumbnails/${id}`);
  };

  return (
    <div className="profile-page">
      <Topbar_Profile />
      {/* Profile Picture */}
      <div className="profile-pic-container">
        <img
          src={authUser.profilePicture || ""}
          alt="Profile"
          className="profile-picture"
        />
      </div>

      {/* Username */}
      <h1 className="username">{authUser.username}</h1>

      {/* Bio Section */}
      <div className="bio-section">
        <p>
         {authUser.bio}
        </p>
      </div>

      {/* Uploaded Thumbnails Section */}
      <div className="thumbnails-section">
        <h2>Uploaded Thumbnails</h2>
        <div className="thumbnails-grid">
          {myThumbnail && myThumbnail.length > 0 ? (
            myThumbnail.map((thumbnail) => (
              <div
                key={thumbnail._id}
                onClick={() => goToThumbnailPage(thumbnail._id)}
                className="thumbnail-card"
              >
                <img src={thumbnail.imageUrl} alt={thumbnail.title} />
                <p>{thumbnail.title}</p>
              </div>
            ))
          ) : (
            <p>No Thumbnail available</p>
          )}
        </div>
      </div>

      {/* Saved Thumbnails Section */}
      <div className="thumbnails-section">
        <h2>Saved Thumbnails</h2>
        {savedThumbnails && savedThumbnails.length > 0 ? (
          <div className="thumbnails-grid">
            {savedThumbnails.map((thumbnail) => (
              <div
                key={thumbnail._id}
                className="thumbnail-card"
                onClick={() => goToThumbnailPage(thumbnail._id)}
              >
                <div className="menu-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(thumbnail._id);
                    }}
                    className="menu-button"
                  >
                    <MoreVertical />
                  </button>
                  {activeMenuId === thumbnail._id && (
                    <div className="menu-options">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // removeThumbnail(thumbnail._id);
                          setActiveMenuId(null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
                <img src={thumbnail.imageUrl} alt={thumbnail.title} />
                <p>{thumbnail.title}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No saved Thumbnail</p>
        )}
      </div>

      {/* Upload Thumbnail Icon */}
      <div className="upload-icon" onClick={handleUpload}>
        <span>+</span>
      </div>
    </div>
  );
};

export default ProfilePage;
