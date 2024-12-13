import { BackgroundLayoutStyle, SelectorStyle} from "../services/style";
import { useState } from "react";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import useGetSubjects from "../../../hooks/useGetSubjects";
import useGetTeachersRating from "../../../hooks/teacher_hooks/useGetTeachersRating";
import SimpleHorizontalBar from "../charts/SimpleHorizontalBar";



export default function TeachersRate() {

    const [grades] = useGetAllGrade()
    const [selectedGrade,setSelectedGrade] = useState('')
    const [subjects] = useGetSubjects(selectedGrade)
    const [selectedSubject,setSelectedSubject] = useState({subjectId: 1 ,subject: 'unknown'})
    const [teachers] = useGetTeachersRating(selectedSubject?.subjectId)


    const data = {
        data : teachers.map( teacher => {            
            return {
                type : teacher?.Name + ' ' + teacher?.LastName ,
                value : Number(teacher.rate)
            }
        }),
        title : 'teachers rate in ' +  selectedSubject?.subject + ' subject',
        color: '#a6ff00b7',
        direction : 'right'
    }
    

    return (
        <BackgroundLayoutStyle style={{flex: '1'}}>
            <div style={{display: 'flex' , gap: '5px' , flexDirection: 'row-reverse'}}>
                <SelectorStyle value={selectedGrade} onChange={(e) =>{ setSelectedGrade(e.target.value)}}>
                    {grades.map( (grade,index) => (<option key={index} value={grade.grade}>{grade.grade}</option>) )}
                </SelectorStyle>
                <SelectorStyle  onChange={(e) => setSelectedSubject(JSON.parse(decodeURIComponent(e.target.value)))}>
                    {subjects.map( (subject,index) => (<option key={index} value={decodeURIComponent(JSON.stringify(subject))}>{subject.subject}</option>))}
                </SelectorStyle> 
            </div>
            <SimpleHorizontalBar data={data} />
        </BackgroundLayoutStyle>
    );
}

