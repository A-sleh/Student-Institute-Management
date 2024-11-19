
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTeacherBills(teacherId,...reFetch) {

    const [teacherBills,setTeacherBills] = useState([]) ; 

    useEffect(() => {
        DataServices.ShowTeacherBillsDetails(teacherId).then( Bills => {
            setTeacherBills(Bills)
        })
    } ,[...reFetch])

    return [teacherBills]
}