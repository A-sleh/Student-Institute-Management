
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetStudentsTestsInCurrentClassAndReport(reportId,classId,reportTitle) {

    const [studentDetails,setStudentDetails] = useState([])

    useEffect(() =>{

        if(classId == '' || classId == undefined || reportId == '' || reportId == undefined ) return 
        DataServices.ShowAllStudentsForCurrentReport(reportId,classId).then( studnets => {
            setStudentDetails(studnets.map( student => ({...student,classId ,reportId,reportTitle})))
        })
    },[])

    return [studentDetails]
}