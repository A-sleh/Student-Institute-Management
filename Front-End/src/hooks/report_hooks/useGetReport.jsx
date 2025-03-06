
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetReport(reportId) {


    const [report,setReport] = useState([])
    
    useEffect(() => {
        DataServices.ShowAllNativeReports(reportId).then( report => setReport(report))

    } ,[reportId])

    return [report]   
}