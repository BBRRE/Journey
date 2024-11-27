import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import LikeButton from "../Likes";
export default function Overview(props) {


  return (<>
    <div className="relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto " >
      <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100" className="">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>

        <Link to={`/${props.obj.userName}/${props.obj.id}`}>
          <img
            src={props.obj.imageURL}
            onError={(e) => { e.target.src = "assets/logo.png" }}
            alt="Masked Image"
            className="w-full h-full object-cover rounded-t-2xl object "
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)',
              WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)'
            }}
          />
        </Link>
      </div>


      <div className=" w-full h-[200px] absolute bottom-0 pt-[15px] pl-[10px] flex flex-col bg-[#F5F4F4]">
        <Link to={`/${props.obj.userName}/${props.obj.id}`}>
          <div className="flex-1 flex flex-col">
            <span className="font-medium text-2xl z-10">{props.obj.name}</span>
            <div className="flex itens-center">
              <img className="h-[15px] w-[15px]" src='/assets/location-pin-alt-svgrepo-com.svg' alt="" />
              <span className="text-sm font-light text-gray-700">{props.obj.location}</span>
            </div>
            <span className="text-md h-[100px] overflow-clip text-ellipsis">{props.obj.description}...</span>
          </div>
        </Link>
        <div className="flex justify-between py-2 items-center mt-auto pb-[5px]">
          <span className="text-lg font-semibold">£ {props.obj.totalPrice.toFixed(2)}</span>
          <div className="flex items-center gap-6 pr-[10px] h-[30px]">
          <LikeButton obj={props.obj} />
            <img className="h-[24px]" src={'assets/share-svgrepo-com.svg'} />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
