import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import ThumbnailPage from "./pages/thumbnail/ThumbnailPage";
import ProfilePage from "./pages/profile/ProfilePage";
import UploadPage from "./components/upload/UploadPage";
import useAuth from "./Store/useAuthStore";
import { Toaster } from "react-hot-toast";
import Edit from "./components/Edit/Edit";
import Security from "./components/Security/Security";
import ProfileView from "./components/ProfileView/ProfileView";
import useThumbnailStore from "./Store/useThumbnailStore";
import PrivacyPolicy from "./pages/privacy/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer/Disclaimer";


const App = () => {
  const { authUser, checkAuth, isCheckingAuth, userDetails, userThumbnail } =
    useAuth();
  const { isGettingThumbnail, getThumbnail } = useThumbnailStore();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    checkAuth();
    getThumbnail();
    const timeOut = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    return () => clearTimeout(timeOut)
  }, [checkAuth, getThumbnail]);

  console.log({ authUser });
  console.log({ userDetails });
  console.log({ userThumbnail });
  console.log("geting thumbnail", isGettingThumbnail);
  console.log("is checking auth", isCheckingAuth);
  console.log("loader", showLoader);
  

  if (showLoader || isCheckingAuth && isGettingThumbnail)
    return (
      <div className="progress-loader">
        <div className="progress"></div>
      </div>
    );

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/thumbnails/:id"
          element={
            authUser ? <ThumbnailPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/upload"
          element={authUser ? <UploadPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit"
          element={authUser ? <Edit /> : <Navigate to="/login" />}
        />
        <Route
          path="/security"
          element={authUser ? <Security /> : <Navigate to="/login" />}
        />
        <Route
          path="/user/:userId"
          element={authUser ? <ProfileView /> : <Navigate to="/login" />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route
          path="*"
          element={authUser ? <Navigate to="/" replace /> : <></>}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
