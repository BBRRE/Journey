import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getJourney } from "../../Config/firestore";
import '../../index.css'
import { Link } from "react-router-dom";

export default function Overview(props) {
//
  const [activityInfo, setActivityInfo] = useState([]);
  const [carouselWidth, setCarouselWidth] = useState(200); // Initial width
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

  useEffect(() => {
    const handleResize = () => {
      // Adjust the width based on the screen width
      const screenWidth = window.innerWidth;
      const newWidth = screenWidth < 960 ? 150 : 200; // Set the width based on the screen width
      setCarouselWidth(newWidth);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call the resize handler once initially
    handleResize();

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


      const getActivityImages = (ac) => {
        return ac.map((element) =>
          element.imageURL.map((a) => (
            <div key={crypto.randomUUID()}>
              <img className=" rounded-lg w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover align-top inline-block " src={a} alt="Activity Image" />
            </div>
          ))
        );
      };

  return (<>
    <div className=" flex overview md:h-[220px] md:w-[600px] h-[180px] w-[350px]  justify-start place-items-center rounded-md mx-auto shadow-xl relative" >
      <div className="m-y-auto shadow-2xl w-[150px] h-[150px] md:w-[200px] md:h-[200px] ml-[9px] justify-center flex place-items-center align-middle">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
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
      <div className="flex flex-col ml-[5px] mr-[10px] gap-[3px] relative h-[95%] md:w-[380px] w-[180px] "> 
        <span className="font-fontSecondary font-semibold text-[15px] md:text-[30px] text-pretty overflow">{props.obj.name}</span>
        <div className="ml-[10px] truncate font-fontMain text-[12px] md:text-[18px] md:h-auto h-[80px] text-pretty" >{props.obj.description}</div>
        <span className="text-blue-gray-500 mt-[5px] text-[12px] md:text-[15px] text-pretty">{props.obj.location}</span>
        <div className="flex mt-auto mb-[10px] relative">
          <img className="object-cover rounded-full w-[20px] md:w-[40px]  text-pretty" src={props.obj.photoURL} />
          <span className="font-fontSecondary my-auto ml-[3px] md:ml-[10px] text-[10px] md:text-[20px] text-pretty">@{props.obj.userName}</span>
        </div>
      </div>
        <img src="/assets/Rectangle.svg" className="absolute right-[5px] bottom-[5px] md:right-[3px] md:bottom-[3px] z-0 text-pretty w-[80px] md:w-[120px]" /><span className="my-auto text-pretty ml-auto mr-[15px] mb-[10px] z-20 text-primaryBg-light text-md md:text-xl w-[90px] inline-block text-center align-middle absolute right-[-15px] bottom-[0px] md:right-[3px] md:bottom-[5px]">£{sum.toFixed(0)}</span>
      </Link>
    </div>
    </>
  );
}
