import { useEffect, useState } from "react"
import DataServices from "../../Data/dynamic/DataServices"
import { useNavigate } from "react-router-dom";

export default function ClassTeacher({classId = 1}) {

    const [teachers,setTeachers] = useState([])
    const gotoTeacherPage = useNavigate() ;
    useEffect(() => {
        DataServices.ShowTeacherInSideClassL(classId).then(teachers => {
            setTeachers(teachers)
        })
    },[])

    function handleTeacherClicked(teacherId) {
        gotoTeacherPage(`/TeacherInformation/${teacherId}`)
    }

    return(
        <div style={{display: 'flex' , gap: '8px'}}>
            {teachers.map((teacher) => {
                if (teacher == null) return; // if there are no stuent
                const { teacherId, name, lastName } = teacher;
                return (
                  <span
                    key={teacherId}
                    style={{
                        padding: '4px 15px' ,
                        fontSize: '14px' ,
                        borderRadius: '5px' ,
                        fontWeight: '400' ,
                        cursor: 'pointer', 
                        backgroundColor: '#ffffff'
                    }}
                    onClick={() => {
                      handleTeacherClicked(teacherId);
                    }}
                  >
                    {name} {lastName}
                  </span>
                );
            })}
        </div>
    )
}
