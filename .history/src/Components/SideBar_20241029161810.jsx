import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SideBar = ({ currentPage, onSearchAndFilterApply }) => {
  const [searchTerm, setSearchTerm] = useState('');           // Search term state
  const [continent, setContinent] = useState('');             // Filter by continent
  const [minActivities, setMinActivities] = useState(1);      // Minimum activities filter
  const [minPrice, setMinPrice] = useState(0);                // Minimum price filter
  const [maxPrice, setMaxPrice] = useState(500);              // Maximum price filter
  const navigate = useNavigate();

  // Handle search and filter submission together
  const handleSubmit = (e) => {
    e.preventDefault();

    const criteria = {
      searchTerm,
      filters: {
        minPrice,
        maxPrice,
        continent,
        minActivities,
      },
    };

    // Pass criteria to Home for processing in ExplorePage
    onSearchAndFilterApply(criteria);
    navigate(`/search/${searchTerm || 'explore'}`);
  };

  return (
    <div className="hidden 2xl:block 2xl:w-[450px] h-full rounded-l-3xl bg-gray-100">
      {/* User Profile */}
      <div className="flex flex-col pb-3 bg-white shadow-md rounded-r-3xl p-6">
        {/* Profile JSX layout */}
      </div>

      {/* Sidebar Links */}
      <div className="w-[95%] bg-white shadow-md rounded-lg border border-gray-200 py-4 px-5 mx-auto flex flex-col my-4 text-gray-800 font-sans font-medium text-lg gap-3">
        {/* Sidebar links JSX layout */}
      </div>

      {/* Search and Filters Form */}
      {currentPage === 'home' && (
        <div className="w-[95%] bg-white shadow-md rounded-lg border border-gray-200 py-5 px-5 mx-auto flex flex-col my-6 text-gray-800 font-sans font-medium text-lg gap-4">
          <h1 className="text-xl font-semibold mb-2">Filters & Search</h1>
          
          {/* Search Bar */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
            />

            {/* Price Range Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Price Range ($)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step={100}
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-20 border border-gray-300 rounded-md p-2 text-center text-gray-700"
                  min="0"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-20 border border-gray-300 rounded-md p-2 text-center text-gray-700"
                  min="0"
                />
              </div>
            </div>

            {/* Continent Selection */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Continent</label>
              <select
                value={continent}
                onChange={(e) => setContinent(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
              >
                <option value="">Select Continent</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Australia">Australia</option>
                <option value="Antarctica">Antarctica</option>
              </select>
            </div>

            {/* Minimum Activities */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Minimum Activities</label>
              <input
                type="number"
                value={minActivities}
                onChange={(e) => setMinActivities(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 text-center bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
                min="1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4 mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Apply Filters & Search
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
