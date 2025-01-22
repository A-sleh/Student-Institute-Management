
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useTestMarkStudents(classId,testId,maximumMark) {

    const [studentTest,setStudentTest] = useState([])
    const [marks,setMarks] = useState({})

    useEffect(() => {

        if(classId == '' || classId == undefined || testId == '' || testId == undefined) return 
        DataServices.ShowStudentsMarksInOneClass(classId,testId).then(students => {
            setStudentTest(students.map(student=>({...student,maximumMark})))
            let testMark = new Map() ;
            students.forEach( stduent => {
                testMark[stduent.testMarkId] = stduent.mark || 0
            })
            setMarks(testMark)
        })
    } , [])

    return [studentTest,marks,setMarks]
}