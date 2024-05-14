import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getJourney } from "../../Config/firestore";
import '../../index.css'
import { Link } from "react-router-dom";

export default function Overview(props) {
//
  const [activityInfo, setActivityInfo] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJourney(`journeyData/${props.obj.id}/acivity`);
      setActivityInfo(data);
    };

    fetchData();
  }, [props.obj.id]);

  useEffect(() => {
    const calculateSum = () => {
      let totalSum = 0;
      activityInfo.forEach(activity => {
        totalSum += activity.price;
      });
      setSum(totalSum);
    };

    calculateSum();
  }, [activityInfo]);


      const getActivityImages = (ac) => {
        return ac.map((element) =>
          element.imageURL.map((a) => (
            <div key={crypto.randomUUID()}>
              <img className="w-[200px] h-[200px] object-cover align-top inline-block " src={a} alt="Activity Image" />
            </div>
          ))
        );
      };

  return (<>
    <div className=" flex bg-gradient-to-r from-blue-gray-100 to-primaryBg-dark h-[220px] w-[600px] justify-start place-items-center rounded-md mx-auto shadow-xl " >
      <div className=" w-[200px] h-[209px] ml-[9px] justify-center flex place-items-center align-middle">
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
          { 
            getActivityImages(activityInfo)
          }
        </Carousel>
      </div>
      <Link to={`/${props.obj.userName}/${props.obj.id}`}>
      <div className="flex flex-col ml-[20px] mr-[10px] gap-[3px] relative h-[90%]  "> 
        <span className="font-fontSecondary text-[30px] text-pretty">{props.obj.name}</span>
        <div className="ml-[15px] font-fontMain text-[18px] text-pretty" >{props.obj.description}</div>
        <span className="text-blue-gray-500 mt-[5px] text-[15px] text-pretty">{props.obj.location}</span>
        <div className="flex w-[361px] mt-auto mb-[10px] ">
          <img className="object-cover rounded-full w-[50px]  text-pretty" src={props.obj.photoURL} />
          <span className="font-fontSecondary my-auto ml-[10px] text-[20px] text-pretty">@{props.obj.userName}</span>
          <img src="/assets/Rectangle.svg" className="absolute right-0 bottom-3 z-0 text-pretty" /><span className="my-auto text-pretty ml-auto mr-[15px] mb-[10px] z-20 text-primaryBg-light text-xl w-[90px] inline-block text-center align-middle absolute right-0 bottom-3  ">£{sum.toFixed(2)}</span>
        </div>
      </div>
      </Link>
    </div>
    </>
  );
}
