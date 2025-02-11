import { useEffect, useState } from "react";
import useCommentStore from "../../../Store/useCommentStore";
import { useNavigate, useParams } from "react-router-dom";
import timeAgo from "./../../../utils/timeAgo";
import useAuth from "./../../../Store/useAuthStore";

const Suggestions = () => {
  const { comments, getComment, postComment, isCommentLoading } =
    useCommentStore();
  const { authUser } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      getComment(id);
    }
  }, [id, getComment]);

  // console.log(comments);
  console.log(id);



  const handlePostComment = async () => {
    if (newComment.trim()) {
      await postComment(id, newComment);
      setNewComment("");
    }
  };

  const handleCommentClick = (userId) => {
    if(userId){
        navigate(`/user/${userId}`)
    }    
  
  }

  return (
    <div className="suggestion">
      <div className="comment-input-container">
        <div className="comment-img-input">
          <img
            className="user-avatar"
            src={authUser?.profilePicture}
            alt="User"
          />

          <textarea
            className={`comment-textarea ${isFocused ? "focused" : ""}`}
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your suggestions..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>

        <div className="control-post">
          <div className="controls">
            <span
              className={`char-count ${newComment.length > 200 ? "error" : ""}`}
            >
              {newComment.length}/200
            </span>
            <button
              onClick={handlePostComment}
              className={`post-btn ${newComment.trim() ? "active" : ""}`}
              disabled={!newComment.trim() || newComment.length > 200}
            >
              Suggest
            </button>
          </div>
        </div>
      </div>
      {/* D I S P L A Y  S U G G E S T I O N */}
      <br />
      <ul>
        {!isCommentLoading ? (
          comments.map((comment) => (
            <li key={comment._id}>
              <div 
              onClick={() =>handleCommentClick(comment.userId?._id)}
              className="suggestion-container"
              style={{ cursor: "pointer" }}
              >
                <img
                
                  className="thumbnail-profile-pic"
                  src={comment.userId.profilePicture}
                  alt="User Profile"
                />
                <div className="suggestion-users">
                  <div className="suggestion-user-date">
                    <div>
                      <p>{comment.userId.username}</p>
                      <p className="comment-creation-date">
                        {timeAgo(comment.createdAt)}
                      </p>
                    </div>
                  </div>

                  <p className="suggestion-content">{comment.content}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <div>loading</div>
        )}
      </ul>
    </div>
  );
};

export default Suggestions;