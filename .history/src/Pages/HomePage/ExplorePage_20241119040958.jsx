import React, { useEffect, useState } from "react";
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";

export default function ExplorePage({ criteria }) {
  const [overviewInfo, setOverviewInfo] = useState([]);
  const [displayedInfo, setDisplayedInfo] = useState([]);
  const [loading, setLoading] = useState(true)

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
  <>
  <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto ">
  </div>
   <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto ">
   </div>
    <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto ">
    </div>
     <div className="space-y-4 animate-pulse relative w-[90%] h-[350px] rounded-t-2xl flex flex-col max-w-[500px] mx-auto ">
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
