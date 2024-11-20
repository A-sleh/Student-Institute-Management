
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentsMarkClass(classId,testId,maximumMark) {

    const [studentsMarks,setStudentsMarks] = useState([])

    useEffect(() => {
        DataServices.ShowStudentsMarksInOneClass(classId,testId).then( students => {
            setStudentsMarks(students.map( testMark => ({...testMark,maximumMark})))
        })
    } ,[])

    return [studentsMarks]
}