
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useRef, useState } from "react"

export default function useStudentsInfo({selectedGrade,setSelectedClass},setPage,limit,page,...reFetch) {

    const [studentInfo, setstudentInfo] = useState([]);
    const skipFirstRender = useRef(0)

    useEffect(() => {
        const gradeId = selectedGrade ? `&gradeId=${selectedGrade?.gradeId}` : ''
        DataServices.StudentsInformaion('',gradeId,limit,page).then((StudentsInfo) => {

            // this case in paginated table when the user delete the last item from last page in this case we should fetch data from previous page 
            if(StudentsInfo.students?.length == 0 && page != 1 ) {
                setPage( page - 1 ) 
                return 
            }
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
        if(skipFirstRender.current++) {
            setPage(1)
            setSelectedClass('all')
        }
    },[selectedGrade])

    return [studentInfo]
}