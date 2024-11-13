
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useSearchParams } from "react-router-dom";
import Title from "../../Global/Title";
import TeacherForm from "../newTeacher/TeacherForm";
import { useState } from "react";
import Notification from "../../Global/Notification";


export default function UpdateTeacher() {

    const [SearchParams,setSearchParams] = useSearchParams() ;
    const encodeData = SearchParams.get('data') ;
    const jsonString = decodeURIComponent(encodeData) ;
    const teacherInfo = JSON.parse(jsonString) ;     

    const [successUpdateTeacher,setSuccessUpdateTeacher] = useState(false) ;

    return (
        <>
            <Notification  title={'Update Teacher Information'} type={'success'} state ={successUpdateTeacher} setState={setSuccessUpdateTeacher} />
            <Title title={window.location.pathname} />
            <TeacherForm  initialSatate={teacherInfo}  type ={'PUT'} setSuccessAction={setSuccessUpdateTeacher}/>
        </>
    )
}