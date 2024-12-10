import { useState } from "react";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import useReports from "../../../hooks/useReports";
import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import SimpleHistogram from "../charts/SimpleHistogram";
import useGetTheAvgClassesInCurrentReport from "../../../hooks/report_hooks/useGetTheAvgClassesInCurrentReport";

export default function ClassAvgInCurrentReport() {
 
    const [grades] = useGetAllGrade()
    const [selectedGrade,setSelectedGrade] = useState('')
    const [_,reports] = useReports()
    const [selectedReport,setSelectedReport] = useState('')
    const [classesAvgInCurrentReport] = useGetTheAvgClassesInCurrentReport(selectedReport?.reportId)
    const data = {
        data : classesAvgInCurrentReport ,
        title : 'Classes average in ' + selectedReport.reportTitle + ' report',
        fillColor: '#0964cc'
    }

    
    return (
        <BackgroundLayoutStyle style={{flex: '2'}}>
            <div style={{display: 'flex' , gap: '5px' , flexDirection: 'row-reverse'}}>
                <SelectorStyle value={selectedGrade} onChange={(e) =>{ setSelectedGrade(e.target.value)}}>
                    <option value='' ></option>
                    {grades.map( (grade,index) => (<option value={grade.grade} key={index}>{grade.grade}</option>) )}
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
