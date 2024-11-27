import React, { useEffect, useState } from "react";
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";

export default function ExplorePage({ criteria }) {
  const [overviewInfo, setOverviewInfo] = useState([]);
  const [displayedInfo, setDisplayedInfo] = useState([]);
  const [loading, setLoading] = useState(true)
  const [lastDoc, setLastDoc] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const fetchJourneys = async () => {
    setIsFetching(true);
    const { data, lastVisible } = await getJourney("journeyData", criteria, lastDoc);
    setDisplayedInfo(prevData => [...prevData, ...data]);
    setLoading(false)
    setLastDoc(lastVisible);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchJourneys();
  }, [criteria]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200 && !isFetching) {
      fetchJourneys();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

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
      
    </>
  );
}
