

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTheTopStudentsInCurrentReport(reportId) {

    const [students,setStudents] = useState([])
    
    useEffect(() => {
        DataServices.ShowTheTopOneInEachClassInCurrentReport(reportId).then( students => setStudents(students) ) 
    },[reportId])

    return [students]
}