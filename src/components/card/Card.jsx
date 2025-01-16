import React from "react";
import { useNavigate} from 'react-router-dom'
import "./card.css";
import ThumbnailPage from './../../pages/thumbnail/ThumbnailPage';

const Card = () => {

  const navigate = useNavigate();

  function goToThumbnailPage(){
    navigate ("/thumbnail")
  }

  return (
    <div className="content-grid">
      <div onClick={ goToThumbnailPage } className="card">
        <div className="card-thumbnail-container">
          <img
            className="card-thumbnail-img"
            src="https://wallpaperaccess.com/full/3457754.jpg"
            alt="Video title"
          />
        </div>
        <div className="card-thumbnail-info">
          <img
            className="profile-pic"
            src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
            alt="Channel Profile"
          />
          <div>
            <p className="title">Saving The World From Your Sofa</p>
            <div className="card-thumbnail-details">
              <p>Ferruz</p>
              <span>13.7 CTR</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-thumbnail-container">
          <img
            className="card-thumbnail-img"
            src="https://wallpaperaccess.com/full/3457754.jpg"
            alt="Video title"
          />
        </div>
        <div className="card-thumbnail-info">
          <img
            className="profile-pic"
            src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
            alt="Channel Profile"
          />
          <div>
            <p className="title">I rented a whole hometown to live</p>
            <div className="card-thumbnail-details">
              <p>Ferruz</p>
              <span>13.7 CTR</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-thumbnail-container">
          <img
            className="card-thumbnail-img"
            src="https://wallpaperaccess.com/full/3457754.jpg"
            alt="Video title"
          />
        </div>
        <div className="card-thumbnail-info">
          <img
            className="profile-pic"
            src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
            alt="Channel Profile"
          />
          <div>
            <p className="title">I rented a whole hometown to live Abroad while working</p>
            <div className="card-thumbnail-details">
              <p>Ferruz</p>
              <span>13.7 CTR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
