
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentReportTests(studentId,repotId,...reFetch) {
    

    const [tests,setTests] = useState({})

    useEffect(() => { 

        DataServices.ShowStudentTestInCurrentReport(studentId,repotId).then( tests => {
        setTests(
            Object.groupBy(tests, ({test}) => {
            return test.testType?.toLowerCase() != 'quiz' ? test.testType?.toLowerCase() : 'quiz'
            })
        )
        })
    },[...reFetch])

    return [tests.quiz || [],tests.exam || []]
}