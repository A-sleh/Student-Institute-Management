
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentTestsNotAddedToReport(studentId) {

    const [tests,setTests] = useState({})

    useEffect(() => { 

        if(studentId == '' || studentId == undefined ) return s
        DataServices.ShowStudentTestNotAddedToReport(studentId).then( tests => {
        const pendingTests = tests.filter( testCur => {
            return testCur.test.report == null
        }) 
        setTests(
            Object.groupBy(pendingTests, ({test}) => {
            return test.testType?.toLowerCase() != 'quiz' ? test.testType?.toLowerCase() : 'quiz'
            })
        )
        })
    },[]);

    return [tests.quiz || [],tests.exam || []]
}