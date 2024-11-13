
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentInfo(studentId) {

    const [studentInfo, setstudentInfo] = useState({});

    useEffect(() => {
        DataServices.StudentsInformaion(studentId).then((StudentsInfo) =>  
            setstudentInfo(StudentsInfo
        ))
    },[]);

    return [studentInfo]
}