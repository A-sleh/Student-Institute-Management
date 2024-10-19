import { useState } from "react";
import CreateTestForm from "./CreateTestForm";
import TestCard from "./TsetCard";

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
        <div style={{display: 'flex' , gap: '10px'}}>
            <CreateTestForm form={form} setForm={setForm} initailState={initailState} />
            <TestCard form={form} />
        </div>
    )
}