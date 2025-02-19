/* eslint-disable react/prop-types */


const ThumbnailImage = ({thumbnailDetail}) => { 
  return (   
      <div className="thumbnail-container">
         {thumbnailDetail ? (
        <img className="thumbnail-image" src={thumbnailDetail.imageUrl} alt={thumbnailDetail.title} />
      ) : (
        <p  >Loading thumbnail...</p>
      )}
      </div>
  )
}

export default ThumbnailImage
