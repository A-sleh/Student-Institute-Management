
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useClass(classId) {

    const [Class,setClass] = useState([])

    useEffect(() => {
        DataServices.showCalsses(classId).then( Class => {
            setClass(Class)
        })
    } ,[])

    return [Class]
}