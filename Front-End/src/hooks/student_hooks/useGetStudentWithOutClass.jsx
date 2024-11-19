

import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetStudentWithOutClass(...reFetch) {

    const [studentDetails, setStudentDetails] = useState([]); 
    
    useEffect(() => {
        DataServices.StudentsInformaion().then((students) => {
            const filterStudents = students.filter((student) => {
                return student.class == null || student.class?.classId == null
            }).map((student) => {
                const { name, lastName } = student;
                return {
                    ...student,
                    className: student.class?.title,
                    full_name: name + " " + lastName,
                }
            })
            setStudentDetails(filterStudents);
        });
    }, [...reFetch])
    
    return [studentDetails]
}