
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useTeacherInfo(teacherId,...reFetch) {

    const [teacherDetails,setTeacherDetails] = useState({}) ;

    useEffect(() => {

        if(teacherId == '' || teacherId == undefined) return 
        DataServices.TeacherInformaion(teacherId).then( async teacherInfo => {
            const teacherClasses = await DataServices.ShowTeacherClass(teacherId).then( classes => {
                let classesNumber = 0 ;
                classes.map( Class => {
                  classesNumber += Class.classes.length - ( Class.classes[0] == null )
                })
                return classesNumber
            })
            const totalSalary = await DataServices.ShowTeacherBillBalanc(teacherId).then( salary => salary )
            setTeacherDetails({...teacherInfo,teacherClasses:teacherClasses,totalSalary:totalSalary}) ; 
        })
    }, [...reFetch])

    return [teacherDetails]   
}