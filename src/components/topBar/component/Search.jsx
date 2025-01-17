import React from 'react'

const Search = () => {
    function handleSubmit(){

    }
  return (
    <div>
      <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        // value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
    </div>
  )
}

export default Search
