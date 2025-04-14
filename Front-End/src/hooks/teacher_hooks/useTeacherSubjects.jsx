
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useTeacherSubjects(teacherId,...reFetch) {

    const [teacherSubjects , setTeacherSubjects] = useState([]) ; 

    useEffect(() => {

        if(teacherId == '' || teacherId == undefined) return 
        DataServices.ShowAllTeacherSubjects(teacherId).then( subjects => {
            setTeacherSubjects(subjects) ; 
        })
    } , [...reFetch,teacherId])


    return [teacherSubjects]   
}