import { useEffect, useState } from "react";
import "./profilePage.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Store/useAuthStore";
import useThumbnailStore from "../../Store/useThumbnailStore";
import Topbar_Profile from "../../components/topBar/Topbar_Profile";
import { MoreVertical } from "lucide-react";
import ReactLinkify from "react-linkify";
import profile from "../../assets/profile.jpg";

const ProfilePage = () => {
  const { authUser } = useAuth();
  const {
    myThumbnail,
    getMyThumbnail,
    savedThumbnails,
    getSavedThumbnails,
    deleteThumbnail,
  } = useThumbnailStore();
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = (thumbnailId) => {
    setActiveMenuId(activeMenuId === thumbnailId ? null : thumbnailId);
  };

  useEffect(() => {
    getMyThumbnail();
    getSavedThumbnails();
  }, []);

  const navigate = useNavigate();

  const handleUpload = () => {
    navigate("/upload");
  };

  const handleDelete = async(id) => {
    setIsLoading(true);
    try {
     await deleteThumbnail(id, navigate);
    } catch (error) {
      console.error("Error in handle delete", error);
    } finally {
      setIsLoading(false);
      setActiveMenuId(null); 
    }
    
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
          src={authUser?.profilePicture || profile}
          alt="Profile"
          className="profile-picture"
        />
      </div>

      {/* Username */}
      <h1 className="username">{authUser.username}</h1>

      {/* Bio Section */}
      <div className="bio-section">
        <ReactLinkify>
          <p>{authUser.bio}</p>
        </ReactLinkify>
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
                      {isLoading ? (
                        <button disabled className="loading-overlay">Deleting..</button>
                      )
                      :
                      (<button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(thumbnail._id);
                        }}
                      >
                        Delete
                      </button>)}
                    </div>
                  )}
                </div>
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
