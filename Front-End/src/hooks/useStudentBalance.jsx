
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentBalance(studentId) {

    const [studentBillsBalance,setStudentBillsBalance] = useState({required: 0 , paid : 0})

    useEffect(() => {
        DataServices.ShowStudentBillBalanc(studentId).then( bill => {
            setStudentBillsBalance(bill)
        })
    },[])

    return [studentBillsBalance]
}