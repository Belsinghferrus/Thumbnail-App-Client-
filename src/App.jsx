import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import ThumbnailPage from './pages/thumbnail/ThumbnailPage';
import ProfilePage from './pages/profile/ProfilePage';



const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/thumbnail' element={<ThumbnailPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
