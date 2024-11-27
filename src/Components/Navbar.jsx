import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetUserName, CheckIfUserExsits } from '../Config/firestore';
import { UserAuth } from '../Context/AuthContext';

const Navbar = () => {
  const { user } = UserAuth();
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      if(user){
      try {
        const username = await GetUserName(user.email, 'email');
        setUserName(username.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }}else{
      }
    };

    fetchUserName();
  }, [user?.email]);

  return (
    <>
      <div className='w-full h-[7vh] md:h-[5.5vh] bg-white min-h-[50px] pt-[2px] bg fixed inset-x-0 bottom-0 flex flex-row content-center z-50 border-t-2 border-t-blue-gray-300 border-opacity-85 rounded-t-3xl'>
        <div className='w-1/2 h-1/2 m-auto bg-transparent z-50'>
          <Link to="/"><img className='bg-transparent w-4/5 h-4/5 z-50 m-auto' src="/assets/Compass.svg "/></Link>
        </div>
        <div className='w-1/2 h-1/2 m-auto bg-transparent z-50'>
          <Link to="/AddJourney"><img className='w-4/5 h-4/5 bg-transparent z-50 m-auto' src="/assets/Plus.svg"/></Link>
        </div>
        <div className='w-1/2 h-1/2 m-auto bg-transparent z-50 text-center'>
          {userName === null ? <Link to={'/login'} className='text-center'> Sign In </Link> :  <Link to={`/${userName}`}><img className='h-[100%] bg-teirtiaryAc z-50 m-auto rounded-full' src={user?.photoURL} /></Link> }
        </div>
      </div>
    </>
  );
};

export default Navbar;
