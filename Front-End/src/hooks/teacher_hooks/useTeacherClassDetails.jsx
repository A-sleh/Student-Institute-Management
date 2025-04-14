
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useTeacherClassDetails(teacherId,...reFetch) {

    const [classes,setClasses] = useState([]) ;

    useEffect(() => {

        if(teacherId == '' || teacherId == undefined) return 
        DataServices.ShowTeacherClass(teacherId).then( subjects => {
            let  classesMaping= [] ;
            subjects.map((subjects) => {
                    if(subjects.classes[0] == null ) 
                        return

                    const { subject } = subjects.subject ;
                    const classMaping = subjects.classes.map( Class => {
                    return {...Class , subject : subject , teacherSubjectId : subjects.teacherSubjectId }
                })
              classesMaping = [...classesMaping,...classMaping ];
            })
            setClasses(classesMaping)
        })
    } , [...reFetch,teacherId])

    return [classes]
}