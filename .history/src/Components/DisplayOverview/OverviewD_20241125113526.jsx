import React, { useState  } from "react";
import { Link } from "react-router-dom";
import { deleteData } from '../../Config/firestore';
import ClipLoader from "react-spinners/ClipLoader";
import LikeButton from "../Likes";

export default function Overview({ obj, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteData(obj); // Delete data from the database
      onDelete(obj.id); // Notify the parent about the deletion
    } catch (error) {
      console.error("Error deleting data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute left-[50%] top-[45%]">
        <ClipLoader loading={loading} size={50} aria-label="Loading Spinner" data-testid="loader" color="grey" />
      </div>
      <div className="relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
        <div className="relative w-full h-[200px] z-10">
          <Link to={`/${obj.userName}/${obj.id}`}>
            <img
              src={obj.imageURL}
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
          <Link to={`/${obj.userName}/${obj.id}`}>
            <div className="flex-1 flex flex-col">
              <span className="font-medium text-2xl">{obj.name}</span>
              <div className="flex items-center">
                <img className="h-[15px] w-[15px]" src="/assets/location-pin-alt-svgrepo-com.svg" alt="" />
                <span className="text-sm font-light text-gray-700">{obj.location}</span>
              </div>
              <span className="text-md h-[100px] overflow-clip text-ellipsis">{obj.description}...</span>
            </div>
          </Link>
          <div className="flex justify-between py-2 items-center mt-auto pb-[5px]">
            <span className="text-lg font-semibold">£ {obj.totalPrice.toFixed(2)}</span>
            <div className="flex items-center gap-6 pr-[10px] h-[30px]">
              <LikeButton obj={obj} />
              <img className="h-[24px]" src={'assets/share-svgrepo-com.svg'} alt="" />
              <img
                src="assets/trash.svg"
                className="h-[24px] ml-[5px] z-10 cursor-pointer"
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
