
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useClassGrade(gradeId) {

    const [classesGrade,setClassesGrade] = useState([]) ;

    useEffect(() => {

        if(gradeId == null || gradeId == undefined ) return 
        DataServices.ShowClassWithSpecificGrade(gradeId).then( classes => {
            setClassesGrade(classes)
        })
    } , [gradeId]) 

    return [classesGrade]
}