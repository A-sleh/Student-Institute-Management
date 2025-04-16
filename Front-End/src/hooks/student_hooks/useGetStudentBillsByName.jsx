import { useEffect, useState } from "react"
import { getAllStudentsBills } from "./useGetStudentBills";
import useGetStudentsByName from "./useGetStudentsByName";

export default function useGetStudentBillsByName(searchKey,pass) {

    const [studentInfo,notFoundMes,setNotFoundMes] = useGetStudentsByName(searchKey,pass)
    const [studentBills,setStudentsBills] = useState([])

    useEffect(() => {

        if(studentInfo?.length === 0 && studentBills.length != 0 ) {
            setStudentsBills([])
            return 
        }

        if(studentInfo?.length === 0 ) 
            return 

        getAllStudentsBills(studentInfo).then( studentsBills => {
            setStudentsBills(studentsBills)
        })

    },[studentInfo])
    

    return [studentBills,notFoundMes,setNotFoundMes]
}