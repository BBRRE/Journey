import {useState} from 'react'
import { SideBar } from '../../Components/SideBar'
import ClipLoader from "react-spinners/ClipLoader";

const AddJourneyV2 = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="2xl:flex">
        <SideBar currentPage="add" />
        <div className={`fixed inset-0 flex items-center justify-center ${loading ? '' : 'hidden'} `}>
          <ClipLoader
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="grey"
          />
        </div>
        <div className="flex flex-col mb-[100px] mt-12 2xl:w-[50%] mx-auto">
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

        </div>
      </div>
    </>
  )
}

export default AddJourneyV2