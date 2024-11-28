import React from 'react'

const Gallery = ({ images = [], })  => {

    const processImages = (urls) => {
        return urls.map(url => {
          const img = new Image()
          img.src = url
          
          const ratio = img.width / img.height || 1 
          return {
            url: url,
            orientation: ratio > 1 ? 'hori' : 'vert',
            ratio: ratio > 1 ? ratio : 1 / ratio,
            w: img.width || 800,
            h: img.height || 600
          }
        }).sort((a, b) => b.ratio - a.ratio)
      }


      const renderNestedImages = (imageData, startIndex = 0) => {
    if (startIndex >= imageData.length) return null

    const image = imageData[startIndex]
    const isVertical = image.orientation === 'vert'
    const isLastImage = startIndex === imageData.length - 1

    return (
      <div
        key={startIndex}
        className={`
          flex gap-[5px]
          ${isVertical ? 'flex-row' : 'flex-col'}
          w-full h-full
        `}
      >
        <div    
          className={`
            w-full h-auto
            ${isLastImage ? 'w-full h-full' : ''}
            overflow-hidden
          `}
        >
          <img
            src={image.url}
            alt={`Image ${startIndex + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
        {!isLastImage && (
          <div className="w-full h-auto">
            {renderNestedImages(imageData, startIndex + 1)}
          </div>
        )}
      </div>
    )
  }
    
  const processedImages = processImages(images)

  return (
    <div className="w-full h-auto">
      {renderNestedImages(processedImages)}
    </div>
  )
}

export default Gallery