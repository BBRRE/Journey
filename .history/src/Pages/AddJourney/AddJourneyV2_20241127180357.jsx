import { useState,useRef } from 'react'
import { SideBar } from '../../Components/SideBar'
import ClipLoader from "react-spinners/ClipLoader";

const AddJourneyV2 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };
  return (
    <>
      <div className="2xl:flex">
        <SideBar currentPage="add" />


        <form className='w-full h-auto' >
          <div className="flex flex-col mb-[100px] mt-12 2xl:w-[50%] mx-auto ">
          <div 
      className="relative w-full mac-w-[500px] h-[200px] z-10 cursor-pointer"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <svg width="0" height="0" viewBox="0 0 100 100" className="absolute">
        <defs>
          <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
          </clipPath>
        </defs>
      </svg>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Uploaded"
          className="w-full h-full object-cover rounded-t-2xl bg-gray-600"
          style={{
            clipPath: 'url(#curvedMask)',
            WebkitClipPath: 'url(#curvedMask)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)'
          }}
        />
      ) : (
        <div 
          className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500"
          style={{
            clipPath: 'url(#curvedMask)',
            WebkitClipPath: 'url(#curvedMask)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)'
          }}
        >
          Click or Drag to Upload
        </div>
      )}
    </div>

          </div>
        </form>
      </div>
    </>
  )
}

export default AddJourneyV2