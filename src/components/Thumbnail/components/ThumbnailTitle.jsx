import  { useEffect } from 'react'
import useThumbnailStore from '../../../Store/useThumbnailStore';
import { useParams } from 'react-router-dom';

const ThumbnailTitle = () => {

  const {thumbnailDetail, getThumbnailDetails} = useThumbnailStore();
  const {id} = useParams()

  useEffect(() => {
    if(id){
      getThumbnailDetails(id)
    }
  }, [id]);


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
