import { useState, useRef } from 'react';
import { SideBar } from '../../Components/SideBar';
import Gallery from 'react-gallery-component2';

const ImageUploader = ({ onImageChange }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        onImageChange(file); // Pass the file back to parent
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        onImageChange(file); // Pass the file back to parent
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="w-full h-[400px] border-black border-dashed border-4 flex items-center justify-center"
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
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
          className="w-full h-full object-cover"
        />
      ) : (
        <p>Click or Drag to Upload</p>
      )}
    </div>
  );
};

const AddJourneyV2 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activities, setActivities] = useState([]);
  
  const addActivity = () => {
    setActivities([...activities, { id: Date.now(), image: null }]);
  };

  const handleActivityImageChange = (index, file) => {
    const updatedActivities = [...activities];
    updatedActivities[index].image = file;
    setActivities(updatedActivities);
  };

  return (
    <>
      <div className="2xl:flex">
        <SideBar currentPage="add" />

        <form className="w-full h-auto mx-auto">
          <div className="flex flex-col mb-[100px] mt-12 mx-auto max-w-[500px] justify-center items-center gap-24">
            <div className="flex flex-col gap-4 w-full justify-center items-center">
              <div
                className="relative w-full max-w-[500px] h-[200px] z-10 cursor-pointer mx-auto"
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setPreviewUrl(reader.result);
                    reader.readAsDataURL(file);
                  }
                }}
              >
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setPreviewUrl(reader.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Uploaded"
                    className="w-full h-full object-cover rounded-t-2xl bg-gray-600"
                    style={{
                      clipPath: 'url(#curvedMask)',
                      WebkitClipPath: 'url(#curvedMask)',
                      WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)',
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-600 flex items-center justify-center text-gray-900">
                    Click or Drag to Upload
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 w-full max-w-[500px]">
                <input
                  type="text"
                  placeholder="Nickname for the journey"
                  maxLength={30}
                  required
                  className="rounded-md h-[2rem] pl-[5px]"
                />
                <textarea
                  placeholder="What was good about this..."
                  maxLength={215}
                  required
                  className="rounded-md h-[4rem] pl-[5px] resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-20 w-full max-w-[500px]">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex flex-col gap-2">
                  <ImageUploader
                    onImageChange={(file) => handleActivityImageChange(index, file)}
                  />
                  <input
                    required
                    maxLength={30}
                    type="text"
                    placeholder="Activity Name"
                    className="rounded-md h-[2rem] pl-[5px]"
                  />
                  <textarea
                    required
                    maxLength={250}
                    placeholder="Details about the activity"
                    className="rounded-md h-[4rem] pl-[5px] resize-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex w-full">
              <button
                type="button"
                onClick={addActivity}
                className="w-full border-4 border-black flex items-center justify-center"
              >
                Add Activity
              </button>
              <button
                type="submit"
                className="w-full border-4 border-black flex items-center justify-center"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddJourneyV2;
