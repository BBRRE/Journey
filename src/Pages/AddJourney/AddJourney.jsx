import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImages } from "../../Config/storage";
import { addJourneyData, addActivityData } from "../../Config/firestore";
import { getAuth } from "firebase/auth";
import uuid from "react-uuid";
import "../AddJourney/AddJourney.css";

export default function AddJourney() {
  // states to read form data
  //ended up using a form so i wasted my time but i cba to
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [activites, setActivites] = useState(0);
  let activitiesArr = [];
  const user = getAuth();
  const navigate = useNavigate();

  const activityFormSubmit = (e) => {
    for (let i = 5; i < e.target.length - 3; i += 4) {
      activitiesArr.push({
        ActivityID: i / 4 - 0.25,
        files: e.target[i].files,
        ActivityName: e.target[i + 1].value,
        description: e.target[i + 2].value,
        price: e.target[i + 3].value,
        uid: user.currentUser.uid,
      });
    }
    console.log(activitiesArr);
    console.log(e);
  };

  //function that handles the activity data
  const removeActivity = () => {
    setActivites(activites - 1);
    temp.pop();
    activitiesArr.pop();
  };

  const handleActivies = () => {
    setActivites(activites + 1);
  };
  let temp = [];

  const addActivity = () => {
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
              accept="image/png, image/gif, image/jpeg"
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
    console.log(temp);
    return temp;
  };

  //allows a preview of all selected files

  const handleActivitySubmit = async (arr, docRef, uuid) => {
    for (let i = 0; i < activites; i++) {
      await uploadImages(
        arr[i].files,
        user.currentUser.uid,
        uuid,
        `Activity${arr[i].ActivityID}`
      );
      addActivityData(
        arr[i].ActivityName,
        arr[i].description,
        arr[i].price,
        `/journeyImages/${user.currentUser.uid}/${uuid}/Activity${arr[i].ActivityID}`,
        docRef,
        arr[i].ActivityID
      );
    }
    console.log("suck");
  };

  const handleSubmit = async (e, uuid) => {
    uploadImages(images, user.currentUser.uid, uuid, "overview");
    const dataRef = await addJourneyData(
      user.currentUser.uid,
      location,
      name,
      description,
      price,
      uuid
    );
    console.log(uuid);

    handleActivitySubmit(activitiesArr, dataRef, uuid);

    navigate("/");
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
        <div id="formContainer">
          <h1 className="journeyAdd">Add A new Journey</h1>
          <form
            className="activites"
            onSubmit={(e) => {
              e.preventDefault();
              activityFormSubmit(e);
              handleSubmit(e, uuid());
            }}
          >
            <label className="fileLabel" htmlFor="overviewFileInput">
              {" "}
              Upload Photos
              <input
                type="file"
                className="file"
                accept="image/png, image/gif, image/jpeg"
                multiple
                id="overviewFileInput"
                onChange={(e) => {
                  setImages(e.target.files);
                  console.log(e);
                }}
              />
            </label>
            <label htmlFor="OverviewLocation">
              <span className="ran"> Location </span>
              <input
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                type="text"
                placeholder="Country, City"
                maxLength={100}
                className="locationInput"
                required
                value={location}
              />
            </label>
            <label htmlFor="journeyName">
              <span className="ran"> Journey Name </span>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Nickname for the journey"
                maxLength={30}
                id="journeyName"
                required
                className="nameInput"
                value={name}
              />
            </label>
            <label htmlFor="descriptionItputOverview">
              <span className="ran"> Description </span>
              <input
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                id="descriptionItput"
                maxLength={250}
                className="descriptionInputOverview"
                required
                placeholder="What was good about this..."
                value={description}
              />
            </label>
            <label htmlFor="priceInputOverview">
              <span className="ran"> Price </span>
              <input
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                }}
                type="number"
                min={0}
                placeholder="Price"
                maxLength={30}
                step={0.01}
                className="priceInput"
                required
                value={price}
              />
            </label>
            {addActivity()}
            <div className="addOrSubmit">
              <button
                type="button"
                className="activityButton button"
                onClick={(e) => {
                  handleActivies();
                }}
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
      </div>
    </>
  );
}
