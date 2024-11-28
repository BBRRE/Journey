import { useState, useRef } from 'react'
import { SideBar } from '../../Components/SideBar'
import Gallery from '../../Components/Gallery';
import ClipLoader from "react-spinners/ClipLoader";
import { act } from 'react';

const AddJourneyV2 = () => {
  const [overviewImage, setOverviewImage] = useState()
  const [activites, setActivites] = useState(0);
  const [activitesImages, setActivitesImages] = useState();
  let activityData = []


  const getfile = (event) => {
    setOverviewImage(URL.createObjectURL(event.target.files[0]))
  }

  const getfileAct = (event, number) => {
    let activity = []
    for (let i = 0; i < event.target.files.length; i++) {
      console.log(URL.createObjectURL(event.target.files[i]))
      activity.push(URL.createObjectURL(event.target.files[i]))
    }
    activity = { ...activity, activityNum: number };
    setActivitesImages([...activitesImages, activity]);
    console.log(activitesImages)
  }

  const activityForm = () => {
    for (let i = 0; i < activites; i++) {
      activityData.push(
        <div className='flex flex-col gap-2 w-full'>
          {i > 0 && (
            <div className='flex flex-col'>
              <div className="flex gap-[10px] flex-col sm:flex-row mb-[10px]">
                <select
                  id={`transportType${i + 1}`}
                  className="rounded-md h-[2rem] pl-[5px] w-full"
                  required
                >
                  <option value="">Select Transport</option>
                  <option value="car">Car</option>
                  <option value="bus">Bus</option>
                  <option value="train">Train</option>
                  <option value="plane">Plane</option>
                  <option value="boat">Boat</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="number"
                  id={`transportCost${i + 1}`}
                  placeholder="Cost of transport"
                  className="rounded-md h-[2rem] pl-[5px] w-full"
                  step={0.01}
                  required
                />
              </div>
              <textarea
                maxLength={250}
                type="text"
                placeholder="If you paid once for a day/month pass or a rented car include the price only once "
                className="rounded-md h-[4rem] pl-[5px] resize-none w-full"
              />


            </div>
          )}

          <div className='w-full h-auto  flex flex-col gap-2 '>
            <div className=' relative w-full h-auto min-h-[400px] border-black border-dashed border-4'>
              <input
                type="file"
                className="z-10 absolute top-0 left-0 w-full h-full p-4"
                onChange={(e) => { getfileAct(e, i) }}
                accept="image/*"
                multiple
              />
              <Gallery  />
            </div>
            <input
              required
              maxLength={30}
              type="text"
              placeholder="Hotel, Restaurant, Resort Name... "
              className="rounded-md h-[2rem] pl-[5px]"
            />
            <textarea
              required
              maxLength={250}
              type="text"
              placeholder="How long was your stay, important info..."
              className="rounded-md h-[4rem] pl-[5px] resize-none"
            />
            <div className='flex gap-2 '>

              <input
                type="text"
                placeholder="Starting Location: Country, City"
                maxLength={100}
                className="rounded-md h-[2rem] pl-[5px] w-full "
                required
              />
              <input
                required
                maxLength={30}
                type="number"
                placeholder="price of activity"
                className="rounded-md h-[2rem] pl-[5px] w-full "
                step={0.01}
              />
            </div>
          </div>
        </div>
      )
    }
    return activityData
  }



  return (
    <>
      <div className="2xl:flex">
        <SideBar currentPage="add" />
        <form className='w-full h-auto mx-auto' >
          <div className="flex flex-col mb-[100px] mt-12 mx-auto max-w-[500px] justify-center items-center gap-24">
            <div className='flex flex-col gap-4 w-full justify-center items-center'>
              <div
                className="relative w-full max-w-[500px] h-[200px] z-10 cursor-pointer mx-auto"
              >
                <svg width="0" height="0" viewBox="0 0 100 100" className="absolute">
                  <defs>
                    <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
                      <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
                    </clipPath>
                  </defs>
                </svg>
                <input
                  type="file"
                  className="z-10 absolute top-0 left-0 w-full h-full p-4"
                  onChange={getfile}
                  accept="image/*"
                />
                <img
                  src={overviewImage}
                  className="w-full h-full object-cover rounded-t-2xl bg-gray-600"
                  style={{
                    clipPath: 'url(#curvedMask)',
                    WebkitClipPath: 'url(#curvedMask)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)'
                  }}
                />

              </div>
              <div className='flex flex-col gap-4 w-full max-w-[500px]'>

                <input type="text"
                  placeholder="Nickname for the journey"
                  maxLength={30}
                  id="journeyName"
                  required
                  className="rounded-md h-[2rem] pl-[5px]" />
                <textarea
                  type="text"
                  id="descriptionItput"
                  maxLength={215}
                  className="rounded-md h-[4rem] pl-[5px] resize-none"
                  required
                  placeholder="What was good about this..."
                />
                <div className='flex gap-4'>
                  <input
                    type="text"
                    placeholder="Starting Location: Country, City"
                    maxLength={100}
                    className="rounded-md h-[2rem] pl-[5px] "
                    required
                  />
                  <label htmlFor="OverviewLocation" className="flex gap-2 width-[30%] mx-auto items-center">
                    <span className="text-lg"> Continent </span>
                    <select className="h-[34px] px-3 rounded-md text-center" name="cars" id="cars">
                      <option value="Africa">Africa</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="NAmerica">N.America</option>
                      <option value="SAmerica">S.America</option>
                      <option value="Oceania">Oceania</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-20 w-full max-w-[500px]'>
              {activityForm()}
            </div>
            <div className='flex w-full '>
              <div className='w-full border-4 border-black flex items-center justify-center' type='button' onClick={() => { setActivites(activites + 1) }} >Add activity</div>
              <div className='w-full border-4 border-black flex items-center justify-center' >Submit</div>
            </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default AddJourneyV2