
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTeachersBills() {
    
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
        DataServices.TeacherInformaion().then( teachers  => {
            setTeachers(teachers.map( teacher => {
                return {
                    teacherId : teacher.teacherId , 
                    name : teacher.name , 
                    lastName : teacher.lastName, 
                }
            }))
        })
    }, [])

    useEffect(() => {
        getAllTeachersBills(teachers).then( result => {
            setTeachersBills(result)
        })
    },[teachers])

    return [teachersBills]
}