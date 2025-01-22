/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useLocation, useNavigate, useParams } from "react-router-dom"
import { format } from "date-fns"
import { NavigateSubHeaderStyle } from "../../style/styleTage"
import { STUDENTCOLMN } from "../columnsTools/STUDENTTESTCOL"
import { separateTesetsAccordingToType } from "../../../shared/logic/logic"
import { GoBackBtnStyle } from "../../../shared/style/styleTag"
import useGetStudentsTestsInCurrentClassAndReport from "../../../../hooks/student_hooks/useGetStudentsTestsInCurrentClassAndReport"
import Table from "../../../shared/Table"
import ReportTests from "./ReportTests"
import useClass from "../../../../hooks/class_hooks/useClass"
import { ReportDetailsTEXT } from "../../../../Data/static/test/CreateReportTools/ReportDetailsTEXT"
import { useSelector } from "react-redux"

export default function ReportClassDetails() {

    const {currentLange} = useSelector( state => state.language)
    const {studentsResultTitle ,backBtn} = ReportDetailsTEXT[currentLange]
    const classId = useParams().classId 
    const [Class] = useClass(classId)
    const reportDetailsEncode = useLocation().state
    const reportDetailsDecoded = JSON.parse(decodeURIComponent(reportDetailsEncode))
    const {reportId,reportTitle,startDate,tests,quizAvg,examAvg} = reportDetailsDecoded
    const [studnets] = useGetStudentsTestsInCurrentClassAndReport(reportId,classId,reportTitle)
    const [quiz,exam] = separateTesetsAccordingToType(tests,quizAvg,examAvg)
    const gotoPage = useNavigate()

    return (
        <div>
            <NavigateSubHeaderStyle >
                <span style={{width: '100%'}}>{Class.title} / {Class.grade} / {reportTitle} </span>
                <span style={{float: 'right'}}>{format(new Date(startDate) , 'yyyy / MM / dd')}</span>
            </NavigateSubHeaderStyle >

            <ReportTests quiz={quiz} exam={exam}/>
        
            <Table column={STUDENTCOLMN} data={studnets} showMainHeader={false} url={`/CreateReport/StudentReportTests`} idKeyParams={'StudentId'} >
                <h3 style={{marginTop: '20px' , lineHeight: '10px' }}>{studentsResultTitle}</h3>
            </Table>

            <GoBackBtnStyle onClick={()=>{gotoPage(-1)}}>{backBtn}</GoBackBtnStyle>
        </div>
    )
}

