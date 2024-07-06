import React from "react";
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ExplorePage from "./ExplorePage";
import Continents from "./Continents";
import { NavigationFontIcon } from "react-md";
import Navbar from "../../Components/Navbar";
import SearchBar from "../../Components/SearchBar";
import Settings from '../../Components/Settings'
import TSContinents from "./TSContinents";

export default function Home() {
  const { logOut, user, googleSignIn } = UserAuth();
  const navigate = useNavigate();

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
      <div className="flex flex-col">
        <div className="flex justify-between m-[10px] my-[20px] mb-[40px]">
          <SearchBar></SearchBar>
          <Settings></Settings>
        </div>
        <h1 className="text-4xl font-fontMain self-start mb-[-10px] border-b-2 border-black pr-[25px] pl-[5px] pl-[20px]">Travel the Continents</h1>
      <div className="mx-auto flex flex-col gap-1 w-[100%]">
        {window.matchMedia("(pointer: coarse)").matches ? <TSContinents></TSContinents> :  <Continents></Continents>}
          
        </div>
         <h1 onClick={ () => {navigate('/search/explore')}} className=" hover:cursor-pointer  text-4xl font-fontMain self-start mb-[-10px] border-b-2 border-black pr-[25px] pl-[5px] pl-[20px]">Explore trending Logs ...</h1>
        <div className="mx-auto flex flex-col gap-1 pb-[60px]">
          <ExplorePage></ExplorePage>
        </div>
      </div>
      <Navbar></Navbar>
    </>
  );
}
