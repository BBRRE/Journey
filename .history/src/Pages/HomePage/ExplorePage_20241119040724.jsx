import React, { useEffect, useState } from "react";
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";

export default function ExplorePage({ criteria }) {
  const [overviewInfo, setOverviewInfo] = useState([]);
  const [displayedInfo, setDisplayedInfo] = useState([]);
  const [loading, setLoading] = usestate(true)

  useEffect(() => {
    const fetchData = async () => {
      const journeyData = await getJourney(`journeyData`);
      setLoading(true)
      setOverviewInfo(journeyData)
    };
    fetchData();
  }, []);

  useEffect(() => {
    const applyCriteria = () => {
      if (!criteria) {
        setDisplayedInfo(overviewInfo);
        return;
      }

      const { searchTerm, filters } = criteria;
      let data = [...overviewInfo];

      if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        data = data.filter(post =>
          ['description', 'name', 'Continent', 'location'].some(field =>
            post[field]?.toLowerCase().includes(lowerSearch)
          )
        );
      }

      if (filters) {
        const { minPrice, maxPrice, continent, minActivities } = filters;

        data = data.filter(post => {
          const matchesPrice = post.totalPrice >= minPrice && post.totalPrice <= maxPrice;
          const matchesContinent = continent ? post.Continent === continent : true;
          const matchesActivities = post.numActivities >= minActivities;
          return matchesPrice && matchesContinent && matchesActivities;
        });
      }

      setDisplayedInfo(data);
    };

    applyCriteria();
  }, [overviewInfo, criteria]);

  return (
    <>
{loading ? (
  <div className="space-y-4">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-8 bg-gray-300 rounded w-full"></div>
    </div>
  </div>
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
