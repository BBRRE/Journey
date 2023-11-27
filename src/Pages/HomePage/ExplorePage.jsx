import React, { useEffect, useState } from "react";
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";

export default function ExplorePage() {
  const [overviewInfo, setOverviewInfo] = useState([]);

useEffect(() => {
  const getData = async () => {
    setOverviewInfo(await getJourney(`journeyData`))
    console.log(overviewInfo)
  }
  getData()
},[])
  return <div className="explore-cont">
    {
    overviewInfo.map((x) =>
    <Overview
          obj={x}
          key={crypto.randomUUID()}
        ></Overview>)
        }
        </div>;
}
