
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTests(classId,testType,filterBySubject,dateSearch,testState) {

    const [tests,setTset] = useState([])

    useEffect(() => {
        DataServices.ShowCurrentClassTests(classId,false).then( tests => {
            setTset(tests.filter(test => {
                if ((dateSearch != '' && ( new Date(dateSearch) - new Date(test.date)) < 0 )) return false
                return ((testState && test.correctionDate == null) || (!testState && test.correctionDate != null))&&(testType == 'All' || testType.toLowerCase() == test.testType.toLocaleLowerCase() ) && (filterBySubject == 'All' || filterBySubject.toLocaleLowerCase() == test.subject.subject.toLowerCase())
            }).map(test => ({...test,classId}) ))
        })
    } ,[testType,filterBySubject,dateSearch,testState])

    return [tests]
}