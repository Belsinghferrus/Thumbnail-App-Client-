/* eslint-disable react/prop-types */
import { useState } from "react";

const ThumbnailCard = ({ thumbnail, goToThumbnailPage, authUser }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
  
    return (
      <div
        onClick={() => goToThumbnailPage(thumbnail._id)}
        className="card"
      >
        <div className="card-thumbnail-container">
          {!isImageLoaded || !hasError ? <SkeletonThumbnail /> : null} 
          <img
            className={`card-thumbnail-img ${!isImageLoaded || hasError ? "hidden" : ""}`}
            src={thumbnail.imageUrl}
            alt={thumbnail.title}
            onLoad={() => {setIsImageLoaded(true), setHasError(false)}}
            onError={() => {setIsImageLoaded(false), setHasError(true)}}
          />
        </div>
        <div className="card-thumbnail-info">
          <img
            className="profile-pic"
            src={thumbnail?.user.profilePicture}
            alt="profile"
          />
          <div className="card-thumbnail-content">
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
    );
  };
  
  const SkeletonThumbnail = () => (
    <div className="skeleton-thumbnail">
    </div>
  );
  export default ThumbnailCard
  // Skeleton for each card
