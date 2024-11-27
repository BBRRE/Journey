import React, { useEffect, useState } from "react";
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";

export default function ExplorePage({ searchResults, filteredPosts }) {
  const [overviewInfo, setOverviewInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // Prioritize showing searchResults if available, then filteredPosts, otherwise default data
      if (searchResults) {
        setOverviewInfo(searchResults);
      } else if (filteredPosts) {
        setOverviewInfo(filteredPosts);
      } else {
        const journeyData = await getJourney(`journeyData`);
        setOverviewInfo(journeyData);
      }
    };
    getData();
  }, [searchResults, filteredPosts]);

  return (
    <>
      {overviewInfo.length === 0 ? (
        <p>No results</p>
      ) : (
        overviewInfo.map((x) => (
          <Overview obj={x} key={x.id || crypto.randomUUID()} />
        ))
      )}
    </>
  );
}
