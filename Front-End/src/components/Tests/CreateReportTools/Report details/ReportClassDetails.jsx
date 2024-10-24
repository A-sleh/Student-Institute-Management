import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom"
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"
import { useEffect, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import { format } from "date-fns"

export default function ReportClassDetails() {

    const reportId = useParams().reportId 
    const classId = useLocation().state.classId
    const {reportTitle,startDate,grade,classTitle,tests,quizAvg,examAvg} = useLocation().state
    const Tests = JSON.parse(decodeURIComponent(tests))
    const TestsMaping = Object.groupBy(Tests,({testType}) => {
        return testType.toLowerCase() != 'quiz' ? 'exam' : 'quiz'
    })
    const [studentDetails,setStudentDetails] = useState([])
    const gotoPage = useNavigate()
    useEffect(() =>{
        DataServices.ShowAllStudentsForCurrentReport(reportId,classId).then( studnets => {
            setStudentDetails(studnets)
        })
    },[])

    return (
        <div>
            <div style={{backgroundColor: '#066599',padding: '15px 10px 0 10px' , textAlign: 'left' , color: 'white' , fontSize: '1.6em',marginBottom: '10px'}}>
                <span style={{width: '100%'}}>{classTitle} / {grade} / {reportTitle} </span>
                <span style={{float: 'right'}}>{format(new Date(startDate) , 'yyyy / MM / dd')}</span>
            </div>
            <ReportDetails TestsMaping={TestsMaping} quizAvg={quizAvg}examAvg={examAvg}/>
            <h3 style={{marginTop: '15px' , lineHeight: '10px'}}>Student Reports Result</h3>
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
                <table>
                    <thead  style={{position: 'relative' , top: '-10px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Name</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Last Name</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Mark</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Total Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentDetails.map( (student,index) => {              
                                    const {name,lastName,Mark,TotalMark,StudentId} = student

                                    return <tr style={{ textAlign: 'center' ,cursor:'pointer'}} className="hovering-row" key={index} onClick={()=>gotoPage(`/CreateReport/StudentReportTests/${StudentId}`,{state:{studentResultENCODE: encodeURIComponent(JSON.stringify(student)) , reportId : reportId , pathDetails:{reportTitle,grade,classTitle}}})}>         
                                            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{name}</td>
                                            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{lastName}</td>
                                            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{Mark}</td>
                                            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{TotalMark}</td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <button onClick={()=>{gotoPage(-1)} } style={{padding: '4px 20px',cursor: 'pointer' , color: 'white' , backgroundColor: 'red' , border: 'none' , outline: 'none' , borderRadius: '2px' ,marginLeft: '8px'}}>Back</button>
        </div>
    )
}

function ReportDetails({TestsMaping,quizAvg,examAvg}) {
    
    const {quiz,exam} = TestsMaping

    return (
        <>
            <div style={{display: 'flex' , borderRadius: '3px' ,gap: '10px'}}>
                <div style={{borderRadius: '3px',padding: '10px' , backgroundColor: '#f3f1f1d7',flex: '1'}}>
                    <div style={{display: 'flex',justifyContent: 'space-between',marginBottom: '10px', alignItems: 'center'}}>
                        <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>Quizs</span>
                        <div>
                            <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>Count : {quiz?.length || 0 }</span>
                            <span style={{padding: '5px 15px' , backgroundColor: 'white' , marginLeft: '5px'}}>Avg : {quizAvg || 0}</span>
                        </div>
                    </div>
                    <div style={{display: 'grid',gridTemplateColumns: 'repeat(2,auto)' ,gap: '10px'}}>
                        {
                            quiz?.map(test=> {
                                return <TestCard test={test} />
                            })
                        }
                    </div>
                </div>
                <div style={{borderRadius: '3px',padding: '10px' , backgroundColor: '#f3f1f1d7',flex: '1'}}>
                    <div style={{display: 'flex',justifyContent: 'space-between',marginBottom: '10px' , alignItems: 'center'}}>
                        <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>Exam</span>
                        <div>
                            <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>Count : {exam?.length || 0 }</span>
                            <span style={{padding: '5px 15px' , backgroundColor: 'white' , marginLeft: '5px'}}>Avg : {examAvg || 0}</span>
                        </div>
                    </div>
                    <div style={{display: 'grid',gridTemplateColumns: 'repeat(2,auto)' ,gap: '10px'}}>
                        {
                            exam?.map(test=> {
                                return <TestCard test={test} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

function TestCard({test}) {

    const {title,date,subject} = test ;
    
    return (
        <div style={{padding: '10px' ,display: 'flex', justifyContent: 'space-between', borderRadius: '3px' , backgroundColor: 'white'}}>
            <span>{subject.subject} / {title}</span>
            <span>{format(new Date(date),'yyyy / MM / dd')} </span>
        </div>
    )
}