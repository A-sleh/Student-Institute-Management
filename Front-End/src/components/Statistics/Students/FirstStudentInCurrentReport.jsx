import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { useState } from "react";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import useGetTheTopStudentsInCurrentReport from "../../../hooks/report_hooks/useGetTheTopStudentsInCurrentReport";
import SimpleHistogram from "../charts/SimpleHistogram";
import useGetReportsFilterdByGrade from "../../../hooks/report_hooks/useGetReportsFilterdByGrade";


export default function FirstStudentInCurrentReport() {

    const [grades] = useGetAllGrade()
    const firstStateGrade = grades[0]
    const [selectedGrade,setSelectedGrade] = useState(firstStateGrade)
    const [reports] = useGetReportsFilterdByGrade(selectedGrade?.gradeId)
    const firstStateReport = reports[0]
    const [selectedReport,setSelectedReport] = useState(firstStateReport)
    const [topOneStudents] = useGetTheTopStudentsInCurrentReport(selectedReport?.reportId)
    const data = {
        data : topOneStudents ,
        title : 'first one students in ' + selectedReport?.reportTitle + ' report'
    }

    return (
        <BackgroundLayoutStyle style={{flex: '1'}}>
            <div style={{display: 'flex' , gap: '5px' , flexDirection: 'row-reverse'}}>
                <SelectorStyle onChange={(e) =>{ setSelectedGrade(JSON.parse(decodeURIComponent(e.target.value)))}}>
                    {grades.map( (grade,index) => (<option key={index} value={encodeURIComponent(JSON.stringify(grade))}>{grade.grade}</option>) )}
                </SelectorStyle>
                <SelectorStyle  onChange={(e) => setSelectedReport(JSON.parse(decodeURIComponent(e.target.value)))}>
                    {reports.map( (report,index) => (<option key={index} value={encodeURIComponent(JSON.stringify(report))}>{report.reportTitle}</option>))}
                </SelectorStyle> 
            </div>
             <SimpleHistogram data={data}/> 
        </BackgroundLayoutStyle>
    );
}

