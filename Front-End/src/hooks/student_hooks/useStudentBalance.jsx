
import DataServices from "../../Data/dynamic/DataServices"
import { useDebugValue, useEffect, useState } from "react"

export default function useStudentBalance(studentId) {

    const [studentBillsBalance,setStudentBillsBalance] = useState({required: 0 , paid : 0})

    useEffect(() => {

        if(studentId == '' || studentId == undefined ) return 
        DataServices.ShowStudentBillBalanc(studentId).then( bill => {
            setStudentBillsBalance(bill)
        })
    },[])

    return [studentBillsBalance]
}