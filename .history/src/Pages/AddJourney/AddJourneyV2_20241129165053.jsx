import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import Navbar from '../../Components/Navbar';
import { SideBar } from '../../Components/SideBar'
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getAuth } from "firebase/auth";
import { uploadImages } from "../../Config/storage";
import { addJourneyData, addActivityData } from "../../Config/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Gallery from '../../Components/Gallery'

const AddJourneyV2 = () => {
  const [overviewImage, setOverviewImage] = useState(null)
  const [activitiesImages, setActivitiesImages] = useState([]);
  const user = getAuth();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    defaultValues: {
      journeyName: '',
      description: '',
      startingLocation: '',
      continent: 'Europe',
      overviewImage: null,
      activities: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "activities"
  })

  const handleOverviewImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setOverviewImage(URL.createObjectURL(file))
    }
  }

  const handleActivityImageUpload = (event, index) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));


    const updatedImages = [...activitiesImages];
    updatedImages[index] = imageUrls;
    setActivitiesImages(updatedImages);
  };

  const handleRemoveActivity = () => {
    if (fields.length > 0) {
      remove(fields.length - 1); 
      setActivitiesImages(prevImages => prevImages.slice(0, prevImages.length - 1)); 
    }
  };



  const onSubmit = async (data) => {
    console.log(data)
    const suuid = uuid();
    let totalPrice = 0;
    let numberOfActivities = 0;


    data.activities.forEach((activity) => {
      totalPrice += activity.price || 0;
      totalPrice += activity.transportCost || 0;
      numberOfActivities += 1;
    });


    data.totalPrice = totalPrice;
    data.numberOfActivities = numberOfActivities;

    try {
      const dataRef = await addJourneyData(
        user.currentUser.uid,
        data.startingLocation,
        data.journeyName,
        data.description,
        suuid,
        user.currentUser.email,
        user.currentUser.photoURL,
        data.continent,
        numberOfActivities,
        totalPrice
      );

      await uploadImages(data.overviewImage, user.currentUser.uid, suuid, `overview`);

      for (let i = 0; i < data.activities.length; i++) {
        await addActivityData(
          data.activities[i].locationName,
          data.activities[i].description,
          data.activities[i].price,
          data.activities[i].location,
          `/JourneyImages/${user.currentUser.uid}/${suuid}/Activity ${i}`,
          dataRef,
          i,
          i > 0 && data.activities[i].transportCost,
          i > 0 && data.activities[i].transportType,
          i > 0 && data.activities[i].transportDescription,
          i > 0 && data.activities[i].dayNumber
        );

        await uploadImages(
          data.activities[i].images,
          user.currentUser.uid,
          suuid,
          `Activity ${i}`
        );
      }


      navigate(`/`);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };


  return (
    <>
      <div className="2xl:flex">
        <div className='w-[450px] h-auto z-10 hidden 2xl:block ' >
          <div className='fixed'>
            <SideBar currentPage="add" />
          </div>
        </div>
        <div className={`fixed inset-0 flex items-center  z-10 justify-center ${isSubmitting ? '' : 'hidden'} `}>
          <ClipLoader
            loading={isSubmitting}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="black  "
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full h-auto mx-auto px-4 mb-[100px]'>
          <div className="flex flex-col mb-[100px] mt-12 mx-auto max-w-[500px] justify-center items-center gap-4">
            {/* Overview Image Upload */}
            <div className='max-w-[500px] w-full mb-[-50px]'>
              <div className='relative flex justify-center align items-center w-full max-w-[500px] h-[200px] z-10 cursor-pointer mx-auto mb-[-30px] '>
                <p className={`absolute z-10 ${overviewImage ? 'hidden' : ''} `}>Uplaod an image</p>
                <svg width="0" height="0" viewBox="0 0 100 100" className="">
                  <defs>
                    <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
                      <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
                    </clipPath>
                  </defs>
                </svg>

                <input
                  type="file"
                  required
                  className={`z-10 absolute top-0 left-0 w-full h-full p-4 opacity-0 cursor-pointer  bg-gray-400`}
                  accept="image/*"
                  title='Upload an image'
                  {...register('overviewImage')}
                  onChange={handleOverviewImageUpload}
                />
                <img
                  src={overviewImage}
                  className={`w-full h-full object-cover rounded-t-2xl bg-gray-400 ${overviewImage ? '' : 'p-[1px]'}  `}
                  style={{
                    clipPath: 'url(#curvedMask)',
                    WebkitClipPath: 'url(#curvedMask)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)'
                  }}
                />
              </div>

              {/* Journey Details */}
              <div className='flex flex-col gap-4 w-full max-w-[500px]'>
                <label className='flex flex-col'>
                  <span>Journey Name</span>
                  <input
                    {...register('journeyName', {
                      required: 'Journey name is required',
                      maxLength: {
                        value: 30,
                        message: 'Journey name must be 30 characters or less'
                      }
                    })}
                    placeholder="Nickname for the journey"
                    className="rounded-md h-[2rem] pl-[5px]"
                  />
                </label>
                {errors.journeyName && <span className="text-red-500">{errors.journeyName.message}</span>}
                <label className='flex flex-col'>
                  <span>Journey description</span>
                  <textarea
                    {...register('description', {
                      required: 'Description is required',
                      maxLength: {
                        value: 215,
                        message: 'Description must be 215 characters or less'
                      }
                    })}
                    placeholder="What was good about this..."
                    className="rounded-md h-[4rem] pl-[5px] resize-none"
                  /> </label>
                {errors.description && <span className="text-red-500">{errors.description.message}</span>}

                <div className='flex gap-4'>
                  <label className='flex flex-col w-full'>
                    <span>Starting Location</span>
                    <input
                      {...register('startingLocation', {
                        required: 'Starting location is required',
                        maxLength: {
                          value: 100,
                          message: 'Location must be 100 characters or less'
                        }
                      })}
                      placeholder="Starting Location: Country, City"
                      className="rounded-md h-[2rem] pl-[5px] w-full"
                    /></label>

                  <label className='flex flex-col'>
                    <span> Continent</span>
                    <select
                      {...register('continent')}
                      className="h-[34px] px-3 rounded-md text-center"
                    >
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
            {/* Activities */}
            <div className='flex flex-col gap-20 mt-20 mb-8 w-full max-w-[500px] '>
              {fields.map((field, index) => (
                <div key={field.id} className='flex flex-col gap-2 w-full'>
                  {index > 0 && (
                    <div className='flex flex-col'>
                      <div className='flex gap-2 mb-8 items-center' > <p>Day</p><input
                        type="number"
                        required
                        {...register(`activities.${index}.dayNumber`, {
                          valueAsNumber: true
                        })}
                        className="rounded-md h-[2rem] pl-[5px] w-[100px] text-center "
                        step={1}
                      />  </div>
                      <div className="flex gap-[10px] flex-col sm:flex-row mb-[10px]">
                        <label>
                          <span>Transport Type</span>
                          <select required
                            {...register(`activities.${index}.transportType`)}
                            className="rounded-md h-[2rem] pl-[5px] w-full"
                          >
                            <option value="">Select Transport</option>
                            <option value="Walk">walk</option>
                            <option value="Bus">Bus</option>
                            <option value="Train">Train</option>
                            <option value="Car">Car</option>
                            <option value="Taxi">taxi</option>
                            <option value="Plane">Plane</option>
                            <option value="Boat">Boat</option>
                            <option value="Other">Other</option>
                          </select>
                        </label>
                        <label> <span>Transport cost</span>
                          <input required
                            type="number"
                            {...register(`activities.${index}.transportCost`, {
                              valueAsNumber: true
                            })}
                            placeholder="Cost of transport"
                            className="rounded-md h-[2rem] pl-[5px] w-full"
                            step={0.01}
                          />
                        </label>
                      </div>
                      <label className='flex flex-col' >
                        <span>Transport description</span>
                        <textarea
                          {...register(`activities.${index}.transportDescription`, {
                            maxLength: {
                              value: 215,
                              message: 'Description must be 215 characters or less'
                            }
                          })}
                          placeholder="Did you buy a day pass or rented a car?"
                          className="rounded-md h-[4rem] pl-[5px] resize-none"
                        />
                      </label>
                    </div>
                  )}

                  <div className='w-full h-auto flex flex-col gap-2'>
                    <div className="relative flex justify-center items-center w-full h-auto border-black border-dashed border-2">
                      <div className={`absolute z-10 ${activitiesImages[index] ? 'hidden' : ''} `}>Uplaod an image</div>
                      <input
                        type="file"
                        multiple
                        {...register(`activities.${index}.images`)}
                        className="z-10 absolute top-0 left-0 w-full h-full p-4 opacity-0"
                        accept="image/*"
                        onChange={(e) => handleActivityImageUpload(e, index)}
                      />
                      <Gallery
                        images={activitiesImages[index] || []}
                      />
                    </div>
                    <label className='flex flex-col'>
                      <span>Activity Name</span>
                      <input required
                        {...register(`activities.${index}.locationName`, {
                          required: 'Location name is required',
                          maxLength: {
                            value: 30,
                            message: 'Location name must be 30 characters or less'
                          }
                        })}
                        placeholder="Hotel, Restaurant, Resort Name..."
                        className="rounded-md h-[2rem] pl-[5px]"
                      /></label>
                    <label className='flex flex-col'>
                      <span>Activity Description</span>
                      <textarea required
                        {...register(`activities.${index}.description`, {
                          required: 'Description is required',
                          maxLength: {
                            value: 250,
                            message: 'Description must be 250 characters or less'
                          }
                        })}
                        placeholder="How long was your stay, important info..."
                        className="rounded-md h-[4rem] pl-[5px] resize-none"
                      /></label>

                    <div className='flex gap-2'>
                      <label className='flex flex-col w-full'>
                        <span>Activity Location</span>
                        <input required
                          {...register(`activities.${index}.location`, {
                            required: 'Activity location is required',
                            maxLength: {
                              value: 100,
                              message: 'Location must be 100 characters or less'
                            }
                          })}
                          placeholder="Starting Location: Country, City"
                          className="rounded-md h-[2rem] pl-[5px] w-full"
                        />
                      </label>
                      <label className='flex flex-col'>
                        <span>Activity Price</span>
                        <input required
                          type="number"
                          {...register(`activities.${index}.price`, {
                            required: 'Price is required',
                            valueAsNumber: true
                          })}
                          placeholder="Price of activity"
                          className="rounded-md h-[2rem] pl-[5px] w-full"
                          step={0.01}
                        /> </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Buttons */}
            <div className='flex w-full gap-2 mt-[-20px]'>
              <button
                type="button"
                onClick={() => append({})}
                className='w-full border-2 border-gray-600 rounded-md flex items-center justify-center font-semibold min-h-[2rem]'
              >
                Add Activity
              </button>
              <button
                type="button"
                onClick={() => handleRemoveActivity()}
                className='w-full border-2 border-gray-600 rounded-md flex items-center justify-center font-semibold min-h-[2rem]'
              >
                Remove Activity
              </button>
              <button
                type="submit"
                className='w-full bg-blue-gray-600 rounded-md flex items-center justify-center font-semibold min-h-[2rem]'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      {window.innerWidth < 1320 ? <Navbar /> : ''}
    </>
  )
}

export default AddJourneyV2