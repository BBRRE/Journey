import React, { useState, useEffect } from 'react'
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { deleteData, getUserJourney } from '../../Config/firestore';
import OverviewD from '../../Components/DisplayOverview/OverviewD'
import Overview from '../../Components/DisplayOverview/Overview';
import { updateCurrentUser } from 'firebase/auth';
import Navbar from '../../Components/Navbar';
import { GetUserName } from '../../Config/firestore';
import { SideBar } from '../../Components/SideBar';

export default function Profile() {

  const { userName } = useParams()
  const { user } = UserAuth()

  const navigate = useNavigate();
  const [myData, setMyData] = useState([])
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const getData = async () => {
      GetUserName(userName, 'username').then(res => {
        setUserData(res)
        console.log(res)
      })
      getUserJourney(userName).then(res => {
        setMyData(res)
        console.log(res)
      })
    }
    getData()
  }, [userName, user])

  const why = () => {
    if (myData && user.email === userData?.email) {
      return (myData.map((x) =>
        <>
          <div className='flex flex-col align-middle'>
            <OverviewD
              key={crypto.randomUUID()}
              obj={x}
            >

            </OverviewD>
          </div>
        </>
      ))
    } else if (myData) {
      return (myData.map((x) =>
        <>
          <Overview
            key={crypto.randomUUID()}
            obj={x}
          >

          </Overview>
        </>
      ))
    }
  }

  return (
    <>
    <div className='flex'>
      <div className='w-[400px] h-auto' ></div>
      <SideBar/>

        <div className='flex flex-col w-full'>
          <div className='w-full md:w-full h-[200px] bg-gradient-to-br from-secondaryAc-light to-secondaryAc-dark flex items-center m-[0px]' >
            <div className='flex w-[90%] max-w-[1160px] mx-auto mt-[20px]'>
              <img className='w-[120px] h-[120px] rounded-2xl shadow-lg' src={userData?.photoURL} />
              <div className='flex flex-col pl-4 w-[250px]'>
                <span className='font-semibold text-lg' >@{userName}</span>
                <div className="flex itens-center ">
                  <img className="h-[15px] w-[15px]" src='/assets/location-pin-alt-svgrepo-com.svg' alt="" />
                  <span className="text-sm font-light text-gray-700">{userData.loaction}</span>
                </div>
                <span className='text-md'>{userData.bio}</span>
              </div>
            </div>
          </div>
          <div className="grid mt-[50px] mb-[150px] mx-auto gap-[20px] 2xl:grid-cols-2 max-w-[1300px] grid-cols-1 w-full vert">
            {why()}
          </div>
        </div>
        {window.innerWidth < 1320 ? <Navbar /> : ''}
    </div>
    </>
  )
}
