

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetAllTeachers(subjectId,...reFetch) {

    const [teachers, setTeachers] = useState([]); 
    
    useEffect(() => {
        DataServices.AllTeacherInformaion().then( teachers  => {
            setTeachers(teachers.teachers.map( teacher => {
                return {
                    teacherId : teacher.teacherId , 
                    name : teacher.name , 
                    lastName : teacher.lastName, 
                    full_name: teacher.name + ' ' + teacher.lastName
                }
            }))
        })
    }, [])
    
    return [teachers|| []]
}