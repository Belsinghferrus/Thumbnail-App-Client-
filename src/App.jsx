import React, {useEffect} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/login/LoginPage';
import ThumbnailPage from './pages/thumbnail/ThumbnailPage';
import ProfilePage from './pages/profile/ProfilePage';
import UploadPage from './components/upload/UploadPage';
import useAuth from './context/useAuthStore';
import Loader from './components/Loader/Loader';
import { Toaster } from 'react-hot-toast';
import Edit from './components/Edit/Edit';
import Security from './components/Security/Security';



const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuth();
  
useEffect(() => {
  checkAuth()
}, [checkAuth])


console.log({authUser});

if(isCheckingAuth && !authUser)
 return(
  <div className='loading'>
    <Loader />
  </div>
)


  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to ='/login' /> } />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/thumbnails/:id' element={ authUser ? <ThumbnailPage /> : <Navigate to ='/login' />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to ='/login' />} />
        <Route path='/upload' element={authUser ? <UploadPage /> : <Navigate to ='/login' />} />
        <Route path='/edit' element={authUser ? <Edit /> : <Navigate to ='/login' />} />
        <Route path='/security' element={authUser ? <Security /> : <Navigate to ='/login' />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
