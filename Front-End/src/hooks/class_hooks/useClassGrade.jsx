
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useClassGrade(gradeId,...reFrech) {

    const [classesGrade,setClassesGrade] = useState([]) ;

    useEffect(() => {

        if(gradeId == null || gradeId == undefined ) return 
        DataServices.ShowClassWithSpecificGrade(gradeId).then( classes => {
            setClassesGrade(classes)
        })
    } , [gradeId,...reFrech]) 

    return [classesGrade]
}