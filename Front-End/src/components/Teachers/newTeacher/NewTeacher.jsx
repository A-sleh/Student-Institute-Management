
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useState } from "react";
import Title from "../../Global/Title";
import TeacherForm from "./TeacherForm";
import Notification from "../../Global/Notification";
import { useSelector } from "react-redux";
import { NewTeacherTEXT } from "../../../Data/static/teachers/NewTeacher/NewTeacherTEXT";

export default function NewTeacher() {

    const {currentLange} = useSelector( state => state.language)
    const {successAddTeacherMES} = NewTeacherTEXT[currentLange]
    const initialSatate = { name : '' , lastName : '' , phone : ''}
    const [successAddTeacher,setSuccessAddTeacher] = useState(false) ;

    return(
        <>
            <Notification  title={successAddTeacherMES} type={'success'} state ={successAddTeacher} setState={setSuccessAddTeacher}/>
            <Title title={window.location.pathname} />
            <TeacherForm initialSatate={initialSatate} requestType={'POST'} setSuccessAction={setSuccessAddTeacher}/>
        </>
    )
}