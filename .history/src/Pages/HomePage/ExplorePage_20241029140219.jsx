import React, { useEffect, useState } from "react";
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";

export default function ExplorePage({ filteredPosts }) {
  const [overviewInfo, setOverviewInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // Use filtered posts if available, otherwise fetch default data
      if (filteredPosts) {
        setOverviewInfo(filteredPosts);
      } else {
        setOverviewInfo(await getJourney(`journeyData`));
      }
    };
    getData();
  }, [filteredPosts]);

  return (
    <>
      {overviewInfo.map((x) => (
        <Overview obj={x} key={crypto.randomUUID()} />
      ))}
    </>
  );
}
