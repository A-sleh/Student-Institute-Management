
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useState } from "react";
import Title from "../../Global/Title";
import TeacherForm from "./TeacherForm";
import Notification from "../../Global/Notification";

export default function NewTeacher() {

    const initialSatate = { name : '' , lastName : '' , phone : ''}
    const [successAddTeacher,setSuccessAddTeacher] = useState(false) ;

    return(
        <>
            <Notification  title={'Add New Teacher'} type={'success'} state ={successAddTeacher} setState={setSuccessAddTeacher}/>
            <Title title={window.location.pathname} />
            <TeacherForm initialSatate={initialSatate} requestType={'POST'} setSuccessAction={setSuccessAddTeacher}/>
        </>
    )
}