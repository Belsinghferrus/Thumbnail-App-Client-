import { useEffect, useState } from "react";
import download from "../../../assets/download.png";
import share from "../../../assets/share.png";
import saved from "../../../assets/saved.png";
import profile from "../../../assets/profile.jpg";
import save from "../../../assets/save.png";
import useThumbnailStore from "../../../Store/useThumbnailStore";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../Store/useAuthStore";

const ThumbnailInfo = () => {
  const {
    thumbnailDetail,
    getThumbnailDetails,
    saveThumbnail,
    downloadThumbnail,
  } = useThumbnailStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (id) {
      getThumbnailDetails(id);
    }
  }, [id]);

  const handleSave = async () => {
    if (!thumbnailDetail?._id) {
      console.error("Thumbnail Id is undefined");
      return;
    }
    await saveThumbnail(thumbnailDetail._id);
    setIsSaved(true);
  };


  //To Update state if thumbnail is already saved
  
  const idToString = id.toString();
  useEffect(() => {
    if (authUser?.savedThumbnails?.includes(idToString)) {
      setIsSaved(true);
      console.log("Thumbnail is saved.");
    } else {
      setIsSaved(false);
    }
  }, [idToString, authUser]);

  function goToProfileView(userId) {
    navigate(`/user/${userId}`);
  }

  return (
    <div className="thumbnail-details-container">
      <div
        className="thumbnail-left-container"
        onClick={() => goToProfileView(thumbnailDetail.user._id)}
      >
        {thumbnailDetail?.user ? (
          <>
            <img
              className="thumbnail-profile-pic"
              src={thumbnailDetail.user?.profilePicture || profile}
              alt=""
            />
            <div className="thumbnail-main-info">
              <p className="thumbnail-user-name">
                {thumbnailDetail.user?.username}
              </p>
            </div>
          </>
        ) : (
          <p>User information not available</p>
        )}
      </div>

      <div className="thumbnail-right-info">
        <div className="thumbnail-metric" onClick={handleSave}>
          <img src={isSaved ? saved : save} alt="click" />
          <p>{thumbnailDetail?.saves || 0}</p>
          {/* <p>Click</p> */}
        </div>

        <div className="thumbnail-metric">
          <img src={share} alt="share" />
          <p>{thumbnailDetail?.shares} </p>
          {/* <p>Share</p> */}
        </div>
        <div
          className="thumbnail-metric"
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
