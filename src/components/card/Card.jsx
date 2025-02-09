import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";
import useThumbnailStore from "../../Store/useThumbnailStore";
import useAuth from "../../Store/useAuthStore";
import duck from "../../assets/duck.png";

const Card = () => {
  const navigate = useNavigate();
  const {
    thumbnail: thumbnails,
    getThumbnail,
    isGettingThumbnail,
    updateImpression,
  } = useThumbnailStore();
  const { authUser } = useAuth();

  useEffect(() => {
    getThumbnail();
  }, []);

  function goToThumbnailPage(id) {
    if (!authUser) {
      updateImpression(id);
    }
    navigate(`/thumbnails/${id}`);
  }

  return (
    <div className="main-component">
      <div className="content-grid">
        {!isGettingThumbnail ? (
          thumbnails.length > 0 ? (
            thumbnails?.map((thumbnail) => (
              <div
                key={thumbnail._id}
                onClick={() => goToThumbnailPage(thumbnail._id)}
                className="card"
              >
                <div className="card-thumbnail-container">
                  <img
                    className="card-thumbnail-img"
                    src={thumbnail.imageUrl}
                    alt={thumbnail.title}
                  />
                </div>
                <div className="card-thumbnail-info">
                  <img
                    className="profile-pic"
                    src={thumbnail?.user.profilePicture}
                    alt="Channel Profile"
                  />
                  <div>
                    <p className="title">{thumbnail.title}</p>
                    <div className="card-thumbnail-details">
                      <p>{thumbnail?.user.username}</p>
                      <span>
                        {authUser ? thumbnail?.impressions : "?"} Clicks
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-thumbnail-wrapper">
              <div className="no-thumbnail">
                <img src={duck} />
                <p>No Thumbnails Yet !!!</p>
              </div>
            </div>
          )
        ) : (
          Array(12)
            .fill()
            .map((_, index) => (
              <div key={index} className="skeleton-card">
                <div className="skeleton-thumbnail" />
                <div className="skeleton-title" />
                <div className="skeleton-cta" />
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Card;
