
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentsInfo(selectedGrade,setPage,limit,page,...reFetch) {

    const [studentInfo, setstudentInfo] = useState([]);
    const [paginationDetails,setPaginationDetails] = useState(0)

    useEffect(() => {
        DataServices.StudentsInformaion('',selectedGrade?.gradeId,limit,1).then((StudentsInfo) => {
            const mapingStudents = StudentsInfo.students.map((student) => {
                const { name, lastName } = student;
                return {
                    ...student,
                    className: student.class?.title,
                    full_name: name + " " + lastName,
                };
            })
            setPaginationDetails(StudentsInfo.totalPages)
            setstudentInfo(mapingStudents);
            setPage(1)
        });
    },[...reFetch,selectedGrade]);

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
            setstudentInfo([...studentInfo,...mapingStudents]);
        });
    },[page])

    return [studentInfo,paginationDetails]
}