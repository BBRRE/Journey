import React from 'react';

const GlassmorphicHeader = ({ children }) => {
  return (
    <h2 className="
    font-sans text-3xl font-semibold tracking-tight
    text-gray-900
    border-b-2 border-gray-200
    px-1 ml-[8px]
    ">
      {children}
    </h2>
  );
};

export default GlassmorphicHeader;