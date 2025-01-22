

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetReportsFilterdByGrade(gradeId) {

    const [reports,setReports] = useState([])
    
    useEffect(() => {
        if(gradeId == '' || gradeId == undefined) return 
        DataServices.ShowAllReportsFilteredByGrade(gradeId).then( res => setReports(res) ) 
    },[gradeId])

    return [reports]
}