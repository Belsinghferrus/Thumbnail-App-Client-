import React from "react";
import "./thumbnail.css";
import ThumbnailImage from "./components/ThumbnailImage";
import ThumbnailTitle from "./components/ThumbnailTitle";
import ThumbnailInfo from "./components/ThumbnailInfo";
import Description from "./components/Description";
import Suggestions from "./components/Suggestions";

const Thumbnail = () => {
  return (
    <div className="thumbnail-details">
      <ThumbnailImage />
      <div className="thumbnail-info">
        <ThumbnailTitle />
        <ThumbnailInfo />
        <Description />
        <Suggestions />
      </div>
    </div>
  );
};

export default Thumbnail;
