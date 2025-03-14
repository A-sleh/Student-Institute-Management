/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { NavigateSubHeaderStyle, StudentTestsContainerStyle } from "../../style/styleTage"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import ShowTestTable from "../ShowTestTable"
import useClass from "../../../../hooks/class_hooks/useClass"
import HeaderInformation from "../../../shared/HeaderInformation"
import useGetStudentTestsInReport from "../../../../hooks/student_hooks/useGetStudentTestsInReport"
import { ReportDetailsTEXT } from "../../../../Data/static/test/CreateReportTools/ReportDetailsTEXT"
import { useSelector } from "react-redux"
import { GoBackBtnStyle } from "../../../shared/style/styleTag"

export default function StudentReportTests() {

    const {currentLange} = useSelector( state => state.language)
    const {studentResultTitle ,studentsTestsTitle ,examType ,backBtn,quizType} = ReportDetailsTEXT[currentLange]

    const studnetID = useParams().studentId 
    const studnetDetailsEncode = useLocation().state
    const backPage = useNavigate()
    const studentDetailsDecoded = JSON.parse(decodeURIComponent(studnetDetailsEncode))
    const {reportId ,name ,lastName ,Mark ,TotalMark ,classId ,reportTitle} = studentDetailsDecoded
    const [Class] = useClass(classId)
    const [quiz,exam] = useGetStudentTestsInReport(studnetID,reportId)

    const headerList = [
        { title:{arabic: 'الأسم', english: 'Name'} , value: `${name} ${lastName}`, icon: "fa-solid fa-user-group"  } ,
        { title: {arabic: 'العلامه', english: 'Mark'}, value: `${Mark}`, icon: "bi bi-building-fill-exclamation"  } ,
        { title: {arabic: 'العلامه الإجمالية', english: 'Total Mark'}, value: `${TotalMark}`, icon: "fa-solid fa-graduation-cap"  } ,
    ]
    
    return (
        <div>

            <NavigateSubHeaderStyle >
                <span style={{width: '100%'}}>{Class.title} / {Class.grade} / {reportTitle} </span>
            </NavigateSubHeaderStyle >

            <HeaderInformation title={studentResultTitle} data={headerList}/>
            
            <h3>{studentsTestsTitle}</h3>

            <StudentTestsContainerStyle >
                <ShowTestTable title={quizType} tests={quiz.tests || [] } />
                <ShowTestTable title={examType} tests={exam.tests || [] } />
            </StudentTestsContainerStyle> 

            <GoBackBtnStyle onClick={() => backPage( -1 , {replace: true })}>{backBtn}</GoBackBtnStyle>
        </div>
    )
}