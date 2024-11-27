import React, { useState, useEffect } from "react";
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ExplorePage from "./ExplorePage";
import Navbar from "../../Components/Navbar";
import SearchBar from "../../Components/SearchBar";
import Settings from '../../Components/Settings';
import HeaderStyle1 from "../../Components/HeaderStyle1";
import { SideBar } from "../../Components/SideBar";

export default function Home() {
  const { logOut, user, googleSignIn } = UserAuth();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // State for filtered posts
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [searchResults, setSearchResults] = useState(null);  // Search results

  // Handle filtered data from SideBar
  const handleFilteredData = (data) => {
    setFilteredPosts(data);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      console.log(window.outerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col 2xl:flex-row w-full h-screen">
        <div className="w-[600px] h-auto">
          {/* Pass the handler to SideBar */}
          <SideBar currentPage="home" onFilterApply={handleFilteredData} />
        </div>
        <div className="flex-grow 2xl:w-3/4">
          <div className="flex flex-col">
            <div className="flex justify-between px-[10px] my-[50px] mb-[20px] w-full">
              <SearchBar />
              <Settings><img src="public/assets/settings-svgrepo-com.svg" className="w-[30px]" /></Settings>
            </div>
            <div onClick={() => navigate('/search/explore')}>
              <HeaderStyle1>{filteredPosts ? 'Results' : 'Explore trending Logs ...'}</HeaderStyle1>
            </div>
            <div className="mx-auto flex flex-col items-center gap-6 py-[60px] w-full 2xl:grid 2xl:grid-cols-2">
              {/* Pass filteredPosts to ExplorePage */}
              <ExplorePage filteredPosts={filteredPosts} />
            </div>
          </div>
        </div>
      </div>
      {window.innerWidth < 1320 ? <Navbar /> : ''}
    </>
  );
}
