

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetStudentsInCurrentClass(Class,...reFetch) {

    const [students,setStudents] = useState([])
    
    useEffect(() => {
        DataServices.StudentsInCurrentClass(Class.classId).then(students => {
            const studentsMaping = students.students.map( student => {
                const {lastName,name} = student
                return {
                    ...student ,
                    className: Class.classTitle,
                    full_name : name + ' ' +lastName ,
                }})
                setStudents(studentsMaping)
            })
    },[...reFetch])

    return [students]
}