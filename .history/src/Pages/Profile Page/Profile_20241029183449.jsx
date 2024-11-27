import React, { useState, useEffect } from 'react';
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { deleteData, getUserJourney, GetUserName } from '../../Config/firestore';
import OverviewD from '../../Components/DisplayOverview/OverviewD';
import Overview from '../../Components/DisplayOverview/Overview';
import Navbar from '../../Components/Navbar';
import { SideBar } from '../../Components/SideBar';

export default function Profile() {
  const { userName } = useParams();
  const { user } = UserAuth();

  const navigate = useNavigate();
  const [myData, setMyData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const userDataResponse = await GetUserName(userName, 'username');
      setUserData(userDataResponse);

      const journeyDataResponse = await getUserJourney(userName);
      setMyData(journeyDataResponse);
    };
    getData();
  }, [userName, user]);

  const renderPosts = () => {
    if (myData && user.email === userData?.email) {
      return myData.map((x) => (
        <div className='flex flex-col align-middle' key={x.id}>
          <OverviewD obj={x} />
        </div>
      ));
    } else if (myData) {
      return myData.map((x) => (
        <div className='flex flex-col align-middle' key={x.id}>
          <Overview obj={x} />
        </div>
      ));
    }
    return null;
  };

  return (
    <>
      <div className='flex w-full'>
        {/* Sidebar for larger screens */}
        <div className='w-[350px] h-auto hidden 2xl:block'>
          <SideBar currentPage="profile" />
        </div>

        {/* Profile Header for small screens */}
        <div className='w-full md:w-full h-[200px] bg-gradient-to-br from-secondaryAc-light to-secondaryAc-dark flex items-center 2xl:hidden'>
          <div className='flex w-[90%] max-w-[1160px] mx-auto mt-[20px]'>
            <img className='w-[120px] h-[120px] rounded-2xl shadow-lg' src={userData?.photoURL || "/default-image.jpg"} alt="Profile" />
            <div className='flex flex-col pl-4 w-[250px]'>
              <span className='font-semibold text-lg'>@{userName}</span>
              <div className="flex items-center">
                <img className="h-[15px] w-[15px]" src='/assets/location-pin-alt-svgrepo-com.svg' alt="Location" />
                <span className="text-sm font-light text-gray-700">{userData.location || "Location not set"}</span>
              </div>
              <span className='text-md'>{userData.bio || "No bio available"}</span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex flex-col flex-grow mx-auto gap-[20px] 2xl:ml-[350px] p-5">
          {myData.length ? renderPosts() : "You haven't uploaded anything yet"}
        </div>

        {/* Navbar for smaller screens */}
        {window.innerWidth < 1320 && <Navbar />}
      </div>
    </>
  );
}
