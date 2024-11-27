import React, { useEffect, useState } from "react";
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";

export default function ExplorePage({ filteredPosts }) {
  const [overviewInfo, setOverviewInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      if (filteredPosts) {
        setOverviewInfo(filteredPosts);
      } else {
        const journeyData = await getJourney(`journeyData`);
        setOverviewInfo(journeyData);
      }
    };
    getData();
  }, [filteredPosts]);

  return (
    <>
      {overviewInfo.length === 0 ? (
        <p className="absolute top-[50%] lift-[100%]">No results</p>
      ) : (
        overviewInfo.map((x) => (
          <Overview obj={x} key={x.id || crypto.randomUUID()} />
        ))
      )}
    </>
  );
}
