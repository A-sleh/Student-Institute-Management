
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentsMarkClass(classId,testId,maximumMark) {

    const [studentsMarks,setStudentsMarks] = useState([])

    useEffect(() => {

        if(classId == '' || classId == undefined || testId == '' || testId == undefined ) return 
        DataServices.ShowStudentsMarksInOneClass(classId,testId).then( students => {
            setStudentsMarks(students.map( testMark => ({...testMark,maximumMark})))
        })
    } ,[])

    return [studentsMarks]
}