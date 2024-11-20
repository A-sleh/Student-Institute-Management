
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetStudentBills(changeClass = 'All') {

    const [students,setStudents] = useState([]) 
    const [studentsBills,setStudentsBills] = useState([])

    async function getAllStudentsBills(students) {
        let studnetsDetails = []
        return new Promise(resolve => {
                    students.map( async (student,index) => {
                    const studentBills = await DataServices.ShowStudentBillBalanc(student.studentId)
                    studnetsDetails = await [...studnetsDetails,{...student ,...studentBills}]
                    if(studnetsDetails.length == students.length ) {
                        resolve(studnetsDetails)
                    }
                })
        })
    }

    useEffect(() => {
        DataServices.StudentsInformaion().then( students => {
            setStudents(students.filter(student => {
                return (changeClass == student.class.classId || changeClass == 'All')
            }).map(student => {
                const {studentId,name,lastName} = student
                return {studentId,name,lastName}
            }))
        })
    }, [changeClass])

    useEffect(() => {
        getAllStudentsBills(students).then( result => {
            setStudentsBills(result)
        })
    },[students])

    return [studentsBills]
}