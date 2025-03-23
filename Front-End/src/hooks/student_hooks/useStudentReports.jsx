
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentReports(studentId) {

    const [studentReports, setStudentReports] = useState([]);
    const [studentsReportsAvg,setStudentsReportsAvg] = useState([])

    useEffect(() => {

        if(studentId == '' || studentId == undefined) {
            setStudentsReportsAvg([])
            setStudentReports([])
            return 
        }
        DataServices.ShowStudentReports(studentId).then((studentReports) => {
            setStudentReports(studentReports);
        });
        DataServices.ShowStudentReportsAvg(studentId).then( reportsAvg => {
            setStudentsReportsAvg(reportsAvg)
        })
    },[studentId]);

    return [studentReports,studentsReportsAvg]
}