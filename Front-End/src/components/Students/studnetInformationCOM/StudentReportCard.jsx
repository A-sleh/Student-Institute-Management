/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { REPORTCOLUMNS } from "../column/ReprotColumn"
import useStudentReports from "../../../hooks/student_hooks/useStudentReports"
import Table from "../../shared/Table"
import { useSelector } from "react-redux"
import { StudentInformationTEXT } from "../../../Data/static/Students/StudentsInformation/StudentInformationTEXT"

export default function StudentReportCard({studentId,selectedReport,setSelectedReport}) {

    const {currentLange} = useSelector( state => state.language)
    const {studentReports : studentReport } = StudentInformationTEXT[currentLange]
    const [studentReports] = useStudentReports(studentId)

    function handleReportClicked(Id,report) {

        // if the user click on the report twice we will remove it in the second once he clicked      
        if(selectedReport.reportId != undefined && Id == selectedReport.reportId ) {
            setSelectedReport({})
            return
        }

        let SelectedReport = new Map()
        SelectedReport['reportId'] = Id
        SelectedReport['reportTitle'] = report.ReportTitle
        SelectedReport[Id] = true

        setSelectedReport(SelectedReport)
    }

    return (
        <div>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>{studentReport}</span>
            <Table data={studentReports} column={REPORTCOLUMNS} selectionRows={selectedReport} rowClickedFn={handleReportClicked} idKeyParams="Id" showMainHeader={false} unableId={true} styleObj={{padding: '5px' , fontSize: '14px' , sameColor: true }}/>
        </div>
    )
}