import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExplorePage from "./ExplorePage";
import Navbar from "../../Components/Navbar";
import SearchBar from "../../Components/SearchBar";
import Settings from '../../Components/Settings';
import HeaderStyle1 from "../../Components/HeaderStyle1";
import { SideBar } from "../../Components/SideBar";

export default function Home() {
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState(null); // Combined search and filter criteria

  // Handle updating criteria from SideBar
  const handleSearchAndFilterCriteria = (newCriteria) => {
    setCriteria(newCriteria);
  };
  return (
    <>
      <div className="flex flex-col 2xl:flex-row w-full h-screen">
        <div className="w-[600px] h-auto">
          {/* Pass the handler to SideBar for filter criteria */}
          <SideBar currentPage="home" onFilterApply={handleFilterCriteria} />
        </div>
        <div className="flex-grow 2xl:w-3/4">
          <div className="flex flex-col">
            <div className="flex justify-between px-[10px] my-[50px] mb-[20px] w-full">
              {/* Pass handleSearchResults to SearchBar */}
              <SearchBar onSearch={handleSearchResults} />
              <Settings><img src="public/assets/settings-svgrepo-com.svg" className="w-[30px]" /></Settings>
            </div>
            <div onClick={() => navigate('/search/explore')}>
              <HeaderStyle1>Explore trending Logs ...</HeaderStyle1>
            </div>
            <div className="mx-auto flex flex-col items-center gap-6 py-[60px] w-full 2xl:grid 2xl:grid-cols-2">
              {/* Pass searchResults and filterCriteria to ExplorePage */}
              <ExplorePage searchResults={searchResults} filterCriteria={filterCriteria} />
            </div>
          </div>
        </div>
      </div>
      {window.innerWidth < 1320 ? <Navbar /> : ''}
    </>
  );
}
