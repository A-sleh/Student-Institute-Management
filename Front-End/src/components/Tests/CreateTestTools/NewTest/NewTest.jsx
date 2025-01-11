/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useState } from "react";
import CreateTestForm from "./CreateTestForm";
import ShowInputCard from "../../../shared/ShowInputCard";
import { useSelector } from "react-redux";
import { NewTestTEXT } from "../../../../Data/static/test/CreateTestTools/NewTestTEXT";

export default function NewTest() {

    const {currentLange} = useSelector( state => state.language)
    const { grade , subjectsTitle ,testDate ,testTypeTitle ,testDetails } = NewTestTEXT[currentLange]
    const initailState = {
        report : null,
        subject : {
            subjectId : '',
            subject: '',
            grade: '',
            gradeId: 0
        },
        testType : '' ,
        date : '' ,
        title : '' ,
        correctionDate : null
    }
    const [form,setForm] = useState(initailState)
    
    return (
        <CreateTestForm form={form} setForm={setForm} initailState={initailState} >
            <ShowInputCard iconPath={"bi bi-info-circle icon"} >
                <main>
                    <h3>{grade} : <span>{form.subject.grade}</span> </h3>
                    <h3>{subjectsTitle} : <span>{form.subject.subject}</span> </h3>
                    <h3>{testTypeTitle} : <span>{form.testType}</span> </h3>
                    <h3>{testDate} : <span>{form.date}</span> </h3>
                    <h3>{testDetails} : <span>{form.title}</span> </h3>
                </main>
            </ShowInputCard>
        </CreateTestForm>
    )
}