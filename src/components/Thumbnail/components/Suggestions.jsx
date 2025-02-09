import { useEffect, useState } from "react";
import useCommentStore from "../../../Store/useCommentStore";
import { useParams } from "react-router-dom";

const Suggestions = () => {
  const { comments, getComment, postComment , isCommentLoading} = useCommentStore();
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getComment(id);
    }
  }, [id, getComment]);
  console.log(comments);
  console.log(id);

  const handlePostComment = async () => {
    if (newComment.trim()) {
      await postComment(id, newComment);
      setNewComment("");
    }
  };
  return (
    <div className="suggestion">
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your suggestion"
        />
        <button onClick={handlePostComment}>Post</button>
      </div>
      {/* D I S P L A Y  C O M M E N T  */}
      <ul>
        {!isCommentLoading ? comments.map((comment) => (
          <li key={comment._id}>
            <div className="suggestion-container">
              <img
                className="thumbnail-profile-pic"
                src={comment.userId.profilePicture}
                alt="User Profile"
              />
              <div>
                <p>{comment.userId.username}</p>
                <p>{comment.content}</p>
              </div>
            </div>
          </li>
        )) : (
          <div>
            loading
          </div>
        )}
      </ul>
    </div>
  );
};

export default Suggestions;
