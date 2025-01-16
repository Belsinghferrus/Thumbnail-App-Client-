import React, { useEffect, useRef, useState } from "react";
import "./category.css";

const tags = [
  "All",
  "Comedy",
  "Education",
  "Entertainment",
  "Film & Animation",
  "Gaming",
  "Howto & Style",
  "Music",
  "News & Politics",
  "Nonprofits",
  "People & Blogs",
  "Pets & Animals",
  "Science & Tech",
  "Sports",
  "Travel & Events",
];

const Category = () => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);



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



  const handleClick = (index) => {
    setActiveIndex(index);
  };

  

  return (
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
          onClick={() => handleClick(index)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Category;
