import React from "react";
import "./thumbnail.css";
import tap from '../../assets/tap.png'


const Thumbnail = () => {
  return (
    <div className="thumbnail-details">
      <div className="thumbnail-container">
        <img
          className="thumbnail-image"
          src="https://i.ytimg.com/vi/1Pb6fHR-YWE/maxresdefault.jpg"
          alt=""
        />
      </div>
      <div className="thumbnail-info">
        <h3 className="thumbnail-title">I am iman Gadzhi</h3>
        <div className="thumbnail-details-container">
          <div className="thumbnail-left-container">
            <img
              className="thumbnail-profile-pic"
              src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
              alt=""
            />

            <div className="thumbnail-main-info">
              <p className="thumbnail-user-name">Ferruz</p>
            </div>
            <button className="view-channel">View Channel➚</button>
          </div>
       
        <div className="thumbnail-right-info">
          <div className="thumbnail-metric">
            <img src={tap} alt="" />
            {/* <button>Impression</button> */}
            <p>21</p>
          </div>
          
          <button>Clicks</button>
          <button>Save</button>
          <button>Download</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
