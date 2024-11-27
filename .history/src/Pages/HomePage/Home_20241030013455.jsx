import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExplorePage from "./ExplorePage";
import Navbar from "../../Components/Navbar";
import { UserAuth } from "../../Context/AuthContext";
import SearchBar from "../../Components/SearchBar";
import Settings from '../../Components/Settings';
import HeaderStyle1 from "../../Components/HeaderStyle1";
import { SideBar } from "../../Components/SideBar";

export default function Home() {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState(null); // Combined search and filter criteria
  const { logOut, user, googleSignIn } = UserAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  // Handle updating criteria from SideBar
  const handleSearchAndFilterCriteria = (newCriteria) => {
    setCriteria(newCriteria);
  };
  return (
    <>
      <div className="flex flex-col 2xl:flex-row w-full h-auto">
          {/* Pass the handler to SideBar for filter criteria */}
            <SideBar currentPage="home" onSearchAndFilterApply={handleSearchAndFilterCriteria} />
        <div className="flex-grow 2xl:w-3/4">
          <div className="flex flex-col">
            <div className="flex justify-between px-[10px] my-[50px] mb-[20px] w-full">
              {/* Pass handleSearchResults to SearchBar */}
              {window.innerWidth < 1320 ? <SearchBar/> : ''}
              {window.innerWidth < 1320 ?( <Settings> <img src="assets/settings-svgrepo-com.svg" className="w-[30px]" /></Settings> ): ''}
                
            </div>
            <div className="ml-[50px]">
              <HeaderStyle1>Explore The World</HeaderStyle1>
            </div>
            <div className="mx-auto h-auto flex flex-col items-center gap-6 py-[60px] w-full 2xl:grid 2xl:grid-cols-2">
              {/* Pass searchResults and filterCriteria to ExplorePage */}
              <ExplorePage criteria={criteria} />
            </div>
          </div>
        </div>
      </div>
      {window.innerWidth < 1320 ? <Navbar /> : ''}
    </>
  );
}
