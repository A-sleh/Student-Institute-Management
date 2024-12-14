
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"
import {useQuery} from 'react-query'

export default function useTeachersInfo(successDeleteTeacher) {

    const [teachers,setTeachers] = useState([])
    const [teachersDetails,setTeachersDetails] = useState([])

    // async function getTeachersSubjectsClassesNumber(teachers) {

    // return new Promise((resolve) => {
    //     let teacher_details = []
    //     teachers.map( async (teacher ) => {
    //         const { teacherId } = teacher
    //         const subjectaNumber = await DataServices.ShowAllTeacherSubjects(teacherId)
    //         let  classesNumber = await DataServices.ShowTeacherClass(teacherId)
    //         classesNumber = classesNumber.reduce( (sum,teacher) => (sum + teacher.classes.length - (teacher.classes[0] == null))  , 0)

    //         teacher_details.push({...teacher,subjectaNumber: subjectaNumber.length , classesNumber: classesNumber})
    //         if(teachers.length == teacher_details.length ) { 
    //             resolve(teacher_details)
    //         }
    //     })
    //     })
    // }
  
    // useEffect(() => {
    //     DataServices.TeacherInformaion().then( teacherDetails => {
    //         setTeachers(teacherDetails)
    //     })
    // },[successDeleteTeacher])

    // useEffect(() => {
    //     getTeachersSubjectsClassesNumber(teachers).then( teacherDetails => {
    //         setTeachersDetails(teacherDetails)
    //     })
    // } ,[teachers])

    

    const { data ,isLoading } = useQuery('teacher' , ()=>DataServices.TeacherInformaion() , {
        select:  async (data) => {
            return await data.data.map( async teacher => {
                const { teacherId } = teacher
                let  subjectaNumber1 = await DataServices.ShowAllTeacherSubjects(teacherId)

                let  classesNumber1 = await DataServices.ShowTeacherClass(teacherId)
                let   subjectaNumber = await subjectaNumber1
                let   classesNumber = await classesNumber1

                // classesNumber = classesNumber.reduce( (sum,teacher) => (sum + teacher.classes.length - (teacher.classes[0] == null))  , 0)
                return await {...teacher,subjectaNumber: subjectaNumber.length , classesNumber: classesNumber}
            })
        }
    } )

    if(!isLoading)data.then( data1 => console.log(data1))

    return [teachersDetails]   
}