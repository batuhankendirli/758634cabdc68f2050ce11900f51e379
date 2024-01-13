import { useState, useContext, useEffect } from 'react';
import { remove } from 'remove-accents';
import { IoIosSearch } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

import { Context } from '../Context';

const SearchBar = ({ mobile }: { mobile: boolean }) => {
  const [search, setSearch] = useState('');
  const { setSearchQuery, searchQuery, setActivePage } = useContext(Context);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value;
    setSearch(eventValue);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchInput = remove(search).toLowerCase().trim();

    const cleanedSearchInput = searchInput
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ');

    setSearchQuery(cleanedSearchInput);
    setActivePage(1);
  };

  useEffect(() => {
    if (searchQuery === '') {
      setSearch('');
      setActivePage(1);
    }
  }, [searchQuery]);

  const handleClearSearchQuery = () => {
    setSearchQuery('');
    setSearch('');
    setActivePage(1);
  };

  return (
    <form
      className={`search ${mobile ? 'mobile' : ''}`}
      onSubmit={(e) => handleSearch(e)}
    >
      <button className="search-btn" onClick={() => handleSearch}>
        <IoIosSearch className="search-btn-icon" />
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={search}
        onChange={(e) => handleChange(e)}
      />

      <button
        className={`search-btn ${searchQuery ? '' : 'hidden'}`}
        onClick={handleClearSearchQuery}
      >
        <IoCloseOutline className="search-btn-icon" />
      </button>
    </form>
  );
};

export default SearchBar;
