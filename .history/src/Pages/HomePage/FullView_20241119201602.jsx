import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Overview from "../../Components/DisplayOverview/Overview";
import { getJourney } from "../../Config/firestore";
import Navbar from "../../Components/Navbar";

const FullView = () => {
    const { explore } = useParams()
    const [overviewInfo, setOverviewInfo] = useState([]);

    useEffect(() => {
        const getData = async () => {
            if (explore === 'explore') {
                setOverviewInfo(await getJourney(`journeyData`))
            } else{
                setOverviewInfo(await getJourney('journeyData', explore));
            }

        }
        getData()
    }, [])

    return ( <>
        <div className="grid mt-[50px] mb-[50px] mx-auto gap-[20px] xl:grid-cols-2 grid-cols-1 w-full ">
            {overviewInfo.length > 0 ? overviewInfo.map((x) =>
                <Overview
                    obj={x}
                    key={crypto.randomUUID()}
                ></Overview>
            ) : <h1>No Data</h1>}
        </div>
        <Navbar></Navbar>
        </>
    )
}

export default FullView