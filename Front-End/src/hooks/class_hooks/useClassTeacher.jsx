

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useClassTeacher(classId,...reFetch) {

    const [teachers,setTeachers] = useState([])
    
    useEffect(() => {
        
        if(classId == '' || classId == undefined ) return 
        DataServices.ShowTeacherInSideClass(classId).then(teachers => {
            const teachersDetailsMaping = teachers.map( teacher => {
                const {lastName,name} = teacher
                return {
                    ...teacher ,
                    full_name : name + ' ' +lastName ,
                }})
                setTeachers(teachersDetailsMaping)
            })
    },[...reFetch])
    return [teachers]
}