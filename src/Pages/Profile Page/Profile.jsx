import React, { useState, useEffect } from 'react'
import { UserAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteData, getUserJourney } from '../../Config/firestore';
import './Profile.css'
import Overview from '../../Components/DisplayOverview/Overview'
import { updateCurrentUser } from 'firebase/auth';

export default function Profile() {
  const {user} = UserAuth();
  const navigate = useNavigate();
  const [myData, setMyData] = useState([])

  useEffect(() => {
    const getData = async () => {
      getUserJourney(await user.uid).then(res => {
        setMyData(res)
      })
    }
    getData()
  },[user])

  const why = () => {
    if(myData){
      return(myData.map((x) =>
      <>
      <Overview
            key={crypto.randomUUID()}
            obj={x}
          >
      
          </Overview>
          <button className="del button" 
          onClick={() => {
            deleteData(x)
          }}
          >Delete</button>
          </>
          ))
    }
  }


  return (
    <div className='profile-cont'>
      <button className="button bakc" onClick={() => {
        navigate('/')
      }} >Back</button>
      <div className='profile-dets' >
      <div className="user">
        <img className='prf' src={user?.photoURL}/>
        <span className="user-name">{user?.displayName}</span>
      </div>
      </div>
      <div className="explore-cont">
      {why()}
      </div>
    </div>
  )
}
