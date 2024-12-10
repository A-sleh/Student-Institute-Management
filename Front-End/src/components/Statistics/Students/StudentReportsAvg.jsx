import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import useClasses from "../../../hooks/useClasses";
import useStudentReports from "../../../hooks/useStudentReports";
import LineChart from "../charts/LineChart";
import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { useState } from "react";

export default function StudentReportsAvg() {

    const [grades] = useGetAllGrade()
    const [selectedGrade,setSelectedGrade] = useState('')
    const [classes] = useClasses(selectedGrade)
    const [selectedClass,setSelectedClass] = useState('')
    const students =  selectedClass?.students|| []
    const [selectedStudent,setSelectedStudent] = useState(null)
    const [_,studentReportsAvg] = useStudentReports(selectedStudent?.studentId)

    let filteringStudentReportsAvg = studentReportsAvg.map( reports => {
        return {
            date : new Date(reports.StartDate) ,
            avg : reports.Average,
        }
    })

    // Testing data
    filteringStudentReportsAvg = [...filteringStudentReportsAvg, {
        date : new Date(2026,1,10) ,
        avg : 90,
    }, {
        date : new Date(2026,1,15) ,
        avg : 85,
    }, {
        date : new Date(2026,1,19) ,
        avg : 91,
    }, {
        date : new Date(2026,1,21) ,
        avg : 70,
    }, {
        date : new Date(2026,1,26) ,
        avg : 100,
    }]
    
    return (
        <BackgroundLayoutStyle style={{flex : '1'}}>
            <div style={{display: 'flex' , gap: '5px' , flexDirection: 'row-reverse'}}>
                <SelectorStyle value={selectedGrade} onChange={(e) =>{ setSelectedGrade(e.target.value),setSelectedClass('')}}>
                    <option value={''} ></option>
                    {grades.map( (grade,index) => (<option key={index} value={grade.grade}>{grade.grade}</option>) )}
                </SelectorStyle>
                { selectedGrade != '' && <SelectorStyle  onChange={(e) => {setSelectedClass(JSON.parse(decodeURIComponent(e.target.value))), setSelectedStudent(null)}}>
                    <option value={encodeURIComponent('{}')}></option>
                    {classes.map( (Class,index) => (<option key={index} value={encodeURIComponent(JSON.stringify(Class))}>{Class.title}</option>))}
                </SelectorStyle> }
                {
                    Object.keys(selectedClass).length != 0 && selectedGrade != '' &&
                    <SelectorStyle onChange={(e) => setSelectedStudent(JSON.parse(decodeURIComponent(e.target.value)))} >
                        <option value=''></option>
                        {students.map( (student,index) => (<option key={index} value={encodeURIComponent(JSON.stringify(student))}>{student?.name + '' + student?.lastName}</option>))}
                    </SelectorStyle>
                }
            </div>
            <LineChart data={filteringStudentReportsAvg}/>
        </BackgroundLayoutStyle>
    );
}

