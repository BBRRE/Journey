import React, { useState } from 'react';
import './slider.css'

export const PriceRangeSlider = () => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(337);

  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  return (
    <div className="price-range-slider">
      <label className="slider-label">Price, $</label>
      <div className="slider-values">
        <input
          type="number"
          step={100}
          value={minPrice}
          onChange={handleMinChange}
          className="price-input"
        />
        <span>-</span>
        <input
          type="number"
          step={100}
          value={maxPrice}
          onChange={handleMaxChange}
          className="price-input"
        />
      </div>
      <div className="slider-track-container">
        <input
          type="range"
          step={100}
          min="0"
          max="10000"
          value={minPrice}
          onChange={handleMinChange}
          className="slider-thumb thumb-min"
        />
        <input
          type="range"
          step={100}
          min="0"
          max="10000"
          value={maxPrice}
          onChange={handleMaxChange}
          className="slider-thumb thumb-max"
        />
        <div
          className="slider-track"
          style={{
            left: `${(minPrice / 500) * 100}%`,
            width: `${((maxPrice - minPrice) / 500) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
