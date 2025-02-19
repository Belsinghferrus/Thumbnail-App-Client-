/* eslint-disable react/prop-types */
import  { useEffect } from 'react'
import useThumbnailStore from '../../../Store/useThumbnailStore';
import { useParams } from 'react-router-dom';

const ThumbnailTitle = ({thumbnailDetail}) => {

  const { getThumbnailDetails} = useThumbnailStore();
  const {id} = useParams()

  // useEffect(() => {
  //   if (id && !thumbnailDetail) {
  //     getThumbnailDetails(id);
  //   }
  // }, [id, thumbnailDetail, getThumbnailDetails]); 


  return (
    <div>
      {thumbnailDetail ? (
        <h3 className='thumbnail-title'>{thumbnailDetail.title}</h3>
      ) : (
        <p>Loading</p>
      )}
    </div>
  )
}

export default ThumbnailTitle
