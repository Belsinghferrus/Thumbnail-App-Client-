import React, { useEffect, useState } from 'react'
import useThumbnailStore from '../../../context/useThumbnailStore';
import { useParams } from 'react-router-dom';

const Description = () => {

  
  const {thumbnailDetail, getThumbnailDetails, updateImpression} = useThumbnailStore();
  const {id} = useParams()
  const [hasImpressionUpdated, setHasImpressionUpdated] = useState(false);

  // useEffect(() => {
  //   if(id){
  //     getThumbnailDetails(id)
  //   }
  // }, [id]);

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
          <p>{thumbnailDetail?.impressions || 0} views</p>
          <p className="description"> <br></br> {thumbnailDetail?.description || "No description available"}</p>
        </div>
  )
}

export default Description
