import { useEffect } from "react";
import useAuth from "../../Store/useAuthStore";
import "./profileview.css";
import { useNavigate, useParams } from "react-router-dom";
import  ReactLinkify  from 'react-linkify';

const ProfileView = () => {
  const { userId } = useParams();
  const { userDetails, userThumbnail,  profileView } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    if (userId) {
      profileView(userId);
    }
  }, [userId]);

  useEffect(() => {
    userThumbnail;
  }, []);
  const goToThumbnailPage = (id) => {
    console.log("Navigating to thumbnail with ID:", id); 
    navigate(`/thumbnails/${id}`);
  };

  return (
    <div className="profile-page">
      <div className="profile-pic-container">
        <img
          src={userDetails?.profilePicture || ""}
          alt="Profile"
          className="profile-picture"
        />
      </div>
      <h1 className="username">{userDetails?.username}</h1>
      <div className="bio-section">
       <ReactLinkify>
       <p>{userDetails?.bio || ""}</p>
       </ReactLinkify>
      </div>
      

      <div className="thumbnails-section">
        <h2>Thumbnails</h2>
        <div className="thumbnails-grids">
          {userThumbnail?.map((thumbnail) => (
            <div 
            className="thumbnail-card"
            key={thumbnail._id}>
              <img
                src={thumbnail.imageUrl}
                alt={thumbnail.title}
                onClick={() => goToThumbnailPage(thumbnail._id)}
                className="thumbnail-card-img"
              />
              <p>{thumbnail.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
