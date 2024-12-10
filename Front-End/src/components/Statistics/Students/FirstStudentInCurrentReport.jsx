import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { useState } from "react";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import useReports from "../../../hooks/useReports";
import useGetTheTopStudentsInCurrentReport from "../../../hooks/report_hooks/useGetTheTopStudentsInCurrentReport";
import SimpleHistogram from "../charts/SimpleHistogram";


export default function FirstStudentInCurrentReport() {

    const [grades] = useGetAllGrade()
    const [selectedGrade,setSelectedGrade] = useState('')
    const [_,reports] = useReports()
    const [selectedReport,setSelectedReport] = useState('')
    const [topOneStudents] = useGetTheTopStudentsInCurrentReport(selectedReport?.reportId)
    const data = {
        data : topOneStudents ,
        title : 'first one students in ' + selectedReport.reportTitle + ' report'
    }

    return (
        <BackgroundLayoutStyle style={{flex: '1'}}>
            <div style={{display: 'flex' , gap: '5px' , flexDirection: 'row-reverse'}}>
                <SelectorStyle value={selectedGrade} onChange={(e) =>{ setSelectedGrade(e.target.value)}}>
                    <option value='' ></option>
                    {grades.map( (grade,index) => (<option key={index} value={grade.grade}>{grade.grade}</option>) )}
                </SelectorStyle>
                <SelectorStyle  onChange={(e) => setSelectedReport(JSON.parse(decodeURIComponent(e.target.value)))}>
                    <option value=''></option>
                    {reports.map( (report,index) => (<option key={index} value={encodeURIComponent(JSON.stringify(report))}>{report.reportTitle}</option>))}
                </SelectorStyle> 
            </div>
             <SimpleHistogram data={data}/> 
        </BackgroundLayoutStyle>
    );
}

