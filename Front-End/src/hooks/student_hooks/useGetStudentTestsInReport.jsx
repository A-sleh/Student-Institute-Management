
import { separateTesetsAccordingToType } from "../../components/shared/logic/logic"
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetStudentTestsInReport(studnetID,reportId) {

    const [studentTests,setStudentTests] = useState([])


    useEffect(() => {

        if(studnetID == '' || studnetID == undefined || reportId == '' || reportId == undefined ) return 
        DataServices.ShowStudentTestInCurrentReport(studnetID,reportId).then( tests => {
            setStudentTests(tests.map( test => {
                return ({...test,testType:test.test.testType})
            }))
        })
    } ,[])

    return separateTesetsAccordingToType(studentTests)
}