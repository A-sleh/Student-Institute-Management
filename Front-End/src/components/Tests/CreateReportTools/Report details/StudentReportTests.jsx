import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import DataServices from "../../../../Data/dynamic/DataServices"
import ShowClassDetails from "../../../Classes/ShowClassDetails"
import ShowTestTable from "../ShowTestTable"

export default function StudentReportTests() {

    const studnetID = useParams().studentId 
    const {studentResultENCODE,reportId,pathDetails} = useLocation().state 
    const studentResult = JSON.parse(decodeURIComponent(studentResultENCODE))
    const [studentTests,setStudentTests] = useState([])
    const TestMaping = Object.groupBy(studentTests, ({test}) => {
        return test.testType.toLowerCase() != 'quiz' ? 'exam' : 'quiz'
    })

    useEffect(() => {
        DataServices.ShowStudentTestInCurrentReport(studnetID,reportId).then( tests => {
            setStudentTests(tests)
        })
    } ,[])

    return (
        <div>
            <div style={{backgroundColor: '#066599',padding: '15px 10px 0 10px' , textAlign: 'left' , color: 'white' , fontSize: '1.6em',marginBottom: '10px'}}>
                <span style={{width: '100%'}}>{pathDetails.classTitle} / {pathDetails.grade} / {pathDetails.reportTitle} </span>
            </div>
            <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px' , padding: '10px' , margin: '10px 0'}}>
                <h3>Student Results</h3>
                <div className="student-info-header" style={{gridTemplateColumns: 'repeat(3,auto)',backgroundColor: 'transparent'}}>
                    <ShowClassDetails
                        title={"Name"}
                        value={studentResult?.name +' ' +studentResult?.lastName}
                        color={"#ffbc00"}
                        icon={"fa-solid fa-user-group"}
                    />
                    <ShowClassDetails
                        title={"Mark"}
                        value={studentResult?.Mark}
                        color={"#229edb"}
                        icon={"bi bi-building-fill-exclamation"}
                    />
                    <ShowClassDetails
                        title={"Total Mark"}
                        value={studentResult?.TotalMark}
                        color={"#60ff00"}
                        icon={"fa-solid fa-graduation-cap"}
                    />
                </div>
            </div>
            <h3>Student Tests</h3>
            <div style={{display: 'flex',gap: '10px',flexWrap: 'wrap' ,backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px',}}>
                <ShowTestTable title={'Quizs'} tests={TestMaping?.quiz || [] } />
                <ShowTestTable title={'Exam'} tests={TestMaping?.exam || [] } />
            </div>
        </div>
    )
}