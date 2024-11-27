import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;
      
    navigate(`/search/${searchTerm}`);

    // setSearchResults( await getJourney(`journeyData`,searchTerm))
  };

  return (
    <form className=' w-full m-0 p-0 flex ' onSubmit={handleSearch}>
      <input
        className='w-[60%] min-w-[200px] max-w-[500px] h-[30px] bg-transparent border-2 border-blue-gray-300 pl-[10px] rounded-full'
        placeholder='Explore'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className='font-bold ml-[10px]' type="submit"><img src="assets\search-svgrepo-com.svg" className='w-5 '/></button>
      
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </form>
  );
};

export default Searchbar;