import React from 'react'
import './thumbnail.css'
import TopBar from './../../components/topBar/TopBar';
import Thumbnail from './../../components/Thumbnail/Thumbnail';

const ThumbnailPage = () => {
  return (
    <div className='thumbnail-page'>
      <TopBar />
      <br/>
      <Thumbnail />
    </div>
    

  )
}

export default ThumbnailPage
