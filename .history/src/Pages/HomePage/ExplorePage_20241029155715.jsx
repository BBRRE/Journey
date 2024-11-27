import React, { useEffect, useState } from "react";
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";

export default function ExplorePage({ searchResults, filterCriteria }) {
  const [overviewInfo, setOverviewInfo] = useState([]);
  const [displayedInfo, setDisplayedInfo] = useState([]);  // Data to display based on filters

  useEffect(() => {
    const fetchData = async () => {
      if (searchResults) {
        setOverviewInfo(searchResults);
      } else {
        const journeyData = await getJourney(`journeyData`);
        setOverviewInfo(journeyData);
      }
    };
    fetchData();
  }, [searchResults]);

  useEffect(() => {
    const applyFilters = () => {
      let data = [...overviewInfo];

      if (filterCriteria) {
        const { minPrice, maxPrice, continent, minActivities } = filterCriteria;

        data = data.filter((post) => {
          const matchesPrice =
            post.totalPrice >= minPrice && post.totalPrice <= maxPrice;
          const matchesContinent = continent ? post.Continent === continent : true;

          return matchesPrice && matchesContinent && matchesActivities;
        });
      }

      setDisplayedInfo(data);
    };

    applyFilters();
  }, [overviewInfo, filterCriteria]);

  return (
    <>
      {displayedInfo.length === 0 ? (
        <p>No results</p>
      ) : (
        displayedInfo.map((post) => (
          <Overview obj={post} key={post.id} />
        ))
      )}
    </>
  );
}
