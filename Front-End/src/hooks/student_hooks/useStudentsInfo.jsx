
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentsInfo(selectedGrade,setPage,limit,page,...reFetch) {

    const [studentInfo, setstudentInfo] = useState([]);
console.log(selectedGrade)
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
    },[...reFetch,selectedGrade,page]);

    useEffect(() => {
        if(setPage)
            setPage(1)
    },[selectedGrade])

    return [studentInfo]
}