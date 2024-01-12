import React, { useState } from 'react';
import { remove } from 'remove-accents';
import { IoIosSearch } from 'react-icons/io';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  // TODO: Manipulate productdata by importing it from Context

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    setSearch(eventValue);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchInput = remove(search);
    console.log(searchInput);
    // TODO: Add search functionality
  };

  return (
    <form className="search" onSubmit={(e) => handleSearch(e)}>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={search}
        onChange={(e) => handleChange(e)}
      />
      <button className="search-btn" onClick={() => handleSearch}>
        <IoIosSearch className="search-btn-icon" />
      </button>
    </form>
  );
};

export default SearchBar;
