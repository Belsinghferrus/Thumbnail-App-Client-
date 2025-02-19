import "./topbar.css";
import Search from "./component/Search";
import Profile from "./component/Profile";
import Logo from "./component/Logo";
import { useEffect, useState } from "react";
const TopBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    // Listen for window resize to update isMobile state
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="topbar">
      {isMobile ? (
        <>
          {!isSearchActive && <Logo />}
          <Search isMobile={isMobile} setIsSearchActive={setIsSearchActive} />
          {!isSearchActive && <Profile />}
        </>
      ) : (
        <>
          <Logo />
          <Search />
          <Profile />
        </>
      )}
    </div>
  );
};

export default TopBar;
