import React from 'react'

const AddJourneyV2 = () => {
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
        <div className="flex flex-col mb-[100px] mt-12 2xl:w-[50%] mx-auto"></div>
        </div>
    </>
  )
}

export default AddJourneyV2