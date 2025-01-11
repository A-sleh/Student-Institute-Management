/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { useNavigate, useParams } from "react-router-dom";
import { HeightContainerAnimation } from "../shared/style/styleTag";
import { FlexContainerStyle, GoBackBtnStyle } from "../shared/style/styleTag";
import { QuizExamContainerStyle } from "../Tests/style/styleTage";
import { useState } from "react";
import Title from "../Global/Title";
import StudentReportCard from "./studnetInformationCOM/StudentReportCard";
import StudentInfoCard from "./studnetInformationCOM/StudentInfoCard";
import StudentBillsCard from "./studnetInformationCOM/StudentBillsCard";
import ShowTestTable from "../Tests/CreateReportTools/ShowTestTable";
import useStudentReportTests from "../../hooks/useStudentReportTests";
import useStudentTestsNotAddedToReport from "../../hooks/useStudentTestsNotAddedToReport";
import { useSelector } from "react-redux";
import { StudentInformationTEXT } from "../../Data/static/Students/StudentsInformation/StudentInformationTEXT";


export default function StudentInformation() {

  const {currentLange} = useSelector( state => state.language)
  const {goBackBtn,quizTitle ,examTitle ,countTitle} = StudentInformationTEXT[currentLange]

  const studentId = useParams().id
  const gotoPage = useNavigate()
  const [selectedReport,setSelectedReport] = useState({})
  const [reportQuiz,reportExam] = useStudentReportTests(studentId,selectedReport.reportId,selectedReport)
  const [quiz,exam] = useStudentTestsNotAddedToReport(studentId)

  return (
    <>
        <Title title={window.location.pathname } />
        <FlexContainerStyle>
          <StudentInfoCard studentId={studentId}/>
          <StudentBillsCard studentId={studentId}/>
        </FlexContainerStyle>

        <HeightContainerAnimation delay={'.5s'}>
          <StudentReportCard studentId={studentId} selectedReport={selectedReport}setSelectedReport={setSelectedReport}/>
        </HeightContainerAnimation>

        <HeightContainerAnimation delay={'.8s'}>
          <TestsHeader selectedReport={selectedReport}/>
        </HeightContainerAnimation>

        <HeightContainerAnimation delay={'1.2s'}>
          <QuizExamContainerStyle style={{backgroundColor: 'transparent'}}>
            <ShowTestTable title={quizTitle} tests={selectedReport.reportId == undefined ? quiz : reportQuiz }/>
            <ShowTestTable title={examTitle} tests={selectedReport.reportId == undefined ? exam : reportExam }/>
          </QuizExamContainerStyle>
        </HeightContainerAnimation>
        <GoBackBtnStyle onClick={()=>gotoPage(-1,{replace: true})}>{goBackBtn}</GoBackBtnStyle>
    </>
  );
}

function TestsHeader({selectedReport}) {

  const {currentLange} = useSelector( state => state.language)
  const {latestReport,report,testsTitle} = StudentInformationTEXT[currentLange]

  return (
    <div style={{padding: '10px 5px 5px 10px',margin: '20px 0 0 0',color: 'white' , backgroundColor: '#056699' , fontWeight: '400',borderRadius: '10px 10px 0 0 '}}>{ selectedReport.reportId == undefined ? latestReport : `${report} : ${selectedReport.reportTitle} / ${testsTitle}`}</div>
  )
}
