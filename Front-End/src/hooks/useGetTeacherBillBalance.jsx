
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTeacherBillBalance(teacherId) {

    const [teacherSalary,setTeacherSalary] = useState({})
    useEffect(() => {
        DataServices.ShowTeacherBillBalanc(teacherId).then( salary => {
            setTeacherSalary(salary)
        })
    }, [])

    return [teacherSalary]
}