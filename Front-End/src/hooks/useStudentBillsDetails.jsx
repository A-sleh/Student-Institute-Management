
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentBillsDetails(studentId,...reFetch) {

    const [studentBills,setStudentBills] = useState([])

    useEffect(() => {
        DataServices.ShowStudentBillsDetails(studentId).then( bills => {
            setStudentBills(bills)
        })
    } , [...reFetch])

    return [studentBills]
}