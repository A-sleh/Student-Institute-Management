/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { TeacherTagsContainer } from "../style/styleTags";
import { useNavigate } from "react-router-dom";
import useClassTeacher from "../../../hooks/class_hooks/useClassTeacher";
import { ClassesDetailsTEXT } from "../../../Data/static/classes/ClassesDetails/ClassesDetailsTEXT";
import {useDispatch, useSelector} from 'react-redux'
import { CLASS_SECTION } from "../../../Redux/actions/type";

export default function TeacherTagsList({classId,classHasNoTeachers}) {

    const {currentLange} = useSelector( state => state.language)
    const { noTeachersWOR} = ClassesDetailsTEXT[currentLange]
    
    const [teachers] = useClassTeacher(classId)
    
    return (
        <>
            {
                classHasNoTeachers ? <span style={{ color: "red", fontWeight: "400", fontSize: "16px" }}> {noTeachersWOR} </span> : 
                <div style={{display: 'flex' , flexWrap: 'wrap' , gap: '10px' , backgroundColor: '#f3f1f1d7' , padding: '10px'}}>
                    { teachers?.map((teacher,index) => <TeacherTag teacher={teacher} key={index} classId={classId}/> )  }
                </div>
            }
        </>
    )
}

function TeacherTag({teacher,classId}) {

    const { teacherId, name, lastName  ,teacherSubject} = teacher;
    const gotoTeacherPage = useNavigate() ;
    const determainParentClass = useDispatch()

    function handleTeacherTageClicked(teacherId) {
        determainParentClass({
            type: CLASS_SECTION ,
            payload: classId
        })
        gotoTeacherPage(`/TeacherInformation/${teacherId}`)
    }

    return (
        <TeacherTagsContainer key={teacherId}  onClick={() =>handleTeacherTageClicked(teacherId)} >
            <span >{teacherSubject?.map( suject => suject.subject.subject + ' / ')}</span> 
            <span>{name} {lastName}</span>
        </TeacherTagsContainer>
    )
}