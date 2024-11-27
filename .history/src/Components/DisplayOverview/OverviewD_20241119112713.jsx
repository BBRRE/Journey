import React, { useEffect, useState  } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getJourney } from "../../Config/firestore";
import '../../index.css'
import { Link } from "react-router-dom";
import { deleteData } from '../../Config/firestore';
import ClipLoader from "react-spinners/ClipLoader";

export default function Overview(props) {
  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(props.obj.likes || 0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJourney(`journeyData/${props.obj.id}/acivity`);
      setActivityInfo(data);
    };

    fetchData();
  }, [props.obj.id]);

  const handleLike = async () => {
    const newLikeCount = isLiked ? likes - 1 : likes + 1;
    setLikes(newLikeCount);
    setIsLiked(!isLiked);

    try {
      await updateJourneyLikes(props.obj.id, newLikeCount);
    } catch (error) {
      console.error("Error updating likes:", error);
      // Revert the like state if the update fails
      setLikes(likes);
      setIsLiked(isLiked);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteData(props.obj);
    } catch (error) {
      console.error("Error deleting data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityImages = (ac) => {
    return ac.map((element) =>
      element.imageURL.map((a) => (
        <div key={crypto.randomUUID()}>
          <img className="rounded-lg w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover align-top inline-block" src={a} alt="Activity Image" />
        </div>
      ))
    );
  };

  return (
    <>
    <div className="absolute left-[50%] top-[45%]">
      <ClipLoader loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader" color="grey"/></div>
      <div onClick={console.log(props)} className="relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
        <div className="relative w-full h-[200px] z-10">
          <svg width="0" height="0" viewBox="0 0 100 100">
            <defs>
              <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
                <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
              </clipPath>
            </defs>
          </svg>

          <Link to={`/${props.obj.userName}/${props.obj.id}`}>
            <img
              src={props.obj.imageURL}
              alt="Masked Image"
              className="w-full h-full object-cover rounded-t-2xl"
              style={{
                clipPath: 'url(#curvedMask)',
                WebkitClipPath: 'url(#curvedMask)',
              }}
            />
          </Link>
        </div>
        <div className="w-full h-[200px] absolute bottom-0 pt-[15px] pl-[10px] flex flex-col bg-[#F5F4F4]">
          <Link to={`/${props.obj.userName}/${props.obj.id}`}>
            <div className="flex-1 flex flex-col">
              <span className="font-medium text-2xl">{props.obj.name}</span>
              <div className="flex itens-center">
                <img className="h-[15px] w-[15px]" src='/assets/location-pin-alt-svgrepo-com.svg' alt="" />
                <span className="text-sm font-light text-gray-700">{props.obj.location}</span>
              </div>
              <span className="text-md h-[100px] overflow-clip text-ellipsis">{props.obj.description}...</span>
            </div>
          </Link>
          <div className="flex justify-between py-2 items-center mt-auto pb-[5px]">
            <span className="text-lg font-semibold">£ {props.obj.totalPrice}</span>
            <div className="flex items-center gap-6 pr-[10px] h-[30px]">
              <div className="flex gap-1">
              <img
              className={`h-[24px] cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              src={isLiked ? "/assets/heart-filled-svgrepo-com.svg" : "/assets/heart-svgrepo-com.svg"}
              onClick={handleLike}
              alt="Like"
            />
            <span>{likes}</span>
              </div>
              <img className="h-[24px]" src={'assets/share-svgrepo-com.svg'} alt="" />
              <img
                src="assets/trash.svg"
                className="h-[24px] ml-[5px] z-10"
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
