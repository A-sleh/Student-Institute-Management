
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentReports(studentId) {

    const [studentReports, setStudentReports] = useState([]);

    useEffect(() => {
        DataServices.ShowStudentReports(studentId).then((studentReports) => {
            setStudentReports(studentReports);
        });
    },[]);

    return [studentReports]
}