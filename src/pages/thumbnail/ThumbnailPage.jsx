import "./thumbnail.css";
import Thumbnail from "./../../components/Thumbnail/Thumbnail";
import Topbar_Profile from "../../components/topBar/Topbar_Profile";


const ThumbnailPage = () => {

  
  return (
    <div className="thumbnail-page">
      <Topbar_Profile />
      <br /> 
      <Thumbnail />
    </div>
  );
};

export default ThumbnailPage;
