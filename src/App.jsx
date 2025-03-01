import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, userDetails, userThumbnail } =
    useAuth();
  const { isGettingThumbnail } = useThumbnailStore();
  const [showLoader, setShowLoader] = useState(true);


//----------WORKING CHECKAUTH -------------------
  useEffect(() => {
    checkAuth();
    const timeOut = setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    return () => clearTimeout(timeOut)
  }, [checkAuth, ]);

  console.log({ authUser });
  console.log({ userDetails });
  console.log({ userThumbnail });
  console.log("geting thumbnail", isGettingThumbnail);
  console.log("is checking auth", isCheckingAuth);
  console.log("initial loader ", showLoader);
 
  

  if (showLoader)
    return (
      <div className="progress-loader">
        <div className="progress"></div>
      </div>
    );

  return (
    <div className="app">
      <Analytics/>
      <SpeedInsights/>
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
