import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./card.css";
import useThumbnailStore from "../../Store/useThumbnailStore";
import useAuth from "../../Store/useAuthStore";
import duck from "../../assets/duck.png";
import ThumbnailCard from "./ThumbnailCard";
import { CheckCircle } from "lucide-react";

const Card = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    getThumbnail,
    isGettingThumbnail,
    updateImpression,
    hasMoreThumbnail,
    loadedThumbnails,
    page,
    lastScrollPosition,
    setScrollPosition,
  } = useThumbnailStore();
  const { authUser } = useAuth();

  useEffect(() => {
    if (loadedThumbnails.length === 0) {
      getThumbnail("", 1);
    }
  }, []);


  useEffect(() => {
    if(location.pathname === "/" && lastScrollPosition > 0){
      window.scrollTo(0, lastScrollPosition)
    }
  })

  function goToThumbnailPage(id) {
    if (!authUser) {
      updateImpression(id);
    }
    setScrollPosition(window.scrollY)
    navigate(`/thumbnails/${id}`);
  }


  const handleLoadClick = () => {
    getThumbnail("", page);
  };


  return (
    <div className="main-component">
      <div className="content-grid">
        {!loadedThumbnails.length > 0
          ? loadedThumbnails.map((thumbnail) => (
              <ThumbnailCard
                key={thumbnail._id}
                id={thumbnail._id}
                thumbnail={thumbnail}
                goToThumbnailPage={goToThumbnailPage}
                authUser={authUser}
              />
            ))
          : Array(9)
              .fill()
              .map((_, index) => <SkeletonCard key={index} />)}
      </div>
      {hasMoreThumbnail ? (
        <div className="main-load-more-comp">
          <button
            className="main-load-button"
            id="load-more-trigger"
            onClick={handleLoadClick}
            disabled={isGettingThumbnail}
          >
            {isGettingThumbnail ? "Loading..." : "Load More"}
          </button>
        </div>
      )
      :
      (
        <div className="no-more-thumbnails">
           <CheckCircle size={40} color="#4CAF50" /> {/* Green check icon */}
           <p>You&apos;ve caught up! No more thumbnails to load.</p>
        </div>
      )}
    </div>
  );
};

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-thumbnail" />
    <div className="skeleton-title" />
    <div className="skeleton-cta" />
  </div>
);

export default Card;
