import React, { useEffect, useState } from "react";
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";

export default function ExplorePage() {
  const [overviewInfo, setOverviewInfo] = useState([]);

useEffect(() => {
  const getData = async () => {
    setOverviewInfo(await getJourney(`journeyData`))
    console.log( overviewInfo)
  }
  getData()
},[])


  return <div className="grid mt-[50px] mb-[50px] mx-auto gap-[20px] xl:grid-cols-2 grid-cols-1 w-full ">
    {
    overviewInfo.map((x) =>
    <Overview
          obj={x}
          key={crypto.randomUUID()}
        ></Overview>)
        }
        </div>;
}
