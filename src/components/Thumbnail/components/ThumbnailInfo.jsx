/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import download from "../../../assets/download.png";
import share from "../../../assets/share.png";
import saved from "../../../assets/saved.png";
import profile from "../../../assets/profile.jpg";
import save from "../../../assets/save.png";
import useThumbnailStore from "../../../Store/useThumbnailStore";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../../Store/useAuthStore";
import toast from "react-hot-toast";

const ThumbnailInfo = ({ thumbnailDetail }) => {
  const { saveThumbnail, downloadThumbnail } = useThumbnailStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    if (!thumbnailDetail?._id) {
      console.error("Thumbnail Id is undefined");
      return;
    }
    await saveThumbnail(thumbnailDetail._id);
    setIsSaved(true);
  };

  const handleShareClick = () => {
    toast.success("Coming soon");
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
              alt="profile picture"
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
        </div>

        <div className="thumbnail-metric" onClick={handleShareClick}>
          <img src={share} alt="share" />
          <p>{thumbnailDetail?.shares} </p>
        </div>
        <div
          className="thumbnail-metric"
          onClick={() => downloadThumbnail(thumbnailDetail?._id)}
        >
          <img src={download} alt="download" />
          <p>{thumbnailDetail?.downloads || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailInfo;
