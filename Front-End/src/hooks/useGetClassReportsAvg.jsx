

import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetClassReportsAvg(classId,classTitle) {

    const [reportsAvg,setReportsAvg] = useState([])


    useEffect(() => {
        DataServices.ShowAllReportsAvgInCurretnClass(classId).then( reports => {
            setReportsAvg(reports)
        })
    } ,[])


    return [reportsAvg]
}