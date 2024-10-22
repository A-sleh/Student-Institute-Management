import { useEffect, useState } from "react"
import { HeaderControal } from "../../../Bills/TeacherPaysCom/ShowBillTeacherDetails"
import { FormInputFieldStyle } from "../../CreateTestTools/EmentsStyle"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import DataServices from "../../../../Data/dynamic/DataServices"
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"
import { format } from "date-fns"

export default function ShowClassReports() {

    const [reports,setReports] = useState([])
    const [search,setSearch] = useState('')
    const [searchByDate,setSearchByDate] = useState('')
    const classId = useParams().classId
    const gotoPage = useNavigate()
    useEffect(() => {
        DataServices.ShowAllClassReports(classId).then( reportsRES => {
            setReports(reportsRES)
        })
    },[])


    return (
        <div>
            <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
                <FormInputFieldStyle type={'date'} style={{width: '30%'}} value={searchByDate} onChange={(e)=>{setSearchByDate(e.target.value)}}/>
                <HeaderControal searcByName={search}setSearcByName={setSearch} style={{width: '30%'}}/>
            </div>
            <h3 style={{padding: '5px',fontWeight: '400' , backgroundColor: '#066599' , color: 'white' , textAlign: 'center'}}>Reports</h3>
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
                <table>
                    <thead  style={{position: 'relative' , top: '-10px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}></th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Report Title</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Start Date</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Quiz Avarage</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Exam Avarage</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Test Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports.map( (report,index) => {              
                                    const {reportTitle,startDate,tests,reportId} = report
                                    
                                    if(reportTitle.toLowerCase().includes(search.toLowerCase()) == false ) return
                                    if( (new Date(startDate) - new Date(searchByDate)) < 0 ) return ;
                                    return <tr style={{ textAlign: 'center' ,cursor:'pointer'}} className="hovering-row" key={index} onClick={()=>{gotoPage(`/CreateReport/ReportClassDetails/${reportId}`,{state: classId})}} >         
                                        <ShowReportBody report={report} classId={classId}/>
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

function ShowReportBody({report,classId}) {

    const {reportTitle,startDate,tests,reportId} = report
    const [quizAvg,setQuizAvg] = useState(0)
    const [quizExam,setExam] = useState(0)
    useEffect(() => {
        DataServices.ShowExamAvarageInCurrentClassReport(reportId,classId).then(examAVG => {
            setExam(examAVG[0]?.Average || 0)
        })
        DataServices.ShowQuizAvarageInCurrentClassReport(reportId,classId).then(quizAVG => {
            setQuizAvg(quizAVG[0]?.Average || 0)
        })

    } ,[])
    


    return (
        <>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}></td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{reportTitle}</td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{format(new Date(startDate),'yyyy/MM/dd')}</td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{quizAvg}</td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{quizExam}</td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{tests?.length}</td>
        </>
    )

}