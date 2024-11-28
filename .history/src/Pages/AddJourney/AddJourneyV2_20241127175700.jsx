import { useState } from 'react'
import { SideBar } from '../../Components/SideBar'
import ClipLoader from "react-spinners/ClipLoader";

const AddJourneyV2 = () => {
  const [mainImage, setMainImage] = useState(null);

  return (
    <>
      <div className="2xl:flex">
        <SideBar currentPage="add" />
        {/* <div className={`fixed inset-0 flex items-center justify-center ${loading ? '' : 'hidden'} `}>
          <ClipLoader
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="grey"
          />
        </div> */}
        <form >
        <div className="flex flex-col mb-[100px] mt-12 2xl:w-[50%] mx-auto">
          <div className="relative w-full h-[200px] z-10">
            <svg width="0" height="0" viewBox="0 0 100 100" className="">
              <defs>
                <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
                  <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
                </clipPath>
              </defs>
            </svg>
            <img
              alt="Masked Image"
              className="w-full h-full object-cover rounded-t-2xl object bg-gray-600"
              style={{
                clipPath: 'url(#curvedMask)',
                WebkitClipPath: 'url(#curvedMask)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)'
              }}
            />
          </div>
          <label className=" mt-[16px] hover:cursor-pointer flex flex-col justify-center items-center mx-auto w-[100%] h-[150px] bg-primaryBg-light bg-opacity-[0.5] border-dashed border-2 border-teirtiaryAc" htmlFor={`OverviewPic`}>
                Upload Photo
                <input
                  type="file"
                  id={`OverviewPic`}
                  accept="image/*"
                  className="file"
                />
              </label>
        </div>
          </form>
      </div>
    </>
  )
}

export default AddJourneyV2