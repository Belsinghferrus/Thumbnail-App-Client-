import "./topbar.css";
import Search from "./component/Search";
import Profile from "./component/Profile";
import Logo from "./component/Logo";
const TopBar = () => {


  return (
    <div className="topbar">
     
      <Logo />
      <Search />
      <Profile />
      
    </div>
  );
};

export default TopBar;
