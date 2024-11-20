import { useEffect, useState } from "react";
import DataServices from "../Data/dynamic/DataServices";

export default function useTeacherSubjectTeachesIt(teacherId,gradeFilter,usedSubjectHidden,...reFetch) {


    function filterSubject(subject) {
        const { grade ,  isUsed } = subject
        return (gradeFilter == 'All' || (gradeFilter != 'All' && grade.toLowerCase() == gradeFilter.toLowerCase())) && !(isUsed && usedSubjectHidden)
    }

    const [allsubjects,setAllsubjects] = useState([]) ;
    const [teacherDetails,setTeacherDetails] = useState({}) ;
    
    useEffect(()=> {
        const useedSub = {}
        DataServices.TeacherInformaion(teacherId).then( teacherInfo => {
            teacherInfo.teacherSubjects.map(subject => {
                useedSub[subject.subject.subjectId] = true ;
            }) 
            setTeacherDetails(teacherInfo)
            DataServices.ShowAllSubject().then( subjects => {
                const subjectsMaping = subjects.map( subject => {
                    return {... subject , isUsed : useedSub[subject.subjectId] == true ? true : false }
                }).filter( subject => {
                    return filterSubject(subject)
                }) 
                setAllsubjects(subjectsMaping)
            })
        })
    } ,[...reFetch,gradeFilter,usedSubjectHidden])

    return [teacherDetails,allsubjects]
}