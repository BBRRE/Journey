import React, { useState, useEffect } from 'react'
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { deleteData, getUserJourney } from '../../Config/firestore';
import Overview from '../../Components/DisplayOverview/Overview'
import { updateCurrentUser } from 'firebase/auth';
import Navbar from '../../Components/Navbar';
import { GetUserName } from '../../Config/firestore';

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
          <Overview
            key={crypto.randomUUID()}
            obj={x}
          >

          </Overview>
          <button className="bg-[#D67060] mx-autorounded-lg shadow-md border-r-4 border-b-4 border-solid rounded-bl-lg rounded-br-lg border-[#D67] mx-auto w-[600px]"
            onClick={() => {
              deleteData(x).then(console.log('res'))
            }}
          >Delete</button>
          </div>
        </>
      ))
    }else if(myData){
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
      <div className='flex flex-col'>

        <div className='w-[620px] md:w-full h-[20vh] bg-gradient-to-br from-secondaryAc-light to-secondaryAc-dark flex items-center m-[0px]' >
          <img src={userData.photoURL} className='h-[25bh] rounded-full ml-[3vw] ' />
          <div className='flex flex-col ml-[30px] mt-[15px] h-[150px] text-pretty'>
            <div className='font-fontMain text-[4.2vh] mb-[5px]'>
              @{userData.username}
            </div>
            <span className='text-gray-700 ml-[20px] mt-[-10px] text-sm mb-[5px]'>{userData.loaction}</span>
            <p className='font-fontSecondary text-[1.7vh] h-auto text-wrap overflow-x-clip ml-[15px] w-[300px]'>
              {userData.bio}
            </p>
          </div>
        </div>

        <div className="grid mt-[50px] mb-[50px] mx-auto gap-[20px] xl:grid-cols-2 grid-cols-1 w-full vert">
          {why()}
        </div>
      </div>
      <Navbar></Navbar>
    </>
  )
}
