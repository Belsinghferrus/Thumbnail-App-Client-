/* eslint-disable react/prop-types */

import ReactLinkify from 'react-linkify';
import timeAgo from '../../../utils/timeAgo';

const Description = ({thumbnailDetail}) => {

  


  const linkDecorator = (decoratedHref, decoratedText, key) => (
    <a
      href={decoratedHref}
      key={key}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#007bff", textDecoration: "underline" }} // Custom styles
    >
      {decoratedText}
    </a>
  );


  return (
    <div className="decription-container">
      <div style={{display: "flex", gap: "10px"}}>
        <h4>{thumbnailDetail?.impressions || 0} Clicks</h4>
        <p className='time-desc'>{timeAgo( thumbnailDetail?.createdAt)}</p>
      </div>
          
          <p className="description"> <br></br> 
          <ReactLinkify componentDecorator={linkDecorator}>
            {thumbnailDetail?.description || "No description available"}
            </ReactLinkify> </p>
        </div>
  )
}

export default Description
