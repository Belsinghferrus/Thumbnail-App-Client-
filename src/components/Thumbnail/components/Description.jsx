import React, { useEffect, useState } from 'react'
import useThumbnailStore from '../../../Store/useThumbnailStore';
import { useParams } from 'react-router-dom';
import ReactLinkify from 'react-linkify';
import timeAgo from '../../../utils/timeAgo';

const Description = () => {

  
  const {thumbnailDetail, getThumbnailDetails, updateImpression} = useThumbnailStore();
  const {id} = useParams()
  const [hasImpressionUpdated, setHasImpressionUpdated] = useState(false);

  const linkDecorator = (decoratedHref, decoratedText, key) => (
    <a
      href={decoratedHref}
      key={key}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#007bff", textDecoration: "underline" }} // Custom styles
    >
      {decoratedText}
    </a>
  );

  useEffect(() => {
    if (id && !hasImpressionUpdated) {
      getThumbnailDetails(id).then(() => {
        updateImpression(id);
        setHasImpressionUpdated(true); 
      });
    }
  }, [id, hasImpressionUpdated]);

  return (
    <div className="decription-container">
      <div style={{display: "flex", gap: "10px"}}>
        <h4>{thumbnailDetail?.impressions || 0} views</h4>
        <p className='time-desc'>{timeAgo( thumbnailDetail?.createdAt)}</p>
      </div>
          
          <p className="description"> <br></br> 
          <ReactLinkify componentDecorator={linkDecorator}>
            {thumbnailDetail?.description || "No description available"}
            </ReactLinkify> </p>
        </div>
  )
}

export default Description
