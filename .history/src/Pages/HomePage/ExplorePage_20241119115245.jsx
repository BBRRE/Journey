import React, { useEffect, useState } from "react";
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";

export default function ExplorePage({ criteria }) {
  const [displayedInfo, setDisplayedInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);  // Store last visible document for pagination
  const [hasMore, setHasMore] = useState(true);  // Track if more posts are available
  const [sloading, setSloading] = useState(false);
  

  // Fetch initial data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Start loading
      let journeyData;

      if (!criteria) {
        journeyData = await getJourney("journeyData");  // Fetch initial data without criteria
      } else {
        journeyData = await getJourney("journeyData", criteria);  // Fetch data with criteria
      }

      setDisplayedInfo(journeyData.data);  // Set the data
      setLastVisible(journeyData.lastVisibleDoc);  // Set the last visible document for pagination
      setLoading(false);  // Stop loading
      setHasMore(journeyData.data.length === 6);  // Check if there are more posts to load
    };

    fetchData();
  }, [criteria]);  // Trigger on criteria change

  // Load more data when button is clicked
  const loadMore = async () => {
    setSloading(true)
    let journeyData;

    if (!criteria) {
      journeyData = await getJourney("journeyData", null, false, lastVisible);
    } else {
      journeyData = await getJourney("journeyData", criteria, false, lastVisible);
    }

    setDisplayedInfo((prev) => [...prev, ...journeyData.data]);  // Append new data to existing data
    setLastVisible(journeyData.lastVisibleDoc);  // Update last visible doc
    setHasMore(journeyData.data.length === 6);  // If less than 4 posts are returned, no more data is available
    setSloading(false)
  };
  return (
    <>
{loading ? (
  <><div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
  <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
  <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
  <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto">
  <div className="relative w-full h-[200px] z-10">
        <svg width="0" height="0" viewBox="0 0 100 100">
          <defs>
            <clipPath id="curvedMask" clipPathUnits="objectBoundingBox">
              <path d="M 0,0 L 1.002,0 L 1,0.833 C 0.745,0.972 0.195,0.689 0,0.833 L 0,0 Z"></path>
            </clipPath>
          </defs>
        </svg>
          <div
            alt="Masked Image"
            className="bg-gray-400 animate-pulse w-full h-full"
            style={{
              clipPath: 'url(#curvedMask)',
              WebkitClipPath: 'url(#curvedMask)'
            }}
          ></div>
      </div>
      <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
     </>
) : (
  displayedInfo.length === 0 ? (
    <p>No results</p>
  ) : (
    displayedInfo.map(post => (
      <Overview obj={post} key={post.id} />
    ))
  )
)}
      {hasMore ? (
            <button
              className={` mb-14 2xl:col-span-2 almost3XL:col-span-3 ${sloading ? 'animate-pulse' : ''}`}
              onClick={loadMore}
              disabled={loading}  // Disable the button when loading
            >
              Load More
            </button>
          ) : (<h1 className={` mb-14 2xl:col-span-2 almost3XL:col-span-3 `}>No more content</h1>) }
    </>
  );
}
