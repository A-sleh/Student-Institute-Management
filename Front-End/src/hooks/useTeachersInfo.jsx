
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useTeachersInfo(successDeleteTeacher) {

    const [teachers,setTeachers] = useState([])
    const [teachersDetails,setTeachersDetails] = useState([])

    async function getTeachersSubjectsClassesNumber(teachers) {

    return new Promise((resolve) => {
        let teacher_details = []
        teachers.map( async (teacher ) => {
            const { teacherId } = teacher
            const subjectaNumber = await DataServices.ShowAllTeacherSubjects(teacherId)
            let  classesNumber = await DataServices.ShowTeacherClass(teacherId)
            classesNumber = classesNumber.reduce( (sum,teacher) => (sum + teacher.classes.length - (teacher.classes[0] == null))  , 0)

            teacher_details.push({...teacher,subjectaNumber: subjectaNumber.length , classesNumber: classesNumber})
            if(teachers.length == teacher_details.length ) { 
                resolve(teacher_details)
            }
        })
        })
    }
  
    useEffect(() => {
        DataServices.TeacherInformaion().then( teacherDetails => {
            setTeachers(teacherDetails)
        })
    },[successDeleteTeacher])

    useEffect(() => {
        getTeachersSubjectsClassesNumber(teachers).then( teacherDetails => {
            setTeachersDetails(teacherDetails)
        })
    } ,[teachers])

    return [teachersDetails]   
}