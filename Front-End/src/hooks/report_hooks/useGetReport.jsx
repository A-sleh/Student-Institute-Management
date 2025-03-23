
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetReport(reportId,classId,...reFetch) {


    const [report,setReport] = useState([])
    
    useEffect(() => {
        DataServices.ShowAllNativeReports(reportId,`?classId=${classId}`).then( report => setReport(report))

    } ,[reportId,...reFetch])

    return [report]   
}