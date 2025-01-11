import { BackgroundLayoutStyle, SelectorStyle} from "../services/style";
import { useEffect, useState } from "react";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import useGetSubjects from "../../../hooks/useGetSubjects";
import useGetTeachersRating from "../../../hooks/teacher_hooks/useGetTeachersRating";
import SimpleHorizontalBar from "../charts/SimpleHorizontalBar";
import { useSelector } from "react-redux";
import { ARABIC } from "../../../Redux/actions/type";



export default function TeachersRate() {

    const {currentLange} = useSelector( state => state.language)
    const [grades] = useGetAllGrade()
    const [selectedGrade,setSelectedGrade] = useState('')
    const [subjects] = useGetSubjects(selectedGrade?.grade)
    const [selectedSubject,setSelectedSubject] = useState({})
    const [teachers] = useGetTeachersRating(selectedSubject?.subjectId)


    const data = {
        data : teachers.map( teacher => {            
            return {
                type :  teacher?.Name + ' ' + teacher?.LastName ,
                value : Number(teacher.rate)
            }
        }),
        title : currentLange == ARABIC ?  selectedSubject?.subject  + ' تقييم الأساتذه في الماده ' : 'teachers rate in ' +  selectedSubject?.subject + ' subject',
        color: '#a6ff00b7',
        direction : 'right'
    }

    useEffect(() => {
        setSelectedGrade(grades[0])
    },[grades])
    
    useEffect(() => {
        setSelectedSubject(subjects[0])
    },[subjects])
    
    return (
        <BackgroundLayoutStyle style={{flex: '1'}}>
            <div style={{display: 'flex' , gap: '5px' , flexDirection: 'row-reverse'}}>
                <SelectorStyle value={decodeURIComponent(JSON.stringify(selectedGrade))} onChange={(e) =>{ setSelectedGrade(JSON.parse(decodeURIComponent(e.target.value)))}}>
                    {grades.map( (grade,index) => (<option key={index} value={decodeURIComponent(JSON.stringify(grade))}>{grade.grade}</option>) )}
                </SelectorStyle>
                <SelectorStyle value={decodeURIComponent(JSON.stringify(selectedSubject))} onChange={(e) => setSelectedSubject(JSON.parse(decodeURIComponent(e.target.value)))}>
                    {subjects.map( (subject,index) => (<option key={index} value={decodeURIComponent(JSON.stringify(subject))}>{subject.subject}</option>))}
                </SelectorStyle> 
            </div>
            <SimpleHorizontalBar data={data} />
        </BackgroundLayoutStyle>
    );
}

