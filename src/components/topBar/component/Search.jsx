import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useThumbnailStore from "../../../context/useThumbnailStore";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const { getThumbnail } = useThumbnailStore();


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
    if (searchQuery.trim() === "") return;
    setSearchParams({ query: searchQuery });
    getThumbnail(searchQuery);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
