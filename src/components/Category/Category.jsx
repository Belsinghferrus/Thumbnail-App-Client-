import { useEffect, useRef, useState } from "react";
import "./category.css";
import useThumbnailStore from "../../Store/useThumbnailStore";
import { useNavigate } from "react-router-dom";

const tags = [
  "All",
  "Comedy",
  "Education",
  "Entertainment",
  "Science & Tech",
  "Film & Animation",
  "Gaming",
  "Howto & Style",
  "Music",
  "News & Politics",
  "Nonprofits",
  "People & Blogs",
  "Pets & Animals",
  "Sports",
  "Travel & Events",
];

const Category = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { filterThumbnail, getThumbnail, loadedThumbnails } = useThumbnailStore();
  const [page, setPage] = useState(1);
  const navigate = useNavigate()



  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  console.log("filter",loadedThumbnails);


  const handleClick = (tag) => {
    setActiveIndex(tags.indexOf(tag));
    setPage(1)
    if (tag === "All") {
      // useThumbnailStore.setState({ thumbnail: [] });
      getThumbnail("", 1);
    } else {
      useThumbnailStore.setState({ thumbnail: [] });
      filterThumbnail(tag, 1);
    }
  };

  return (
    <div>
      <div></div>
      <div
      className="category"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {tags.map((tag, index) => (
        <button
          key={index}
          className={`tag ${index === activeIndex ? "active" : ""}`}
          onClick={() => handleClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
    </div>
    
  );
};

export default Category;
