import React, { useState, useEffect } from 'react'
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { deleteData, getUserJourney } from '../../Config/firestore';
import OverviewD from '../../Components/DisplayOverview/OverviewD'
import Overview from '../../Components/DisplayOverview/Overview';
import { updateCurrentUser } from 'firebase/auth';
import Navbar from '../../Components/Navbar';
import { GetUserName, getLikedPosts } from '../../Config/firestore';
import { SideBar } from '../../Components/SideBar';

export default function Profile() {

  const { userName } = useParams()
  const { user } = UserAuth()

  const navigate = useNavigate();
  const [myData, setMyData] = useState([])
  const [userData, setUserData] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  const [view, setView] = useState(true)

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
      getLikedPosts(user.email).then(res => {
        setLikedPosts(res)
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
  
  const likedData = () => {
    return (likedPosts.map((x) =>
    <>
      <div className='flex flex-col align-middle'>
        <Overview
          key={crypto.randomUUID()}
          obj={x}
        >

        </Overview>
      </div>
    </>
  ))
  }
  

  return (
    <>
      <div className='flex'>

        <div className='flex flex-col 2xl:flex-row w-full'>
          <div className='w-[350px] h-auto z-10 hidden 2xl:block' >
            <SideBar currentPage="profile" />
          </div>
          <div className='w-full md:w-full h-[200px] bg-gradient-to-br from-secondaryAc-light to-secondaryAc-dark flex items-center m-[0px] 2xl:hidden' >
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

<div className='flex flex-col w-full h-auto mt-12 '>
  <div className='w-full bg-gradient-to-r from-blue-500 to-purple-500 pb-1'> <div className='h-full w-full bg-white flex justify-between px-12' ><h1 onClick={() => {setView(true)}}>My posts</h1><h1 onClick={() => {setView(false)}}>Liked posts</h1> </div></div>
            
            <div className={`w-full overflow-x-hidden`}>
              <div className={`w-[200%] flex duration-300 transition-transform ${view ? '' : '-translate-x-[50%]'} `}>
                <div className="grid mt-[50px] mb-[150px] mx-auto gap-[20px] 2xl:grid-cols-2 grid-cols-1 w-full vert 2xl:ml-auto 2xl:mr-0">
                  {myData.length ? '' :  "You haven't uploaded anything yet"}
                  {why()}
                </div>
                <div className="grid mt-[50px] mb-[150px] mx-auto gap-[20px] 2xl:grid-cols-2 grid-cols-1 w-full vert 2xl:ml-auto 2xl:mr-0">
                  {myData.length ? '' :  "You haven't uploaded anything yet"}
                  {likedData()}
                </div>
              </div>
            </div>
</div>


        </div>

        {window.innerWidth < 1320 ? <Navbar /> : ''}
      </div>
    </>
  )
}
