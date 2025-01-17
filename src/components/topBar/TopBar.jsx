import React from "react";
import "./topbar.css";
import search from '../../assets/search.png'
import Search from "./component/Search";
import Profile from "./component/Profile";
const TopBar = () => {


  return (
    <div className="topbar">
      <div className="logo">Logo</div>

      <Search />
      <Profile />
      
    </div>
  );
};

export default TopBar;
