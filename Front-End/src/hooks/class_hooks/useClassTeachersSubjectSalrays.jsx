

import { useEffect, useState } from "react"
import useClassTeacher from "./useClassTeacher"

export default function useClassTeachersSubjectSalrays(classId,...reFetch) {

    const [teachers] = useClassTeacher(classId,...reFetch)
    const [teachersSubjectSalary,setTeachersSubjectSalary] = useState([])
    
    useEffect(() => {
            const TeachersMaping = teachers.map( teacher => {
                const name = teacher.name + ' ' + teacher.lastName ;
                const teacherSubjectsARRAY = teacher.teacherSubject.map( teacherSubject => {
                    return {
                        name , 
                        teacherSubjectId:teacherSubject.teacherSubjectId ,
                        subject : teacherSubject.subject.subject,
                        salary : teacherSubject.salary
                    }
                })
                return teacherSubjectsARRAY ;
            })
            let TeachersMapingFinal = [] ;
            TeachersMaping.map( teacherSubjects => {
                TeachersMapingFinal = [...TeachersMapingFinal,...teacherSubjects] ;
            })
            setTeachersSubjectSalary(TeachersMapingFinal)
    },[teachers])

    return [teachersSubjectSalary]
}