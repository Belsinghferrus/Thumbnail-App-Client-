import  { useEffect } from "react";
import { useNavigate} from 'react-router-dom'
import "./card.css";
import useThumbnailStore from "../../context/useThumbnailStore";

const Card = () => {
  const navigate = useNavigate();
  const {thumbnail: thumbnails , getThumbnail, isGettingThumbnail } = useThumbnailStore()

  useEffect(() => {
      getThumbnail();
  }, []);

  function goToThumbnailPage(id){
    navigate (`/thumbnails/${id}`)
  }

  return (
    <div className="content-grid">
      {!isGettingThumbnail ? thumbnails?.map((thumbnail) => (
      <div
      key={thumbnail._id}
      onClick={()=> goToThumbnailPage (thumbnail._id)} 
      className="card">
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
          <div >
            <p className="title">{thumbnail.title}</p>
            <div className="card-thumbnail-details">
              <p>{thumbnail?.user.username}</p>
              <span>{thumbnail.ctr}% CTR</span>
            </div>
          </div>
        </div>
      </div>
      )) : <p>Loading</p>}
    </div>
  );
};

export default Card;
