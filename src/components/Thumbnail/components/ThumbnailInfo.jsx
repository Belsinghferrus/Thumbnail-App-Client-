import { useEffect } from "react";
import like from "../../../assets/like.png";
import download from "../../../assets/download.png";
import share from "../../../assets/share.png";
import useThumbnailStore from "../../../context/useThumbnailStore";
import { useParams } from "react-router-dom";



const ThumbnailInfo = () => {
  const { thumbnailDetail, getThumbnailDetails, saveThumbnail, downloadThumbnail } = useThumbnailStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getThumbnailDetails(id);
    }
  }, [id]);

  const handleSave = async () => {
   if(!thumbnailDetail?._id){
    console.error("Thumbnail Id is undefined");
    return;
   }
   
    await saveThumbnail(thumbnailDetail._id)
   
  };

  return (
    <div className="thumbnail-details-container">
      <div className="thumbnail-left-container">
        {thumbnailDetail?.user ? (
          <>
            <img
              className="thumbnail-profile-pic"
              src={thumbnailDetail.user?.profilePicture}
              alt=""
            />
            <div className="thumbnail-main-info">
              <p className="thumbnail-user-name">
                {thumbnailDetail.user?.username}
              </p>
              {/* <button className="view-channel" >View Channel➚</button> */}
            </div>
          </>
        ) : (
          <p>User information not available</p>
        )}
      </div>

      <div className="thumbnail-right-info">
        <div className="thumbnail-metric"
        onClick={handleSave}
        >
          <img src={like} alt="click" />
          <p>{thumbnailDetail?.saves || 0}</p>
          {/* <p>Click</p> */}
        </div>

        <div className="thumbnail-metric">
          <img src={share} alt="share" />
          <p>{thumbnailDetail?.shares} </p>
          {/* <p>Share</p> */}
        </div>
        <div className="thumbnail-metric"
        onClick={() => downloadThumbnail(thumbnailDetail?._id)}
        >
          <img src={download} alt="download" />
          <p>{thumbnailDetail?.downloads || 0}</p>
          {/* <p>Download</p> */}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailInfo;
