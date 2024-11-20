

import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useClassTests(classId,showUnCorrectionTests,reFreach) {

    const [tests,setTests] = useState({})

    function disjoinTestIntoTypes(tests) {
        return Object.groupBy(tests,({testType})=> {
            return testType.toLowerCase()
        })
    }

    useEffect(() => {
        DataServices.ShowCurrentClassTests(classId,showUnCorrectionTests).then(tests => {
            setTests(disjoinTestIntoTypes(tests))
        })
    } ,[reFreach])

    return [tests?.quiz || [], tests?.exam || []]
}