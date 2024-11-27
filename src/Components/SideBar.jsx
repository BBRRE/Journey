import React, { useEffect, useState } from 'react';
import { GetUserName } from '../Config/firestore';
import { UserAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';
import Settings from './Settings';
import { useNavigate } from 'react-router-dom';


export const SideBar = ({ currentPage, onSearchAndFilterApply }) => {
  const { user, logOut } = UserAuth();
  const [userData, setUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [continent, setContinent] = useState('');
  const [minActivities, setMinActivities] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserName = async () => {
      if (user && Object.keys(user).length > 0 && user.email ){
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

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error(err);
    }
  };

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
  };


  return (
    <div className="hidden 2xl:block 2xl:w-[350px] h-full rounded-l-3xl  sticky top-0">
      {user ? (<div className="flex flex-col pb-3 bg-white shadow-md rounded-r-3xl p-6">
        <Link to={`/${userData?.username}`} className={`${user ? 'block' : 'hidden'}`} >
          <div className="flex w-[90%] max-w-[1160px] mx-auto mt-[20px]">
            <img className="w-[80px] h-[80px] rounded-full shadow-md" src={userData?.photoURL || "/assets/Default_pfp.svg.png"}
              alt="Profile"
              onError={(e) => { e.target.src = "/assets/Default_pfp.svg.png"; }} />
            <div className="flex flex-col pl-4 w-[250px]">
              <span className="font-semibold text-lg text-gray-800">@{userData?.username}</span>
              <div className="flex items-center mt-1 text-gray-600">
                <img className="h-[15px] w-[15px]" src="/assets/location-pin-alt-svgrepo-com.svg" alt="Location" />
                <span className="text-sm ml-1">{userData?.location}</span>
              </div>
              <span className="text-sm text-gray-600 mt-2">{userData?.bio}</span>
            </div>
          </div>
        </Link>
      </div>) : ''}

      <div className="w-[95%] bg-white shadow-md rounded-lg border border-gray-200 py-4 px-5 mx-auto flex flex-col my-4 text-gray-800 font-sans font-medium text-lg gap-3">
        {user ? (
          <>
            <Link to="/" className={`flex items-center gap-2 py-2 hover:bg-blue-gray-100 rounded transition ${currentPage === 'home' ? 'bg-blue-gray-100  px-2' : ''}`} onClick={() => {if(currentPage === 'home'){
              onSearchAndFilterApply(null)
            }}} >
              <img src="/assets/Compass.svg" className="w-6" alt="Explore Icon"  />
              <span>Explore Page</span>
            </Link>
            <Link to="/AddJourney" className={`flex items-center gap-2 py-2 hover:bg-blue-gray-100 rounded transition ${currentPage === 'add' ? 'bg-blue-gray-100  px-2' : ''}`}>
              <img src="/assets/Plus.svg" className="w-6" alt="Add Journey Icon" />
              <span>Post Log</span>
            </Link>
            <div className='flex flex-col text-md ml-[-10px] gap-1 text-blue-gray-800'>

              <Settings>
                <div className="flex items-center gap-2 py-2 hover:bg-blue-gray-100 rounded transition cursor-pointer ">
                  <img src="/assets/settings-svgrepo-com.svg" className="w-5" alt="Settings Icon" />
                  <span>Settings</span>
                </div>
              </Settings>
              <Link onClick={handleSignOut} className="flex items-center gap-2 py-2 hover:bg-blue-gray-100 rounded transition">
                <img src="/assets/logout-2-svgrepo-com.svg" className="w-5" alt="Logout Icon" />
                <span>Log Out</span>
              </Link>

            </div>
          </>
        ) : (
          <button onClick={() => { navigate('/login') }} className="text-white bg-blue-500 rounded px-4 py-2">Log In</button>
        )}
      </div>
      {currentPage === 'home' ? <div className="w-[95%] bg-white shadow-md rounded-lg border border-gray-200 py-5 px-5 mx-auto flex flex-col my-6 text-gray-800 font-sans font-medium text-lg gap-4">
        <h1 className="text-xl font-semibold mb-2">Filters</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Price Range Input Component */}
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-gray-200"
          />
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
              <option value="NAmerica">North America</option>
              <option value="SAmerica">South America</option>
              <option value="Oceania">Oceania</option>
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
              min="0"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-gray-300 text-white rounded-md py-2 px-4 mt-4 hover:bg-blue-gray-400 focus:outline-none focus:ring-2"
          >
            Apply Filters
          </button>
        </form>
      </div> : ''}


    </div>
  );
};
