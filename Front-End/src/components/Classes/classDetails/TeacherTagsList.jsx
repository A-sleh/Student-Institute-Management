/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { TeacherTagsContainer } from "../style/styleTags";
import { useNavigate } from "react-router-dom";
import useClassTeacher from "../../../hooks/class_hooks/useClassTeacher";
import { ClassesDetailsTEXT } from "../../../Data/static/classes/ClassesDetails/ClassesDetailsTEXT";
import {useSelector} from 'react-redux'

export default function TeacherTagsList({classId,classHasNoTeachers}) {

    const {currentLange} = useSelector( state => state.language)
    const { noTeachersWOR} = ClassesDetailsTEXT[currentLange]
    
    const [teachers] = useClassTeacher(classId)
    
    return (
        <>
            {
                classHasNoTeachers ? <span style={{ color: "red", fontWeight: "400", fontSize: "16px" }}> {noTeachersWOR} </span> : 
                <div style={{display: 'flex' , flexWrap: 'wrap' , gap: '10px' , backgroundColor: '#f3f1f1d7' , padding: '10px'}}>
                    { teachers?.map((teacher,index) => <TeacherTag teacher={teacher} key={index}/> )  }
                </div>
            }
        </>
    )
}

function TeacherTag({teacher}) {

    const gotoTeacherPage = useNavigate() ;
    const { teacherId, name, lastName  ,teacherSubject} = teacher;

    return (
        <TeacherTagsContainer key={teacherId}  onClick={() =>gotoTeacherPage(`/TeacherInformation/${teacherId}`)} >
            <span >{teacherSubject?.map( suject => suject.subject.subject + ' / ')}</span> 
            <span>{name} {lastName}</span>
        </TeacherTagsContainer>
    )
}