// ActivityPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getJourney, GetUserName } from '../../Config/firestore';
import { UserAuth } from '../../Context/AuthContext';
import Navbar from '../Navbar'
import { SideBar } from '../SideBar';
import ActivitySceleton from './ActivitySceleton';
import walkIcon from '../../../public/assets/walk-svgrepo-com.svg';
import busIcon from '../../../public/assets/bus-svgrepo-com.svg';
import trainIcon from '../../../public/assets/train-svgrepo-com.svg';
import carIcon from '../../../public/assets/car-svgrepo-com.svg';
import taxiIcon from '../../../public/assets/taxi-4-svgrepo-com.svg';
import planeIcon from '../../../public/assets/plane-svgrepo-com.svg';
import boatIcon from '../../../public/assets/boat-svgrepo-com.svg';
import questionMarkIcon from '../../../public/assets/question-svgrepo-com.svg';
import getImageSize from 'image-size-from-url';
import '../../index.css'

function ActivityPage() {
  const { userName, documentRef } = useParams();
  const [activityData, setActivityData] = useState(null);
  const { user } = UserAuth()
  const [userData, setuserData] = useState([])
  const navigate = useNavigate();
  const [processedActivities, setProcessedActivities] = useState([]);
  const [loading, setLoading] = useState(true)


  const renderTransportationIcon = (mode) => {
    const transportationIcons = {
      walk: walkIcon,
      bus: busIcon,
      train: trainIcon,
      car: carIcon,
      taxi: carIcon,
      plane: planeIcon,
      boat: boatIcon,
      other: questionMarkIcon,
    };
  
    const icon = transportationIcons[mode.toLowerCase()] || transportationIcons.other;
  
    return <img className='w-[50px]' src={icon} alt={mode} />;
  };

  const getMeta = async (urls) => {
    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
      });
    };

    const imagePromises = urls.map(loadImage);
    const loadedImages = await Promise.all(imagePromises);

    return loadedImages.map(img => {
      const ratio = img.naturalWidth / img.naturalHeight;
      return {
        url: img.src,
        orientation: ratio > 1 ? 'hori' : 'vert',
        ratio: ratio > 1 ? ratio : 1 / ratio,
        w: img.naturalWidth,
        h: img.naturalHeight
      };
    }).sort((a, b) => b.ratio - a.ratio);
  };

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const res = await GetUserName(userName, 'username');
        setuserData(res);

        const activitySnapshot = await getJourney(`/journeyData/${documentRef}/acivity`, null, true);
        setLoading(false)
        setActivityData(activitySnapshot);

        // Process images for each activity
        const processed = await Promise.all(activitySnapshot.map(async (activity) => {
          const processedImages = await getMeta(activity.imageURL);
          return { ...activity, processedImages };
        }));
        console.log(processed.sort((a, b) => a.activityNumber - b.activityNumber))
        setProcessedActivities(processed.sort((a, b) => a.activityNumber - b.activityNumber));
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };

    fetchActivityData();
  }, [userName, documentRef]);


  const renderNestedImages = (images, startIndex = 0) => {
    if (startIndex >= images.length) return null;

    const image = images[startIndex];
    const isVertical = image.orientation === 'vert';
    const isLastImage = startIndex === images.length - 1;

    return (
      <div
        key={startIndex}
        className={`
          flex gap-[5px]
          ${isVertical ? 'flex-row' : 'flex-col'}
          w-full h-full
        `}
      >
        <div className={` w-full h-auto
          ${isLastImage ? 'w-full h-full' : ''}
          overflow-hidden
        `}>
          <img
            src={image.url}
            alt={`Image ${startIndex + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
        {!isLastImage && (
          <div className={`
            w-full h-auto
          `}>
            {renderNestedImages(images, startIndex + 1)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='w-full flex relative'>
      <SideBar />
      <div className='flex mx-auto flex-col gap-[20px]'>
        <div onClick={() => { navigate(`/${userName}`) }} className='flex mx-auto mt-[50px] cursor-pointer'>
          <img className='w-[120px] h-[120px] rounded-2xl shadow-xl' src={userData?.photoURL} />
          <div className='flex flex-col pl-2 w-[250px]'>
            <span className='font-semibold text-lg' >@{userName}</span>
            <div className="flex itens-center ">
              <img className="h-[15px] w-[15px]" src='/assets/location-pin-alt-svgrepo-com.svg' alt="" />
              <span className="text-sm font-light text-gray-700">{userData.loaction}</span>
            </div>
            <span className='text-md'>{userData.bio}</span>
          </div>
        </div>


        <div className='bg-[#F5F4F4] w-full p-[20px] mb-11 rounded-md max-w-[800px] flex flex-col mx-auto shadow-md'>
          <div className='ml-auto text-2xl mb-4 w-[100px] ' >Day 1</div>
          {loading ? <ActivitySceleton /> : (processedActivities.map((activity, index) => (
            <div key={index} className='flex flex-col w-full gap-[10px]'>
              {index > 0 && activity.transportType && (
                (
                  <div className={`flex flex-col-reverse items-center px-2 -mb-2 ${activity.dayNumber === processedActivities[index - 1].dayNumber || activity.dayNumber === 1 ? 'border-l-2 border-dashed border-gray-600 py-14' : 'pt-14'} `} >
                    <div className='flex flex-col text-md mr-auto'>
                      <div className='text-2xl flex gap-4'>
                        <div className='text-2xl'>
                          {renderTransportationIcon(activity.transportType)}
                        </div>
                        <div className='text-2xl flex items-center'>
                        £{activity.transportCost.toFixed(2)}
                      </div>
                      </div>
                      <div className='text-md'>
                        {activity.transportDescription}
                      </div>
                      
                    </div>
                    <div className={` text-2xl ml-auto mb-4  ${activity.dayNumber === processedActivities[index - 1].dayNumber || activity.dayNumber === 1 ? 'hidden' : ''} `}> Day {activity.dayNumber}</div>
                  </div>)
              )}
              <div className='w-full '> {/* Container for images */}
                {renderNestedImages(activity.processedImages)}
              </div>
              <div className='gap-[2px] flex flex-col'>
                <div className="font-medium text-2xl">{activity.activityName}</div>
                <div className="flex itens-center">
                  <img className="h-[15px] w-[15px]" src='/assets/location-pin-alt-svgrepo-com.svg' alt="" />
                  <span className="text-sm font-light text-gray-700">{activity.location}</span>
                </div>
                <span className="text-md overflow-clip text-ellipsis">{activity.description}</span>
                <span className="text-lg font-medium">£{activity.price.toFixed(2)}</span>
              </div>
            </div>
          )))}
          {!loading && activityData.length === 0 ? (<p className='mx-auto' >No Activity Data :(</p>) : ''}
        </div>
        {window.innerWidth < 1320 ? <Navbar /> : ''}
      </div>
    </div>
  )
}

export default ActivityPage
