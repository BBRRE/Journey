import React from 'react'

const ActivitySceleton = () => {
    return (
        <div className='bg-gray-100 animate-pulse w-full p-[20px] mb-11 rounded-md max-w-[800px] flex flex-col mx-auto shadow-md'>
            <div class="w-full "> <div class="
          flex gap-[5px]
          flex-col
          w-full h-full
        "><div class=" w-full h-auto
          
          overflow-hidden
        "><img alt="Image 1" class=" bg-gray-300 w-full h-auto object-cover"/></div><div class="
            w-full h-auto
          "><div class="
          flex gap-[5px]
          flex-row
          w-full h-full
        "><div class=" w-full h-auto
          
          overflow-hidden
        "><img className="bg-gray-300 " /></div><div class="
            w-full h-auto
          "><div class="
          flex gap-[5px]
          flex-row
          w-full h-full
        "><div class=" w-full h-auto
          w-full h-full
          overflow-hidden
        "><img alt="Image 3" class="w-full h-auto object-cover bg-gray-300"/></div></div></div></div></div></div></div></div>

    )
}

export default ActivitySceleton