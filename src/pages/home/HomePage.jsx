import "./homePage.css";
import TopBar from "../../components/topBar/TopBar";
import Card from "../../components/card/Card";
import Category from "../../components/Category/Category";

const HomePage = () => {
  return (
    <div className="home">
      <TopBar />
      <Category />
      <Card />
    </div>
  );
};

export default HomePage;
