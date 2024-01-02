import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "../../Config/storage";
import { addJourneyData, addActivityData } from "../../Config/firestore";
import { getAuth } from "firebase/auth";
import uuid from "react-uuid";
import "../AddJourney/AddJourney.css";

export default function AddJourney() {
  const [activites, setActivites] = useState(0);
  let formData = [];
  const user = getAuth();
  const navigate = useNavigate();

  //Function that adds an activity form
  let temp = [];
  const addActivityForm = () => {
    for (let i = 0; i < activites; i++) {
      temp.push(
        <div className="activites" id={`activity${i + 1}`}>
          <h1>Activity{i + 1}</h1>
          <label className="fileLabel" htmlFor={`photoInput${i + 1}`}>
            Upload Photos
            <input
              type="file"
              id={`photoInput${i + 1}`}
              multiple
              accept="image/*"
              className="file"
            />
          </label>
          <label htmlFor={`ActivityName${i + 1}`}>
            <span className="ran"> Activity Name</span>
            <input
              required
              maxLength={30}
              type="text"
              placeholder="Hotel, Restaurant, Resort Name... "
              id={`ActivityName${i + 1}`}
            />
          </label>
          <label htmlFor={`Description${i + 1}`}>
            <span className="ran"> Description</span>
            <input
              required
              maxLength={250}
              id={`Description${i + 1}`}
              type="text"
              placeholder="How long was your stay, important info..."
            />
          </label>
          <label htmlFor={`price${i + 1}`}>
            <span className="ran"> Price </span>
            <input
              required
              maxLength={30}
              type="number"
              id={`price${i + 1}`}
              placeholder="price of activity"
              step={0.01}
            />
          </label>
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
      Photos: e.target[0].files,
      Location: e.target[1].value,
      Name: e.target[2].value,
      description: e.target[3].value,
      price: Number(e.target[4].value),
    });

    if (e.target.length < 8) {
      return;
    } else {
      for (let i = 5; i < e.target.length - 3; i += 4) {
        formData.push({
          ActivityNumber: i - 4,
          Photos: e.target[i].files,
          Name: e.target[i + 1].value,
          description: e.target[i + 2].value,
          Price: Number(e.target[i + 3].value),
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
      formData[0].description,
      formData[0].price,
      uuid,
      user.currentUser.displayName,
      user.currentUser.photoURL
    );
    //uploads overvire images
    uploadImages(formData[0].Photos, user.currentUser.uid, uuid, "overview");

    for (let i = 1; i < activites + 1; i++) {
      addActivityData(
        formData[i].Name,
        formData[i].description,
        formData[i].Price,
        `/JourneyImages/${user.currentUser.uid}/${uuid}/Activity ${formData[i].ActivityNumber}`,
        dataRef,
        formData[i].ActivityNumber
      );
      //uploads activity images to firestore
      uploadImages(
        formData[i].Photos,
        user.currentUser.uid,
        uuid,
        `Activity ${formData[i].ActivityNumber}`
      );
    }

    console.log("complete");
  };

  return (
    <>
      <button
        className="button"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
      <div className="bigDiv">
        <h1 className="journeyAdd">Add Journey</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            handleSubmit(uuid(), e).then(navigate("/"));
          }}
        >
          <label className="fileLabel" htmlFor="overviewFileInput">
            {" "}
            Upload Photos
            <input
              type="file"
              className="file"
              accept="image/*"
              multiple
              id="overviewFileInput"
            />
          </label>
          <label htmlFor="OverviewLocation">
            <span className="ran"> Location </span>
            <input
              type="text"
              placeholder="Country, City"
              maxLength={100}
              className="locationInput"
              required
            />
          </label>
          <label htmlFor="journeyName">
            <span className="ran"> Journey Name </span>
            <input
              type="text"
              placeholder="Nickname for the journey"
              maxLength={30}
              id="journeyName"
              required
              className="nameInput"
            />
          </label>
          <label htmlFor="descriptionItputOverview">
            <span className="ran"> Description </span>
            <textarea
              type="text"
              id="descriptionItput"
              maxLength={250}
              className="descriptionInputOverview"
              required
              placeholder="What was good about this..."
            />
          </label>
          <label htmlFor="priceInputOverview">
            <span className="ran"> Price </span>
            <input
              type="number"
              min={0}
              placeholder="Price"
              maxLength={30}
              step={0.01}
              className="priceInput"
              required
            />
          </label>
          {addActivityForm()}
          <div className="addOrSubmit">
            <button
              type="button"
              className="activityButton button"
              onClick={AddActivies}
            >
              Add Activity
            </button>

            {activites ? (
              <button
                type="button"
                className="button removeActivity"
                onClick={removeActivity}
              >
                Remove Activity
              </button>
            ) : null}

            <button type="submit" className="submitButton button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
