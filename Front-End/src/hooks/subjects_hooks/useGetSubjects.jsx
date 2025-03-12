
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetSubjects(subjectGrade,...reFetch) {

    const [subjects,setSubjects] = useState([]) ; 

    useEffect(() => {
        DataServices.ShowAllSubject().then( subjects => {
            setSubjects(
                subjects.filter( subject => {
                    return subject.grade?.toLowerCase() == subjectGrade?.toLowerCase() ;
                })
            )
        })
    },[subjectGrade,...reFetch])

    return [subjects]
}