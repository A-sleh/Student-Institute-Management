

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetAllGrade(...reFetch) {

    const [grades,setGrades] = useState([])
    
    useEffect(() => {
        DataServices.ShowAllInstituteGrade().then( grades => setGrades(grades) ) 
    },[...reFetch])

    return [grades]
}