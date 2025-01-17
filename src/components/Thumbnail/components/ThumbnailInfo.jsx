import React from 'react'
import like from "../../../assets/like.png";
import download from "../../../assets/download.png";
import share from '../../../assets/share.png'
const ThumbnailInfo = () => {
  return (
    <div className="thumbnail-details-container">
          <div className="thumbnail-left-container">
            <img
              className="thumbnail-profile-pic"
              src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
              alt=""
            />

            <div className="thumbnail-main-info">
              <p className="thumbnail-user-name">Ferruz</p>
              <button className="view-channel">View Channel➚</button>

            </div>
          </div>

          <div className="thumbnail-right-info">
            <div className="thumbnail-metric">
              <img src={like} alt="click" />
              <p>21</p>
              <p>Click</p>
            </div>

            <div className="thumbnail-metric">
              <img src={share} alt="share" />
              <p>75</p>
              <p>Share</p>
            </div>
            <div className="thumbnail-metric">
              <img src={download} alt="download" />
              <p>75</p>
              <p>Download</p>
            </div>
          </div>
        </div>
  )
}

export default ThumbnailInfo
