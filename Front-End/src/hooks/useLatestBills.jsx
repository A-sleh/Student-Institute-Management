
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useLatestBills(billNumber) {
    
    const [teacherBills,setTeacherBills] = useState([])
    const [studentBills,setStudentBills] = useState([])
    const [externalBills,setExternalBills] = useState([])

    useEffect(() => {
        DataServices.ShowLasteExternalBill(billNumber,'external').then( Bills => {
            setExternalBills(Bills)
        })
        DataServices.ShowLasteTeacherBill(billNumber,'teacher').then( Bills => {
            setTeacherBills(Bills)
        })
        DataServices.ShowLasteStudentsBill(billNumber,'student').then( Bills => {
            setStudentBills(Bills)
        })
    } ,[])


    return [teacherBills,studentBills,externalBills]
}