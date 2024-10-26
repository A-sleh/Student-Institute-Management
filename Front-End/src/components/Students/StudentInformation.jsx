import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Title from "../Global/Title";
import StudentReportCard from "./studnetInformationCOM/StudentReportCard";
import StudentInfoCard from "./studnetInformationCOM/StudentInfoCard";
import StudentBillsCard from "./studnetInformationCOM/StudentBillsCard";
import { useEffect, useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import ShowTestTable from "../Tests/CreateReportTools/ShowTestTable";

export default function StudentInformation() {

  const studentId = useParams().id
  const navLink = useNavigate();
  const [tests,setTests] = useState({})
  const [selectedReport,setSelectedReport] = useState(null)

  useEffect(() => {

    // if there is no report was selected we will diplay all tests which no joined in any report

    if(selectedReport == null ) {
      DataServices.ShowStudentTestNotAddedToReport(studentId).then( tests => {
        const pendingTests = tests.filter( testCur => {
          return testCur.test.report == null
        }) 
        setTests(
          Object.groupBy(pendingTests, ({test}) => {
            return test.testType.toLowerCase() != 'quiz' ? test.testType.toLowerCase() : 'quiz'
          })
        )
      })
    }else {
      DataServices.ShowStudentTestInCurrentReport(studentId,selectedReport.reportId).then( tests => {
        setTests(
          Object.groupBy(tests, ({test}) => {
            return test.testType.toLowerCase() != 'quiz' ? test.testType.toLowerCase() : 'quiz'
          })
        )
      })
    }

  },[selectedReport])

  console.log(tests)

  return (
    <>
        <Title title={window.location.pathname } />
        <div style={{display: 'flex',gap: '10px' , marginBottom: '20px'}}>
          <StudentInfoCard studentId={studentId}/>
          <StudentBillsCard studentId={studentId}/>
        </div>
        <StudentReportCard studentId={studentId} selectedReport={selectedReport}setSelectedReport={setSelectedReport}/>
        <TestsHeader selectedReport={selectedReport}/>
        <div style={{display: 'flex',gap: '10px',flexWrap: 'wrap' ,backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
          <ShowTestTable title={'quiz'} tests={tests?.quiz || []}/>
          <ShowTestTable title={'exam'} tests={tests?.exam || []}/>
        </div>
    </>
  );
}

function TestsHeader({selectedReport}) {

  if(selectedReport == null) {
    return (
      <div style={{padding: '10px 0 0 10px',margin: '20px 0 0 0',color: 'white' , backgroundColor: '#056699' , fontWeight: '400',borderRadius: '10px 10px 0 0 '}}>The latest tests</div>
    )
  }

  return (
    <div style={{padding: '10px 0 3px 10px',margin: '20px 0 0 0',color: 'white' , backgroundColor: '#056699' , fontWeight: '400',borderRadius: '10px 10px 0 0 '}}>Report : {selectedReport.reportTitle} / tests</div>
  )
}
