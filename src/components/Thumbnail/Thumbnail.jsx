import "./thumbnail.css";
import ThumbnailImage from "./components/ThumbnailImage";
import ThumbnailTitle from "./components/ThumbnailTitle";
import ThumbnailInfo from "./components/ThumbnailInfo";
import Description from "./components/Description";
import Suggestions from "./components/Suggestions";
import { useParams } from "react-router-dom";
import useThumbnailStore from "../../Store/useThumbnailStore";
import { useEffect, useState } from "react";
import useCommentStore from "../../Store/useCommentStore";

const Thumbnail = () => {
  const { id } = useParams();
  const {
    thumbnailDetail,
    getThumbnailDetails,
    updateImpression,
    isThumbLoading,
  } = useThumbnailStore();
  const [hasFetched, setHasFetched] = useState(false);
  const { getComment } = useCommentStore();
  const [hasImpressionUpdated, setHasImpressionUpdated] = useState(false);

  useEffect(() => {
    if (id && !hasFetched) {
      getThumbnailDetails(id);
      getComment(id);
      setHasFetched(true);
      if (!hasImpressionUpdated) {
        updateImpression(id);
        setHasImpressionUpdated(true);
      }
    }
  }, [
    id,
    getThumbnailDetails,
    getComment,
    updateImpression,
    hasImpressionUpdated,
    hasFetched,
  ]);
  return (
    <div className="thumbnail-details">
      {isThumbLoading ? (
        <div className="detail-load"> 
          <div className="details-spinner"></div>
          </div>
        
      ) : (
        <>
          <ThumbnailImage thumbnailDetail={thumbnailDetail} />
          <div className="thumbnail-info">
            <ThumbnailTitle thumbnailDetail={thumbnailDetail} />
            <ThumbnailInfo thumbnailDetail={thumbnailDetail} />
            <Description thumbnailDetail={thumbnailDetail} />
            <Suggestions id={id} getComment={getComment} />
          </div>
        </>
      )}
    </div>
  );
};

export default Thumbnail;
