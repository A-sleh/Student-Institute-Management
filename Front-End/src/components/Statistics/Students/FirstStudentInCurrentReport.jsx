import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { useEffect, useState } from "react";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import useGetTheTopStudentsInCurrentReport from "../../../hooks/report_hooks/useGetTheTopStudentsInCurrentReport";
import SimpleHistogram from "../charts/SimpleHistogram";
import useGetReportsFilterdByGrade from "../../../hooks/report_hooks/useGetReportsFilterdByGrade";
import { useSelector } from "react-redux";
import { ARABIC } from "../../../Redux/actions/type";


export default function FirstStudentInCurrentReport() {

    const {currentLange} = useSelector( state => state.language)
    const [grades] = useGetAllGrade()
    const [selectedGrade,setSelectedGrade] = useState('')
    const [reports] = useGetReportsFilterdByGrade(selectedGrade?.gradeId || '')
    const [selectedReport,setSelectedReport] = useState({})
    const [topOneStudents] = useGetTheTopStudentsInCurrentReport(selectedReport?.reportId || '')
    
    const data = {
        data : topOneStudents ,
        title : currentLange == ARABIC ? selectedReport?.reportTitle + ' الطلاب الأوائل في التقرير' :'first one students in ' + selectedReport?.reportTitle + ' report' 
    }
    
    useEffect(() => {
        setSelectedGrade(grades[0])
    },[grades])
    
    useEffect(() => {
        setSelectedReport(reports[0])
    },[reports])
    
    return (
        <BackgroundLayoutStyle style={{flex: '1'}}>
            <div style={{display: 'flex' , gap: '5px' , flexDirection: 'row-reverse'}}>
                <SelectorStyle onChange={(e) =>{setSelectedGrade(JSON.parse(decodeURIComponent(e.target.value)))}} value={encodeURIComponent(JSON.stringify(selectedGrade))}>
                    {grades.map( (grade,index) => (<option key={index} value={encodeURIComponent(JSON.stringify(grade))}>{grade.grade}</option>) )}
                </SelectorStyle>
                <SelectorStyle value={encodeURIComponent(JSON.stringify(selectedReport))}  onChange={(e) => setSelectedReport(JSON.parse(decodeURIComponent(e.target.value)))}>
                    {reports.map( (report,index) => (<option key={index} value={encodeURIComponent(JSON.stringify(report))}>{report.reportTitle}</option>))}
                </SelectorStyle> 
            </div>
             <SimpleHistogram data={data}/> 
        </BackgroundLayoutStyle>
    );
}

