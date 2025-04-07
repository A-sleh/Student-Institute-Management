
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useLatestBills(billNumber) {
    
    const [teacherBills,setTeacherBills] = useState([])
    const [studentBills,setStudentBills] = useState([])
    const [externalBills,setExternalBills] = useState([])

    useEffect(() => {
        DataServices.ShowLasteExternalBill('external',billNumber,1).then( Bills => {
            setExternalBills(Bills?.data)
        })
        DataServices.ShowLasteTeacherBill('teacher',billNumber,1).then( Bills => {
            setTeacherBills(Bills?.data)
        })
        DataServices.ShowLasteStudentsBill('student',billNumber,1).then( Bills => {
            setStudentBills(Bills?.data)
        })
    } ,[])


    return [teacherBills,studentBills,externalBills]
}