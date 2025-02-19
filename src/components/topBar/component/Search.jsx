import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useThumbnailStore from "../../../Store/useThumbnailStore";
import { IoArrowBack } from "react-icons/io5";
import search from '../../../assets/search.png'
// eslint-disable-next-line react/prop-types
const Search = ({ setIsSearchActive, isMobile }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const { getThumbnail } = useThumbnailStore();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      getThumbnail(searchQuery);
    }
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      getThumbnail();
    }
    setSearchParams({ query: searchQuery });
    getThumbnail(searchQuery);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setIsSearchActive(true);
  };

  const handleCollapse = () => {
    if (isMobile) {
        setIsExpanded(false);
    setIsSearchActive(false);
    setSearchQuery("");
    }
  
  };
  return (
    <div className="search">
      <form onSubmit={handleSearchSubmit} className={`search-bar ${isExpanded ? "expanded-search-bar" : ""}`}>
        {isMobile && isExpanded &&(
          <div type="button" className="back-button" onClick={handleCollapse}>
            <IoArrowBack size={24} />
          </div>
        )}
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleExpand}
          className={`search-input ${isExpanded ? "expanded-search-input" : ""}`}
        />
        {isMobile && !isExpanded ?( 
          <button  type="submit" className="search-button">
            <img style={{filter: "invert()", width: "16px"}} src={search} alt="search"/>
            </button>
        )
        :
        (
<button type="submit" className="search-button">
          Search
        </button>

        )}
        
      </form>
    </div>
  );
};

export default Search;
