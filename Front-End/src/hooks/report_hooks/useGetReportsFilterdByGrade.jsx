

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetReportsFilterdByGrade(gradeId) {

    const [reports,setReports] = useState([])
    
    useEffect(() => {
        DataServices.ShowAllReportsFilteredByGrade(gradeId).then( res => setReports(res) ) 
    },[gradeId])

    return [reports]
}