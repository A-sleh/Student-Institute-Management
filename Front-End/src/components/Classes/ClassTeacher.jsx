import { useEffect, useState } from "react"
import DataServices from "../../Data/dynamic/DataServices"
import { useNavigate } from "react-router-dom";

export default function ClassTeacher({classId }) {

    const [teachers,setTeachers] = useState([])
    const gotoTeacherPage = useNavigate() ;
    useEffect(() => {
        DataServices.ShowTeacherInSideClass(classId).then(teachers => {
            setTeachers(teachers)
        })
    },[])

    console.log(teachers)

    function handleTeacherClicked(teacherId) {
        gotoTeacherPage(`/TeacherInformation/${teacherId}`)
    }

    return(
        <div style={{display: 'flex' , gap: '8px'}}>
            {teachers.map((teacher) => {
              console.log(teacher)
                if (teacher == null) return; // if there are no stuent
                const { teacherId, name, lastName  ,teacherSubjects} = teacher;
                return (
                  <span
                    key={teacherId}
                    className="teacher-tage"
                    onClick={() => {
                      handleTeacherClicked(teacherId);
                    }}
                  >
                    <span >{teacherSubjects.map( suject => suject.subject.subject + ' / ')}</span>
                    <span>{name} {lastName}</span>
                  </span>
                );
            })}
        </div>
    )
}
