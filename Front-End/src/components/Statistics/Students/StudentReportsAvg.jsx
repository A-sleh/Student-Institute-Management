import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import useClasses from "../../../hooks/useClasses";
import useStudentReports from "../../../hooks/useStudentReports";
import LineChart from "../charts/LineChart";
import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { useEffect, useMemo, useState } from "react";

export default function StudentReportsAvg() {

    const [grades] = useGetAllGrade()
    const [selectedGrade,setSelectedGrade] = useState('')
    const [classes] = useClasses(selectedGrade?.grade)
    const [selectedClass,setSelectedClass] = useState([])
    const students =  useMemo(() => selectedClass?.students|| [] ,[selectedClass])
    const [selectedStudent,setSelectedStudent] = useState(null)
    const [_,studentReportsAvg] = useStudentReports(selectedStudent?.studentId)

    let filteringStudentReportsAvg = studentReportsAvg.map( reports => {
        return {
            date : new Date(reports.StartDate) ,
            avg : reports.Average,
        }
    })

    useEffect(() => {
        setSelectedGrade(grades[0]?.grade || '')
    } ,[grades])
    
    useEffect(() => {
        setSelectedClass(classes[0] || {})
    } ,[classes])

    useEffect(() => {
        setSelectedStudent(students[0] || {})
    } ,[students])

    return (
        <BackgroundLayoutStyle style={{flex : '1'}}>
            <div style={{display: 'flex' , gap: '5px' , flexDirection: 'row-reverse'}}>
                <SelectorStyle value={encodeURIComponent(JSON.stringify(selectedGrade))} onChange={(e) =>{ setSelectedGrade(e.target.value),setSelectedClass('')}}>
                    <option value={''} ></option>
                    {grades.map( (grade,index) => (<option key={index} value={encodeURIComponent(JSON.stringify(grade))} >{grade.grade}</option>) )}
                </SelectorStyle>
                { selectedGrade != '' && <SelectorStyle value={encodeURIComponent(JSON.stringify(selectedClass))} onChange={(e) => {setSelectedClass(JSON.parse(decodeURIComponent(e.target.value))), setSelectedStudent(null)}}>
                    <option value={encodeURIComponent('{}')}></option>
                    {classes.map( (Class,index) => (<option key={index} value={encodeURIComponent(JSON.stringify(Class))}>{Class.title}</option>))}
                </SelectorStyle> }
                {
                    Object.keys(selectedClass).length != 0 && selectedGrade != '' &&
                    <SelectorStyle value={encodeURIComponent(JSON.stringify(selectedStudent))} onChange={(e) => setSelectedStudent(JSON.parse(decodeURIComponent(e.target.value)))} >
                        <option value=''></option>
                        {students.map( (student,index) => (<option key={index} value={encodeURIComponent(JSON.stringify(student))}>{student?.name + '' + student?.lastName}</option>))}
                    </SelectorStyle>
                }
            </div>
            <LineChart data={filteringStudentReportsAvg}/>
        </BackgroundLayoutStyle>
    );
}

