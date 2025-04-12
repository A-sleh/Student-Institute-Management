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
import { TeachersDetailsTEXT } from "../../../Data/static/teachers/teachersDetails/TeachersDetailsTEXT";
import { useState } from "react";
import Notification from "../../Global/Notification";
import { errorActionLogic } from "../../shared/logic/logic";

export default function TeacherTagsList({classId,classHasNoTeachers}) {

    const {currentLange} = useSelector( state => state.language)
    const {unAutherizedMES} = TeachersDetailsTEXT[currentLange]
    const { noTeachersWOR} = ClassesDetailsTEXT[currentLange]
    const [unAutherized,setUnAutherized] = useState(false)
    
    const [teachers] = useClassTeacher(classId)
    
    return (
        <>
            <Notification title={unAutherizedMES} type={'error'} state ={unAutherized} setState={setUnAutherized} />
            {
                classHasNoTeachers ? <span style={{ color: "red", fontWeight: "400", fontSize: "16px" }}> {noTeachersWOR} </span> : 
                <div style={{display: 'flex' , flexWrap: 'wrap' , gap: '10px' , backgroundColor: '#f3f1f1d7' , padding: '10px'}}>
                    { teachers?.map((teacher,index) => <TeacherTag teacher={teacher} key={index} classId={classId} setUnAutherized={setUnAutherized}/> )  }
                </div>
            }
        </>
    )
}

function TeacherTag({teacher,classId,setUnAutherized}) {

    const {isAdmin} = useSelector( state => state.admin)
    const { teacherId, name, lastName  ,teacherSubject} = teacher;
    const gotoTeacherPage = useNavigate() ;
    const determainParentClass = useDispatch()

    function handleTeacherTageClicked(teacherId) {
        if(!isAdmin) {
            errorActionLogic(setUnAutherized)
            return 
        }
        
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