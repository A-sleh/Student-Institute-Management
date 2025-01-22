

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTeachersRating(subjectId,...reFetch) {

    const [teachersRating, setTeachersRating] = useState([]); 
    
    useEffect(() => {

        if(subjectId == '' || subjectId == undefined) return 
        DataServices.ShowTeachersRateInCurrentSubject(subjectId).then((res) => {
            setTeachersRating(res)
        })
    }, [subjectId,...reFetch])
    
    return [teachersRating?.rates || []]
}