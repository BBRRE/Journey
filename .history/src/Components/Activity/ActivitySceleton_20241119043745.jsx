import React from 'react'

const ActivitySceleton = () => {
  return (
    <div>
         <div className='flex flex-col gap-[20px]'>
      <div className='flex w-[90%] mx-auto mt-[50px]'>
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
          <div key={index} className='flex flex-col w-full gap-[10px] mb-10'>
            <div className='w-full '> {/* Container for images */}
            </div>
            <div className='gap-[2px] flex flex-col'>
              <div className="font-medium text-2xl">{activity.activityName}</div>
              <div className="flex itens-center">
                <img className="h-[15px] w-[15px]" src='/assets/location-pin-alt-svgrepo-com.svg' alt="" />
                <span className="text-sm font-light text-gray-700">{activity.location}</span>
              </div>
              <span className="text-md overflow-clip text-ellipsis">{activity.description}...</span>
              <span className="text-lg font-medium">£{activity.price}</span>
            </div>
          </div>
      </div>
    </div>
    </div>
  )
}

export default ActivitySceleton