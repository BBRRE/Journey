import React, { useEffect, useState } from 'react';
import { GetUserName } from '../Config/firestore';
import { UserAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import { filteredSearch } from '../Config/firestore';
import { useNavigate } from 'react-router-dom';


export const SideBar = ({ currentPage, posts }) => {
  const { user } = UserAuth();
  const [userData, setUserData] = useState(null);
  const [continent, setContinent] = useState(''); // Selected continent
  const [minActivities, setMinActivities] = useState(1); // Minimum number of activities
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const navigate  = useNavigate()

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const data = await GetUserName(user.email, 'email');
          setUserData(data);
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      }
    };

    fetchUserName();
  }, [user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the filter object
    const filterData = {
      minPrice,
      maxPrice,
      continent,
      minActivities,
    };

    // Log or send `filterData` to the database
    filteredSearch(filterData).then(e => {
      navigate('/filtered-results', { 
        state: { 
          filteredPosts: e,
          appliedFilters: filterData 
        } 
      });
    })


    console.log('Filter Data:', filterData);

    // Replace this with code to send `filterData` to your database as needed
  };

  return (
    <div className="hidden 2xl:block 2xl:w-[450px] h-full rounded-l-3xl bg-gray-100">
      <div className="flex flex-col pb-3 bg-white shadow-md rounded-r-3xl p-6">
        <div className="flex w-[90%] max-w-[1160px] mx-auto mt-[20px]">
          <img className="w-[80px] h-[80px] rounded-full shadow-md" src={userData?.photoURL} alt="User Profile" />
          <div className="flex flex-col pl-4 w-[250px]">
            <span className="font-semibold text-lg text-gray-800">@{userData?.username}</span>
            <div className="flex items-center mt-1 text-gray-600">
              <img className="h-[15px] w-[15px]" src="/assets/location-pin-alt-svgrepo-com.svg" alt="Location" />
              <span className="text-sm ml-1">{userData?.location}</span>
            </div>
            <span className="text-sm text-gray-600 mt-2">{userData?.bio}</span>
          </div>
        </div>
      </div>

      <div className="w-[95%] bg-white shadow-md rounded-lg border border-gray-200 py-4 px-5 mx-auto flex flex-col my-4 text-gray-800 font-sans font-medium text-lg gap-3">
        {user ? (
          <>
            <Link to="/" className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded transition">
              <img src="public/assets/Compass.svg" className="w-6" alt="Explore Icon" />
              <span>Explore Page</span>
            </Link>
            <Link to="/AddJourney" className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded transition">
              <img src="public/assets/Plus.svg" className="w-6" alt="Add Journey Icon" />
              <span>Post Log</span>
            </Link>
            <Settings>
              <div className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded transition cursor-pointer">
                <img src="public/assets/settings-svgrepo-com.svg" className="w-6" alt="Settings Icon" />
                <span>Settings</span>
              </div>
            </Settings>
            <Link className="flex items-center gap-2 py-2 hover:bg-gray-100 rounded transition">
              <img src="public/assets/logout-2-svgrepo-com.svg" className="w-6" alt="Logout Icon" />
              <span>Log Out</span>
            </Link>
          </>
        ) : (
          <button className="text-white bg-blue-500 rounded px-4 py-2">Log In</button>
        )}
      </div>
{currentPage === 'home'?  <div className="w-[95%] bg-white shadow-md rounded-lg border border-gray-200 py-5 px-5 mx-auto flex flex-col my-6 text-gray-800 font-sans font-medium text-lg gap-4">
        <h1 className="text-xl font-semibold mb-2">Filters</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Price Range Input Component */}
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

          {/* Minimum Number of Activities */}
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
            Apply Filters
          </button>
        </form>
      </div> : ''}

      
    </div>
  );
};
