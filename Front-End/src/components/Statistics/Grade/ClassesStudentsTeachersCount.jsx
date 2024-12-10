import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { useState } from "react";
import SimpleHorizontalBar from "../charts/SimpleHorizontalBar";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";

export default function ClassesStudentsTeachersCount() {
 
    const [grades] = useGetAllGrade()
    const [selectedGrade,setSelectedGrade] = useState('')
    const data = {
        data : [
            { type: "Teachers", value: 954 },
            { type: "Students", value: 844 },
            { type: "Classes", value: 699}
        ],
        title: 'The statistics in ' + selectedGrade
    }
    return (
        <BackgroundLayoutStyle style={{flex: '2'}}>
            <SelectorStyle value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                <option value={''} ></option>
                {grades.map( (grade,index) => (<option key={index} value={grade.grade}>{grade.grade}</option>) )}
            </SelectorStyle>
            <SimpleHorizontalBar data={data}/>
        </BackgroundLayoutStyle>
    );
}
