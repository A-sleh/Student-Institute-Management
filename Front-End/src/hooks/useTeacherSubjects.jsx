
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useTeacherSubjects(teacherId,...reFetch) {

    const [teacherSubjects , setTeacherSubjects] = useState([]) ; 

    useEffect(() => {
        DataServices.ShowAllTeacherSubjects(teacherId).then( subjects => {
            setTeacherSubjects(subjects) ; 
        })
    } , [...reFetch])


    return [teacherSubjects]   
}