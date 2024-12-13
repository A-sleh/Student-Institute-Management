

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGradeCount(filterByGrade) {

    const [gradeCount, setGradeCount] = useState([]); 
    
    useEffect(() => {
        DataServices.ShowGradeCountByType()
        .then( res => {    
            setGradeCount(res.filter(grade => {
                return grade.grade?.toLowerCase() == filterByGrade?.toLowerCase() || filterByGrade == 'All'
            }))
        })
    }, [filterByGrade])
    
    return [gradeCount]
}