
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetStudentBills(changeClass = 'All',limit,page,setPage) {

    const [students,setStudents] = useState({}) 
    const [studentsBills,setStudentsBills] = useState({})

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
        const filteringByClass = changeClass != 'All' ? `&classId=${changeClass}`  : ''
        DataServices.StudentsInformaion('',filteringByClass,limit,page).then( students => {
            if(students.students.length == 0 ) {
                setStudentsBills([])
                return
            }else  setStudents({...students,students:students.students.map(student => {
                const {studentId,name,lastName} = student
                return {studentId,name,lastName}
            })})
        })
    }, [changeClass,page])

    
    useEffect(() => {
        getAllStudentsBills(students.students).then( result => {
            setStudentsBills({...students,students: result})
        })
    },[students])

    useEffect(() => {
        if(setPage)
            setPage(1)
    },[changeClass])
    
    return  studentsBills
}