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
  const [userDataloading, setUserDataLoading] = useState(true)
  const [likedDataloading, setLikedDataLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      GetUserName(userName, 'username').then(res => {
        setUserData(res)
        console.log(res)
      })
      getUserJourney(userName).then(res => {
        setMyData(res)
        setUserDataLoading(false)
        console.log(res)
      })
      getLikedPosts(user.email).then(res => {
        setLikedPosts(res)
        setLikedDataLoading(false)
        console.log(res)
      })
      
    }
    getData()
  }, [userName, user])

  const why = () => {
    if (myData && user.email === userData?.email) {
      return (myData.map((x) =>
        <div className='flex flex-col align-middle h-[350px]'>
            <OverviewD
              key={crypto.randomUUID()}
              obj={x}
            >

            </OverviewD>
          </div>
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
      <div className='flex flex-col align-middle h-[350px]'>
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
  <div className={`w-full bg-gradient-to-r pb-[2px] duration-300 transition-all  ${view ? ' from-blue-gray-500 to-[#f2f2f2]' : ' to-blue-gray-500 from-[#f2f2f2]'} `}> <div className='h-full w-full bg-[#f2f2f2] flex justify-between px-12' ><h1 onClick={() => {setView(true)}}>My posts</h1><h1 onClick={() => {setView(false)}}>Liked posts</h1> </div></div>
             
            <div className={`w-full overflow-x-hidden`}>
              <div className={`w-[200%] flex duration-300 transition-transform ${view ? '' : '-translate-x-[50%]'} `}>
                <div className="grid mt-[50px] mb-[150px] mx-auto gap-[20px] 2xl:grid-cols-2 grid-cols-1 w-full vert 2xl:ml-auto 2xl:mr-0">
                  {userDataloading ?  <><div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div> <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
  <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div><div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div> </> : (myData.length ? '' :  "You haven't uploaded anything yet") }
                  {why()}
                </div>
                <div className="grid mt-[50px] mb-[150px] mx-auto gap-[20px] 2xl:grid-cols-2 place-items-start grid-cols-1 w-full vert 2xl:ml-auto 2xl:mr-0">
                {likedDataloading ?  <> <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
  <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
  <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div><div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div></> : (myData.length ? '' :  "You haven't uploaded anything yet") }
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
