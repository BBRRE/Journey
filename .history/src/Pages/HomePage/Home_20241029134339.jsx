import React from "react";
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ExplorePage from "./ExplorePage";
import { NavigationFontIcon } from "react-md";
import Navbar from "../../Components/Navbar";
import SearchBar from "../../Components/SearchBar";
import Settings from '../../Components/Settings'
import HeaderStyle1 from "../../Components/HeaderStyle1";
import { useState, useEffect } from "react";
import { Height } from "@mui/icons-material";
import { SideBar } from "../../Components/SideBar";

export default function Home() {
  const { logOut, user, googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update window width state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      console.log(window.outerWidth )
    };

    // Listen to window resize event
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  //sign out
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  //sign in
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
<div  className="w-[600px] h-auto">
  
<SideBar currentPage="home"/>
  
</div>
        <div className="flex-grow 2xl:w-3/4">
          <div className="flex flex-col">
            <div className="flex justify-between px-[10px] my-[50px] mb-[20px] w-full">
              <SearchBar />
            <Settings><img src="public\assets\settings-svgrepo-com.svg" className="w-[30px]" /></Settings>
            </div>
            <div onClick={() => navigate('/search/explore')}>
              <HeaderStyle1>Explore trending Logs ...</HeaderStyle1>
            </div>
            <div className="mx-auto flex flex-col items-center gap-6 py-[60px] w-full 2xl:grid 2xl:grid-cols-2">
              <ExplorePage />
            </div>
          </div>
        </div>

      </div>
  
      {window.innerWidth < 1320  ? <Navbar /> : ''}
    </>
  )     
}
