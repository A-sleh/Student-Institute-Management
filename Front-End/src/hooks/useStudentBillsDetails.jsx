
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentBillsDetails(studentId) {

    const [studentBills,setStudentBills] = useState([])

    useEffect(() => {
        DataServices.ShowStudentBillsDetails(studentId).then( bills => {
            setStudentBills(bills)
        })
    } , [])

    return [studentBills]
}