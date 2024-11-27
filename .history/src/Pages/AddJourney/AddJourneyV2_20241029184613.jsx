import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "../../Config/storage";
import { addJourneyData, addActivityData } from "../../Config/firestore";
import { onAuthStateChanged } from "firebase/auth";
import uuid from "react-uuid";
import Navbar from "../../Components/Navbar";
import { CheckIfUserExsits } from "../../Config/firestore";
import { getAuth } from "firebase/auth";
import ClipLoader from "react-spinners/ClipLoader";
import { SideBar } from "../../Components/SideBar";
import '../../index.css'

export default function AddJourney() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update window width state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      console.log(window.outerWidth)
    };

    // Listen to window resize event
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const [activites, setActivites] = useState(0);
  const [loading, setLoading] = useState(false);

  let formData = [];
  const user = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(user, async (user) => {
      if (user) {
        console.log(await CheckIfUserExsits(user.email))
        if (await CheckIfUserExsits(user.email)) {
          navigate('/login')
        }
      }
    });

    return unsubscribe; // This will let it clean up when the ArtistScreen unmounts
  }, []);



  //Function that adds an activity form
  let temp = [];
  const addActivityForm = () => {
    for (let i = 0; i < activites; i++) {
      temp.push(
        <div className="bg-secondaryAc-light rounded-lg px-[20px] pb-[20px] pt-[10px] flex flex-col gap-[1px]" id={`activity${i + 1}`}>
          <div className="flex gap-[10px] items-center flex-col sm:flex-row">
            <label className=" mt-[16px] hover:cursor-pointer flex flex-col justify-center items-center  w-[150px] h-[150px] bg-primaryBg-light bg-opacity-[0.5] border-dashed border-2 border-teirtiaryAc" htmlFor={`photoInput${i + 1}`}>
              Upload Photos
              <input
                type="file"
                id={`photoInput${i + 1}`}
                multiple
                accept="image/*"
                className="file"
              />
            </label>
            <div className="flex flex-col gap-[5px] justify-between flex-grow w-full sm:w-auto">
              <label htmlFor={`ActivityName${i + 1}`} className="flex flex-col">
                <span className="text-lg"> Activity Name</span>
                <input
                  required
                  maxLength={30}
                  type="text"
                  placeholder="Hotel, Restaurant, Resort Name... "
                  id={`ActivityName${i + 1}`}
                  className="rounded-md h-[2rem] pl-[5px]"
                />
              </label>
              <label htmlFor={`Description${i + 1}`} className="flex flex-col">
                <span className="text-lg"> Description</span>
                <textarea
                  required
                  maxLength={250}
                  id={`Description${i + 1}`}
                  type="text"
                  placeholder="How long was your stay, important info..."
                  className="rounded-md h-[4rem] pl-[5px] resize-none"
                />
              </label>
            </div>
          </div>
          <div className="flex gap-[10px]  flex-col sm:flex-row">
            <label htmlFor="OverviewLocation" className="flex flex-col gap-[2px] flex-grow">
              <span className="text-lg"> Location </span>
              <input
                type="text"
                placeholder="Starting Location: Country, City"
                maxLength={100}
                className="rounded-md h-[2rem] pl-[5px] "
                required
              />
            </label>
            <label htmlFor={`price${i + 1}`} className="flex flex-col gap-[2px]">
              <span className="text-lg"> Price </span>
              <input
                required
                maxLength={30}
                type="number"
                id={`price${i + 1}`}
                placeholder="price of activity"
                className="rounded-md h-[2rem] pl-[5px] "
                step={0.01}
              />
            </label>
          </div>
        </div>
      );
    }
    return temp;
  };

  //function that handles removing an activity
  const removeActivity = () => {
    setActivites(activites - 1);
    temp.pop();
    formData.pop();
  };

  //function that handles adding an activity
  const AddActivies = () => {
    setActivites(activites + 1);
  };

  //function that packages the form data into objects one for overview and x amount for activities
  const packageData = (e) => {
    formData.push({
      OverviewPhoto: e.target[0].files,
      Name: e.target[1].value,
      Description: e.target[2].value,
      Location: e.target[3].value,
      Continent: e.target[4].value
    });

    if (e.target.length < 7) {
      return;
    } else {
      for (let i = 5; i < e.target.length - 3; i += 5) {
        formData.push({
          ActivityNumber: (i - 3) / 5 + 1,
          Name: e.target[i + 1].value,
          Description: e.target[i + 2].value,
          Location: e.target[i + 3].value,
          Price: Number(e.target[i + 4].value),
          Photos: e.target[i].files,
        });
      }
    }
    console.log(formData);
  };

  //function that uploads the data to firebase
  const handleSubmit = async (uuid, e) => {
    packageData(e);
    console.log(formData);
    //uploads test data to firesbase
    const dataRef = await addJourneyData(
      user.currentUser.uid,
      formData[0].Location,
      formData[0].Name,
      formData[0].Description,
      uuid,
      user.currentUser.email,
      user.currentUser.photoURL,
      formData[0].Continent,
    );
    await uploadImages(
      formData[0].OverviewPhoto,
      user.currentUser.uid,
      uuid,
      `overview`
    );

    for (let i = 1; i < activites + 1; i++) {
      await addActivityData(
        formData[i].Name,
        formData[i].Description,
        formData[i].Price,
        formData[i].Location,
        `/JourneyImages/${user.currentUser.uid}/${uuid}/Activity ${formData[i].ActivityNumber}`,
        dataRef,
        formData[i].ActivityNumber
      );
      //uploads activity images to firestore
      await uploadImages(
        formData[i].Photos,
        user.currentUser.uid,
        uuid,
        `Activity ${formData[i].ActivityNumber}`
      );
    }

    console.log("complete");
  };


  return (
    <><div className="2xl:flex ">
        
            <SideBar currentPage="add" />
        <div className="absolute left-[50%] top-[45%]">
          <ClipLoader loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader" color="grey" /></div>
        <div className="flex flex-col mb-[100px] mt-[20px] 2xl:w-">
          <form
            className="flex flex-col justify-center items-center w-[90%] max-w-[500px] mx-auto"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true); // Start loading
              await handleSubmit(uuid(), e).then(() => {
                setLoading(false); // Stop loading
                navigate('/')
              });
            }}
          >
            <h1 className="text-4xl font-fontMain self-start mb-[20px] border-b-2 border-black pr-[25px] ">Overview</h1>
            <div id="overview" className="flex flex-col bg-secondaryAc-light rounded-lg px-[20px] pb-[20px] pt-[10px] gap-[5px] w-[100%]">
              <label className=" mt-[16px] hover:cursor-pointer flex flex-col justify-center items-center mx-auto w-[100%] h-[150px] bg-primaryBg-light bg-opacity-[0.5] border-dashed border-2 border-teirtiaryAc" htmlFor={`OverviewPic`}>
                Upload Photo
                <input
                  type="file"
                  id={`OverviewPic`}
                  accept="image/*"
                  className="file"
                />
              </label>
              <label htmlFor="journeyName" className="flex flex-col gap-[2px]">
                <span className="text-lg"> Journey Name </span>
                <input
                  type="text"
                  placeholder="Nickname for the journey"
                  maxLength={30}
                  id="journeyName"
                  required
                  className="rounded-md h-[2rem] pl-[5px]"
                />
              </label>
              <label htmlFor="descriptionItputOverview" className="flex flex-col gap-[2px]">
                <span className="text-lg"> Description </span>
                <textarea
                  type="text"
                  id="descriptionItput"
                  maxLength={250}
                  className="rounded-md h-[4rem] pl-[5px] resize-none"
                  required
                  placeholder="What was good about this..."
                />
              </label>
              <div className="flex align-middle justify-between ">
                <label htmlFor="OverviewLocation" className="flex flex-col gap-[2px] w-[60%]">
                  <span className="text-lg"> Location </span>
                  <input
                    type="text"
                    placeholder="Starting Location: Country, City"
                    maxLength={100}
                    className="rounded-md h-[2rem] pl-[5px] "
                    required
                  />
                </label>
                <label htmlFor="OverviewLocation" className="flex flex-col gap-[2px] width-[30%] mb-[-5px]">
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
            <div id="activities" className="flex flex-col w-[100%] gap-[20px] mt-[20px] ">
              {activites ? <h1 className="text-4xl font-fontMain self-start mb-[0px] border-b-2 border-black pr-[25px] ">Activities</h1> : null}
              {addActivityForm()}
            </div>
            <div className="flex w-[100%] max justify-center items-center gap-[10px] h-[2rem] mt-[10px]">
              <button
                type="button"
                className=" border-2 border-secondaryAc-dark flex-grow rounded-md h-[2rem] text-blue-gray-700 font-semibold"
                onClick={AddActivies}
              >
                Add Activity
              </button>
              {activites ? (
                <button
                  type="button"
                  className="border-2 border-secondaryAc-dark flex-grow rounded-md h-[2rem] text-blue-gray-700 font-semibold"
                  onClick={removeActivity}
                >
                  Remove Activity
                </button>
              ) : null}
              <button type="submit" className="bg-secondaryAc-dark flex-grow-[2] rounded-md h-[2rem] text-white font-semibold">
                Submit
              </button>
            </div>
          </form >
        </div >
    </div>
        {window.innerWidth < 1320 ? <Navbar /> : ''}
    </>
  );
}
