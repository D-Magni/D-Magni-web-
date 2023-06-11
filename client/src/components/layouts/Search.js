import React, { useState } from 'react';
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword(''); 
    } else {
      navigate('/shop');
    }
  };

  const isAdminPage = window.location.pathname.startsWith("/admin") || window.location.pathname.startsWith("/dashboard");

  return (
    <form onSubmit={searchHandler} className="flex">
      <div className="w-full">
        <input
          type="text"
          id="search_field"
          className="form-control outline-none text-black py-[5px] px-2 w-full rounded-l"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div>
        <button
          id="search_btn"
          className={`bg-${isAdminPage ? 'gray-700' : 'primary-color'} shadow-lg py-1 px-2 rounded-r`}
        >
          <SearchIcon className="text-white" />
        </button>
      </div>
    </form>
  );
};

export default Search;
