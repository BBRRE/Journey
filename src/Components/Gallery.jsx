import React, { useState, useEffect } from 'react'

const Gallery = ({ images = [] }) => {
  const [processedImages, setProcessedImages] = useState([]);

  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const ratio = img.width / img.height || 1;
        resolve({
          url: url,
          orientation: ratio > 1 ? 'hori' : 'vert',
          ratio: ratio > 1 ? ratio : 1 / ratio,
          w: img.width || 800,
          h: img.height || 600
        });
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  useEffect(() => {
    const processImages = async () => {
      try {
        const imageData = await Promise.all(images.map(loadImage));
        setProcessedImages(imageData.sort((a, b) => b.ratio - a.ratio));
      } catch (error) {
        console.error('Error processing images', error);
      }
    };

    if (images.length > 0) {
      processImages();
    }
  }, [images]);

  const renderNestedImages = (imageData, startIndex = 0) => {
    if (startIndex >= imageData.length) return null;
    const image = imageData[startIndex];
    const isVertical = image.orientation === 'vert';
    const isLastImage = startIndex === imageData.length - 1;

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
            style={{ maxHeight: '400px' }} // Added to ensure consistent max height
          />
        </div>
        {!isLastImage && (
          <div className="w-full h-auto">
            {renderNestedImages(imageData, startIndex + 1)}
          </div>
        )}
      </div>
    );
  };
   
  return (
    <div className="w-full h-auto min-h-[400px]">
      {processedImages.length > 0 && renderNestedImages(processedImages)}
    </div>
  );
}

export default Gallery;