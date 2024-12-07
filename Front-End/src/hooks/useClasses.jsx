
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useClasses(selectedGrade,fromShowPage = false,...reFetch) {

    // fromShowPage = false => mean i use this hook in reciving student mark page to use it in chose the corret next url
    // fromShowPage = true => mean i use this hook in show student mark page to use it in chose the corret next url
    const [classes,setClasses] = useState([])

    useEffect(() => {
        DataServices.showCalsses().then( classes => {
            setClasses(
                classes.filter( Class => {
                    return selectedGrade != '' && Class.grade.toLowerCase() == selectedGrade?.toLowerCase() 
                }).map( Class => ({...Class,fullName: Class.title,fromShowPage:fromShowPage}))
            )
        })
    } ,[selectedGrade,...reFetch])

    return [classes,setClasses]
}