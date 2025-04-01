
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTeachersBills(limit,page,setPage) {
    
    const [teachers,setTeachers] = useState([]) 
    const [teachersBills,setTeachersBills] = useState([])

    async function getAllTeachersBills(teachers) {
        let teachersDetails = []
        return new Promise(resolve => {
                    teachers.map( async (teacher) => {

                    const teacherBills = await DataServices.ShowTeacherBillBalanc(teacher.teacherId)
                    teachersDetails.push({...teacher ,...teacherBills})

                    if(teachersDetails.length == teachers.length ) {
                        resolve(teachersDetails)
                    }
                })
        })
    }

    useEffect(() => {
        DataServices.TeacherInformaion('',limit,page).then( teachers  => {
            setTeachers({...teachers,teachers:teachers.teachers.map( teacher => {
                return {
                    teacherId : teacher.teacherId , 
                    name : teacher.name , 
                    lastName : teacher.lastName, 
                }
            })})
        })
    }, [page])

    useEffect(() => {
        getAllTeachersBills(teachers.teachers).then( result => {
            
            setTeachersBills({...teachers,teachers: result})
        })
    },[teachers])

    return teachersBills
}