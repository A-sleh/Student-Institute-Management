

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetClassReportsAvg(classId,classTitle) {

    const [reportsAvg,setReportsAvg] = useState([])


    useEffect(() => {

        if(classId == '' || classId == undefined ) return 
        DataServices.ShowAllReportsAvgInCurretnClass(classId).then( reports => {
            setReportsAvg(reports)
        })
    } ,[])


    return [reportsAvg]
}