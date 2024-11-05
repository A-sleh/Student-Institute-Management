
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useClasses(selectedGrade) {

    const [classes,setClasses] = useState([])

    useEffect(() => {
        DataServices.showCalsses().then( classes => {
            setClasses(
                classes.filter( Class => {
                    return Class.grade.toLowerCase() == selectedGrade.toLowerCase()
                })
            )
        })
    } ,[selectedGrade])

    return [classes]
}