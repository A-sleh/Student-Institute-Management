
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useStudentsInfo(selectedGrade,...reFetch) {

    const [studentInfo, setstudentInfo] = useState([]);

    useEffect(() => {
        DataServices.StudentsInformaion().then((StudentsInfo) => {
            setstudentInfo(
            StudentsInfo.map((student) => {
                const { name, lastName } = student;
                return {
                ...student,
                className: student.class?.title,
                full_name: name + " " + lastName,
                };
            })
            );
        });
    },[...reFetch]);

    return [studentInfo]
}