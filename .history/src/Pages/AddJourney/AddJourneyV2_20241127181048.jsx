import { useState, useRef } from 'react'
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
              className="relative w-full max-w-[500px] h-[200px] z-10 cursor-pointer mx-auto"
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
                  className="w-full h-full bg-gray-600 flex items-center justify-center text-gray-900"
                  style={{
                    clipPath: 'url(#curvedMask)',
                    WebkitClipPath: 'url(#curvedMask)',
                    WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)'
                  }}
                >
                  Click or Drag to Upload
                </div>
              )}
<div className='flex flex-col gap-4'>
  
                    <input type="text"
                    placeholder="Nickname for the journey"
                    maxLength={30}
                    id="journeyName"
                    required
                    className="rounded-md h-[2rem] pl-[5px]" />
                    <textarea
                    type="text"
                    id="descriptionItput"
                    maxLength={215}
                    className="rounded-md h-[4rem] pl-[5px] resize-none"
                    required
                    placeholder="What was good about this..."
                  />
                  <input
                      type="text"
                      placeholder="Starting Location: Country, City"
                      maxLength={100}
                      className="rounded-md h-[2rem] pl-[5px] "
                      required
                    />
                    <label htmlFor="OverviewLocation" className="flex flex-col gap-[2px] width-[30%] mb-[-5px]">
                    <span className="text-lg"> Continent </span>
                    <select className="h-[34px] px-3 rounded-md text-center" name="cars" id="cars">
                      <option value="Africa">Africa</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="NAmerica">N.America</option>
                      <option value="SAmerica">S.America</option>
                      <option value="Oceania">Oceania</option>
                    </select>
                  </label>
</div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddJourneyV2