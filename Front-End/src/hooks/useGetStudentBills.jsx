
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"


export default function useGetStudentBills() {
    
    const [students,setStudents] = useState([]) 
    const [studentsBills,setStudentsBills] = useState([])

    useEffect(() => {
        DataServices.StudentsInformaion().then( students => {
            setStudents(students)
        })
        
    }, [])

    
}