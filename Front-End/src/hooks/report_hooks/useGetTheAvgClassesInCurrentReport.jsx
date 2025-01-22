

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetTheAvgClassesInCurrentReport(reportId) {

    const [classes,setClasses] = useState([])
    
    useEffect(() => {
        
        if(reportId == '' || reportId == undefined) return 

        DataServices.ShowTheAvgForEachClasseInCurrentReport(reportId).then( students => setClasses(students) ) 
    },[reportId])

    return [classes]
}