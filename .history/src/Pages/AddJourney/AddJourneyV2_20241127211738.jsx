import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { SideBar } from '../../Components/SideBar'
import Gallery from '../../Components/Gallery'

const AddJourneyV2 = () => {
  const [overviewImage, setOverviewImage] = useState(null)
  const [activityImages, setActivityImages] = useState({})
  
  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      journeyName: '',
      description: '',
      startingLocation: '',
      continent: 'Europe',
      activities: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "activities"
  })

  const handleOverviewImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setOverviewImage(URL.createObjectURL(file))
    }
  }

  const handleActivityImageUpload = (event, index) => {
    const files = Array.from(event.target.files)
    const imageUrls = files.map(file => URL.createObjectURL(file))
    
    // Update activity images state
    setActivityImages(prev => ({
      ...prev,
      [index]: imageUrls
    }))
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    // Add text fields
    formData.append('journeyName', data.journeyName)
    formData.append('description', data.description)
    formData.append('startingLocation', data.startingLocation)
    formData.append('continent', data.continent)

    // Add overview image
    const overviewImageFile = document.querySelector('input[name="overviewImage"]').files[0]
    if (overviewImageFile) {
      formData.append('overviewImage', overviewImageFile)
    }

    // Add activities and their images
    fields.forEach((field, index) => {
      // Add activity details
      formData.append(`activities[${index}][locationName]`, data.activities[index]?.locationName || '')
      formData.append(`activities[${index}][description]`, data.activities[index]?.description || '')
      formData.append(`activities[${index}][location]`, data.activities[index]?.location || '')
      formData.append(`activities[${index}][price]`, data.activities[index]?.price || '')

      // Add activity images
      const activityImageFiles = document.querySelectorAll(`input[name="activityImages[${index}]"]`)[0]?.files
      if (activityImageFiles) {
        Array.from(activityImageFiles).forEach((file, fileIndex) => {
          formData.append(`activities[${index}][images][${fileIndex}]`, file)
        })
      }
    })

    try {
      const response = await fetch('/api/journey', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      const result = await response.json()
      console.log('Submission successful:', result)
    } catch (error) {
      console.error('Submission error:', error)
    }
  }

  return (
    <div className="2xl:flex">
      <SideBar currentPage="add" />
      <form onSubmit={handleSubmit(onSubmit)} className='w-full h-auto mx-auto'>
        <div className="flex flex-col mb-[100px] mt-12 mx-auto max-w-[500px] justify-center items-center gap-24">
          {/* Overview Image Upload */}
          <div className='relative w-full max-w-[500px] h-[200px] z-10 cursor-pointer mx-auto'>
            <input
              type="file"
              name="overviewImage"
              className="z-10 absolute top-0 left-0 w-full h-full p-4"
              accept="image/*"
              onChange={handleOverviewImageUpload}
            />
            {overviewImage && (
              <img
                src={overviewImage}
                className="w-full h-full object-cover rounded-t-2xl bg-gray-600"
                alt="Overview"
              />
            )}
          </div>

          {/* Activities */}
          <div className='flex flex-col gap-20 w-full max-w-[500px]'>
            {fields.map((field, index) => (
              <div key={field.id} className='flex flex-col gap-2 w-full'>
                <div className='w-full h-auto flex flex-col gap-2'>
                  <div className="relative w-full h-auto border-black border-dashed border-4">
                    <input
                      type="file"
                      name={`activityImages[${index}]`}
                      className="z-10 absolute top-0 left-0 w-full h-full p-4"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleActivityImageUpload(e, index)}
                    />
                    <Gallery 
                      images={activityImages[index] || []} 
                    />
                  </div>

                  {/* Rest of your activity form fields */}
                  <input
                    {...register(`activities.${index}.locationName`, {
                      required: 'Location name is required',
                      maxLength: {
                        value: 30,
                        message: 'Location name must be 30 characters or less'
                      }
                    })}
                    placeholder="Hotel, Restaurant, Resort Name..."
                    className="rounded-md h-[2rem] pl-[5px]"
                  />

                  {/* Other fields remain the same */}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className='flex w-full'>
            <button 
              type="button" 
              onClick={() => append({})} 
              className='w-full border-4 border-black flex items-center justify-center'
            >
              Add Activity
            </button>
            <button 
              type="button" 
              onClick={() => fields.length > 0 && remove(fields.length - 1)}
              className='w-full border-4 border-black flex items-center justify-center'
            >
              Remove Activity
            </button>
            <button 
              type="submit"
              className='w-full border-4 border-black flex items-center justify-center'
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddJourneyV2