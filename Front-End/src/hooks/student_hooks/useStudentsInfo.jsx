
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useRef, useState } from "react"

export default function useStudentsInfo(selectedGrade,setPage,limit,page,...reFetch) {

    const [studentInfo, setstudentInfo] = useState([]);
    const skipFirstRender = useRef(0)

    useEffect(() => {
        const gradeId = selectedGrade ? `&gradeId=${selectedGrade?.gradeId}` : ''
        DataServices.StudentsInformaion('',gradeId,limit,page).then((StudentsInfo) => {
            const mapingStudents = StudentsInfo.students.map((student) => {
                const { name, lastName } = student;
                return {
                    ...student,
                    className: student.class?.title,
                    full_name: name + " " + lastName,
                };
            })
            setstudentInfo({...StudentsInfo,students : mapingStudents});
        });
    },[selectedGrade,page,...reFetch]);

    useEffect(() => {
        if(setPage && skipFirstRender.current++)
            setPage(1)
    },[selectedGrade])

    return [studentInfo]
}