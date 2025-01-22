
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTests(classId,likedTests,correctionTests,testType,filterBySubject,dateSearch,testState) {

    const [tests,setTset] = useState([])

    useEffect(() => {

        if(classId == '' || classId == undefined) return 
        DataServices.ShowCurrentClassTests(classId,likedTests,correctionTests).then( tests => {
            setTset(tests.filter(test => {
                if ((dateSearch != '' && ( new Date(dateSearch) - new Date(test.date)) < 0 )) return false
                return ((testState && test.correctionDate == null) || (!testState && test.correctionDate != null))&&(testType == 'All' || testType?.toLowerCase() == test.testType.toLowerCase() ) && (filterBySubject == 'All' || filterBySubject.toLowerCase() == test.subject.subject?.toLowerCase())
            }).map(test => ({...test,classId}) ))
        })
    } ,[testType,filterBySubject,dateSearch,testState])

    return [tests]
}