
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useClassGrade() {

    const [classesGrade,setClassesGrade] = useState([]) ;

    useEffect(() => {
        DataServices.ShowAllSubject().then( subjects => {
            let gradesObj = new Set() , gradeArray = [] ;

            subjects.map( subjects => {
                gradesObj.add(subjects.grade)
            })
            gradesObj.forEach(itemt => {
                gradeArray.push(itemt)
            })
            setClassesGrade(gradeArray)
        })
    } , []) 

    return [classesGrade]
}