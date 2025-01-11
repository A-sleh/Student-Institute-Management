import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { useState } from "react";
import SimpleHorizontalBar from "../charts/SimpleHorizontalBar";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import useGradeCount from "../../../hooks/statistics_hooks/useGradeCount";
import { useSelector } from 'react-redux'
import { ARABIC } from "../../../Redux/actions/type";

export default function ClassesStudentsTeachersCount() {
 
    const {currentLange} = useSelector( state => state.language)
    const [grades] = useGetAllGrade()
    const [selectedGrade,setSelectedGrade] = useState(grades[0]?.grade || 'bachelor')
    const [gradeCount] = useGradeCount(selectedGrade)
    
    const data = {
        data :  [
                { type: currentLange == ARABIC? "الأساتذه":  "Teachers", value: gradeCount[0]?.TeachersNO },
                { type: currentLange == ARABIC? "الطلاب": "Students", value: gradeCount[0]?.StudentsNO },
                { type: currentLange == ARABIC? "الشعب": "Classes", value: gradeCount[0]?.ClassesNO }
        ],
        title: (currentLange == ARABIC? "  الأحصائيات في الفئه ": 'The statistics in ') + selectedGrade
    }

    return (
        <BackgroundLayoutStyle style={{flex: '2'}}>
            <SelectorStyle value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                {/* <option value={''} ></option> */}
                {grades.map( (grade,index) => (<option key={index} value={grade.grade}>{grade.grade}</option>) )}
            </SelectorStyle>
            <SimpleHorizontalBar data={data}/>
        </BackgroundLayoutStyle>
    );
}
