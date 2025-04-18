
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useRef, useState } from "react"

export async function getTeachersSubjectsClassesNumber(teachers) {
    return new Promise((resolve) => {
        let teacher_details = []
        
        teachers?.teachers?.map( async (teacher ) => {
            const { teacherId } = teacher
            const subjectaNumber = await DataServices.ShowAllTeacherSubjects(teacherId)
            let  classesNumber = await DataServices.ShowTeacherClass(teacherId)
            classesNumber = classesNumber.reduce( (sum,teacher) => (sum + teacher.classes.length - (teacher.classes[0] == null))  , 0)

            teacher_details.push({...teacher,subNO: subjectaNumber.length , classNO: classesNumber})
            if(teachers.teachers.length == teacher_details.length ) { 
                resolve({...teachers,teachers:teacher_details})
            }
        })
    })
}

export default function useTeachersInfo(limit,{page,setPage},...reFetch) {

    const [teachers,setTeachers] = useState([])
    const [teachersDetails,setTeachersDetails] = useState([])
  
    useEffect(() => {
        DataServices.TeacherInformaion('',limit,page).then( teacherDetails => {
            // this case in paginated table when the user delete the last item from last page in this case we should fetch data from previous page 
            if(teacherDetails?.teachers?.length == 0 && page != 1 ) {
                setPage(page - 1 )
                return 
            }
            setTeachers(teacherDetails)
        })
    },[page,...reFetch])

    useEffect(() => {
        getTeachersSubjectsClassesNumber(teachers).then( teacherDetails => {
            setTeachersDetails(teacherDetails)
        })
    } ,[teachers])

    return [teachersDetails]   
}