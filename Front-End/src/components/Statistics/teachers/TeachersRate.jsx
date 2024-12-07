import { BackgroundLayoutStyle, SelectorStyle} from "../services/style";
import { useState } from "react";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import useGetSubjects from "../../../hooks/useGetSubjects";
import SimpleFunnel from "../charts/SimpleFunnel";



export default function TeachersRate() {

    const [grades] = useGetAllGrade()
    const [selectedGrade,setSelectedGrade] = useState('')
    const [subjects] = useGetSubjects(selectedGrade)
    const [selectedSubject,setSelectedSubject] = useState({subject: 'unknown'})

    const data = {
        data : [
            { group: "Leads Generated", value: 10000 },
            { group: "Contacted", value: 8000 },
            { group: "Qualified Leads", value: 6000 },
            { group: "Proposal Sent", value: 4500 },
            { group: "Negotiation", value: 3000 },
            { group: "Closed Won", value: 1500 },
        ] ,
        title : 'teachers rate in ' +  selectedSubject?.subject + ' subject'
    }
    

    return (
        <BackgroundLayoutStyle style={{flex: '1'}}>
            <div style={{display: 'flex' , gap: '5px' , flexDirection: 'row-reverse'}}>
                <SelectorStyle value={selectedGrade} onChange={(e) =>{ setSelectedGrade(e.target.value),setSelectedClass('')}}>
                    <option value='' ></option>
                    {grades.map( grade => (<option value={grade.grade}>{grade.grade}</option>) )}
                </SelectorStyle>
                <SelectorStyle  onChange={(e) => setSelectedSubject(JSON.parse(decodeURIComponent(e.target.value)))}>
                    <option value=''></option>
                    {subjects.map( subject => (<option value={decodeURIComponent(JSON.stringify(subject))}>{subject.subject}</option>))}
                </SelectorStyle> 
            </div>
            <SimpleFunnel data={data} />
        </BackgroundLayoutStyle>
    );
}

