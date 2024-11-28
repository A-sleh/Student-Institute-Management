

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGradeCount(type) {

    const [gradeCount, setGradeCount] = useState([]); 
    
    useEffect(() => {
        DataServices.ShowGradeCountByType( type == 'subjects' ,type ==  'students' ,type ==  'classes')
        .then( res => {
            setGradeCount(res)
        })
    }, [type])
    
    return [gradeCount]
}