/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useState } from "react";
import CreateTestForm from "./CreateTestForm";
import ShowInputCard from "../../../shared/ShowInputCard";

export default function NewTest() {

    const initailState = {
        report : null,
        subject : {
            subjectId : '',
            subject: '',
            grade: ''
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
                    <h3>Grade : <span>{form.subject.grade}</span> </h3>
                    <h3>Subject : <span>{form.subject.subject}</span> </h3>
                    <h3>Test Type : <span>{form.testType}</span> </h3>
                    <h3>Date : <span>{form.date}</span> </h3>
                    <h3>Title : <span>{form.title}</span> </h3>
                </main>
            </ShowInputCard>
        </CreateTestForm>
    )
}