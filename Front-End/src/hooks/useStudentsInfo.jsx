
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentsInfo(selectedGrade,limit,page,...reFetch) {

    const [studentInfo, setstudentInfo] = useState([]);

    useEffect(() => {
        DataServices.StudentsInformaion('',limit,page).then((StudentsInfo) => {
            const mapingStudents = StudentsInfo.map((student) => {
                const { name, lastName } = student;
                return {
                    ...student,
                    className: student.class?.title,
                    full_name: name + " " + lastName,
                };
            })
            setstudentInfo([...studentInfo,...mapingStudents]);
        });
    },[...reFetch,page,limit]);

    return [studentInfo]
}