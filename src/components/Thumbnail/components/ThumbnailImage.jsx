import {useEffect} from 'react'
import useThumbnailStore from '../../../context/useThumbnailStore';
import {useParams} from 'react-router-dom'

const ThumbnailImage = () => {

  const {thumbnailDetail, getThumbnailDetails} = useThumbnailStore();
  const {id} = useParams()

  useEffect(() => {
    if(id){
      getThumbnailDetails(id)
    }
  }, [id]);
  
  return (
    
      <div className="thumbnail-container">
         {thumbnailDetail ? (
        <img className="thumbnail-image" src={thumbnailDetail.imageUrl} alt={thumbnailDetail.title} />
      ) : (
        <p>Loading thumbnail...</p>
      )}
      </div>

  )
}

export default ThumbnailImage
