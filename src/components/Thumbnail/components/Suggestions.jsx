import React from "react";

const Suggestions = () => {
  return (
    <div className="suggestion">
      <div className="suggestion-container">
        <img
          className="thumbnail-profile-pic"
          src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
          alt=""
        />
        <input type="text" placeholder="Add your suggestion" />
        <button>Post</button>
      </div>
      <div className="suggestion-display">
        <img
          className="thumbnail-profile-pic"
          src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
          alt=""
        />
        <div className="comments">
          <p>Akash</p>
          <p>This is looking Awesome</p>
        </div>
      </div>
      <div className="suggestion-display">
        <img
          className="thumbnail-profile-pic"
          src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
          alt=""
        />
        <div className="comments">
          <p>Akash</p>
          <p>This is looking Awesome</p>
        </div>
      </div>
      <div className="suggestion-display">
        <img
          className="thumbnail-profile-pic"
          src="https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png"
          alt=""
        />
        <div className="comments">
          <p>Akash</p>
          <p>This is looking Awesome</p>
        </div>
      </div>
      {/* D I S P L A Y  C O M M E N T  */}
      {/* <ul>
              {suggestions.map((suggestion, index) => (
               <li key={index}>
                
               </li>
              ))}
            </ul> */}
    </div>
  );
};

export default Suggestions;
