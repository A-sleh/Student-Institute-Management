
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useRef, useState } from "react"

export default function useStudentsInfo(selectedGrade,setPage,limit,page,...reFetch) {

    const [studentInfo, setstudentInfo] = useState([]);

    useEffect(() => {
        DataServices.StudentsInformaion('',selectedGrade?.gradeId,limit,page).then((StudentsInfo) => {
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
        setPage(1)
    },[selectedGrade])

    return [studentInfo]
}