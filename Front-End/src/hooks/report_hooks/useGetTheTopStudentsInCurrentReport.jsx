

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTheTopStudentsInCurrentReport(reportId) {

    const [students,setStudents] = useState([])
    
    useEffect(() => {
        
        if(reportId == '' || reportId == undefined) {
            setStudents([])
            return 
        }

        DataServices.ShowTheTopOneInEachClassInCurrentReport(reportId).then( students => setStudents(
            students.map(student => ({...student,Average : Number(student.Average)}))
        )) 
    },[reportId])

    return [students]
}