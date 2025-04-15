
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export function unValidVariable(...variable) {
    return variable.reduce((pc,cv) => {
        return pc + (cv == '' || cv == undefined)
    } , 0 )
}

export default function useGetStudentAbsence(classId,absenceDate) {

    const [studentsId,setStudentsId] = useState([])

    useEffect(() => {

        if(unValidVariable(classId,absenceDate)) return 
        DataServices.showStudentsAbcenceInCurrentClass(classId,absenceDate).then( studentsId => {
            setStudentsId(studentsId)
        })
    },[absenceDate])

    return [studentsId]
}