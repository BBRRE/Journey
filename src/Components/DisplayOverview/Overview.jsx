import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./overview.css";
import { useState } from "react";
import { useEffect } from "react";
import { getJourney } from "../../Config/firestore";
import Popup from "../Popup";

export default function Overview(props) {

  const [activityInfo, setActivityInfo] = useState([]);
  const [triger, setTriger] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setActivityInfo(await getJourney(`journeyData/${props.obj.id}/acivity`))
    }
    getData()
  },[])


  const displayData = () => {
    console.log(activityInfo  )
    if (activityInfo.length !== 0){
      setTriger(true)
    }else{

    }
      }

      const getActivityImages = (ac) => {
        return ac.map((element) =>
          element.imageURL.map((a) => (
            <div key={crypto.randomUUID()}>
              <img className="plz" src={a} alt="Activity Image" />
            </div>
          ))
        );
      };

  return (<>
    <Popup trigger={triger}obj={activityInfo} setd={setTriger}>

    </Popup>
    <div className="container" >
      <div className="image-cont">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          width={200}
          useKeyboardArrows={false}
          centerMode={false}
          autoFocus={false}
        >
          { props.obj.imageURL.map(a=> {
            return(
              <div key={crypto.randomUUID()}>
                <img className="plz" src={a} />
              </div>
            )
          })}
          { 
            getActivityImages(activityInfo)
          }
        </Carousel>
      </div>
      <div className="words-cont" onClick={displayData}> 
        <span className="otitle">{props.obj.name}</span>
        <span className="location">{props.obj.location}</span>
        <div className="description" >{props.obj.description}</div>
        <div className="person-info">
          <img className="image" src={props.obj.photoURL} />
          <span className="username">{props.obj.userName}</span>
          <span className="price">£{props.obj.price}</span>
        </div>
      </div>
    </div>
    </>
  );
}
