import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJourney } from '../Config/firestore';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;

    // Perform search and update Home state with results
    const results = await getJourney(`journeyData`, searchTerm);
    onSearch(results);  // Pass results to Home
  };

  return (
    <form className="w-full m-0 p-0 flex" onSubmit={handleSearch}>
      <input
        className="w-[60%] min-w-[200px] max-w-[500px] h-[30px] bg-transparent border-2 border-blue-gray-300 pl-[10px] rounded-full"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="font-bold ml-[10px]" type="submit">
        <img src="public/assets/search-svgrepo-com.svg" className="w-5" alt="Search Icon" />
      </button>
    </form>
  );
};

export default SearchBar;
