import { useEffect, useState } from "react"
import ShowAllReport from "./ShowAllReports"
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"
import DataServices from "../../../../Data/dynamic/DataServices"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import { format } from "date-fns"
import Notification from "../../../Global/Notification"

export default function LinkTestWithReport() {

    const [selectedReport,setSelectedReport] = useState(null)
    const classId = useParams().classId
    const [typeTest,setTypeTest] = useState('revision')
    const [tests,setTests] = useState([])
    const [selectedTestId,setSelectedTestId] = useState({})
    const [selectedQuizId,setSelectedQuizId] = useState({})
    const [successLinkTest,setSuccessLinkTest] = useState(false)
    const [wornining,setWornining] = useState(false)
    const gotoPage = useNavigate()
    const {grade,classTitle} = useLocation().state

    useEffect(() => {
        DataServices.ShowCurrentClassTests(classId,true).then(tests => {
            setTests(tests)
        })
    } ,[successLinkTest])
    
    
    function handleCreateReportClicked() {
        let testIds = [];
        for (let key in selectedQuizId) 
            testIds.push(+key)
        for (let key in selectedTestId) 
            testIds.push(+key)     
        if( selectedReport == null || testIds.length == 0 ) {
            setWornining(true)
            setTimeout(() => {
                setWornining(false)
            } , 2000 )
            return 
        }  
        DataServices.LinkTestWithCurrentReport(selectedReport,testIds).then( _ => {
            setSuccessLinkTest(true)
            setTimeout(() => {
                setSuccessLinkTest(false)
            } , 2000 )
        })
    }


    return (
        <>
            <Notification title={'Link test with report'} type={'success'} state ={successLinkTest} setState={setSuccessLinkTest}/>
            <Notification title={'You must select reporat ,And some tests'} type={'error'} state ={wornining} setState={setWornining}/>
            <div style={{backgroundColor: '#066599',padding: '15px 10px 0 10px' , textAlign: 'left' , color: 'white' , fontSize: '1.6em',marginBottom: '10px'}}>
                <span style={{width: '100%'}}>{classTitle} / {grade}</span>
            </div>
            <ShowAllReport selectedReport={selectedReport} setSelectedReport={setSelectedReport}/>
            <div style={{display: 'flex',gap: '10px',flexWrap: 'wrap' ,backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px',}}>
                <ShowingTable data={tests}  type={'quiz'} state={selectedQuizId} setState={setSelectedQuizId} />
                <ShowingTable data={tests}  type={typeTest} state={selectedTestId} setState={setSelectedTestId} typeTest={typeTest} setTypeTest={setTypeTest} />
            </div>
            <div style={{margin: '5px 0'}} >
                <button onClick={handleCreateReportClicked} style={{padding: '4px 20px',cursor: 'pointer' , color: 'white' , backgroundColor: '#056699' , border: 'none' , outline: 'none' , borderRadius: '2px' }}>Create</button>
                <button onClick={()=>{gotoPage(-1)} } style={{padding: '4px 20px',cursor: 'pointer' , color: 'white' , backgroundColor: 'red' , border: 'none' , outline: 'none' , borderRadius: '2px' ,marginLeft: '8px'}}>Back</button>
            </div>
        </>
    )
}

function ShowingTable({data,type,state,setState,typeTest,setTypeTest}) {

    function handleTestClicked(testId) {
        let newTests = new Map() ;
        newTests = {...state} ; 
        if(newTests[testId] == true) {
            delete newTests[testId] ;
        }else newTests[testId] =  true ;
        setState(newTests)
    }

    function handleUnSelectTests() {
        setState({})
    }

    function handleSelectAllTests()  {

        let newTests = new Map() ;

        data.forEach( test => {
            const {testType,testId} = test 

            if(type == 'quize' && testType.toLowerCase() == type ){
                newTests[testId] =  true 
            }  
            if(type != 'quize'&& testType.toLowerCase() == type ){
                newTests[testId] =  true 
            }
        })
        setState(newTests)
    }

    return (
        <div style={{flex: '1'}}>
            { type != 'quiz' && <HeaderTests typeTest={typeTest} setTypeTest={setTypeTest} setSelectedTestId={setState} selectAllTest={handleSelectAllTests} unSelectTest={handleUnSelectTests}/>}
            { type == 'quiz' && 
                <div style={{paddingTop:'8px',paddingLeft:'10px',paddingRight: '10px',fontWeight: '300',backgroundColor: '#056699' , color: 'white'}}>{type}
                    <div style={{float: 'right',cursor: 'pointer'}} >
                        <span onClick={handleSelectAllTests}>Select All</span>
                        <span onClick={handleUnSelectTests} style={{marginLeft: '10px'}}>Unselect All</span>
                    </div>
                </div>}
            <table>
                <thead  style={{position: 'relative' }}>                    
                    <tr>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Details </th>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Type</th>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map( (test,index) => {           
                                const {testType,title,date,testId} = test
                                if(type == 'quize' && testType.toLowerCase() != type ) return 
                                if(type != 'quize'&& testType.toLowerCase() != type ) return
                                return <tr style={{ textAlign: 'center' ,cursor:'pointer', borderLeft: state[testId] == true ? "3px solid #056699" : '3px solid transparent',backgroundColor:state[testId] == true ? "#0565991f" :  'white',borderBottom: '2px solid #f3f1f1d7' ,transition: '.3s'}} className="hovering-row" key={index} onClick={()=>{handleTestClicked(testId)}}>
                                            <td style={{padding: '10px' , margin: '5px 0' , border: 'none' }}>{title}</td>
                                            <td style={{padding: '10px' , margin: '5px 0' , border: 'none' }}>{testType}</td>
                                            <td style={{padding: '10px' , margin: '5px 0' , border: 'none' }}>{format(new Date(date), "yyyy / MM / dd")}</td>
                                        </tr>
                        })
                    }
                </tbody>
            </table>
    </div>
    )

}


function HeaderTests({typeTest,setTypeTest,setSelectedTestId,selectAllTest,unSelectTest}) {

    const handleTestTypeClicked = (type) => {
        setTypeTest(type)
        setSelectedTestId({})
    }
    return (
        <div style={{padding: '8px', paddingBottom: '0px' , backgroundColor: '#056699' , color: 'white',display: 'flex' , justifyContent: 'space-between'}}>
            <div>
                <span style={{marginLeft: '10px',cursor: 'pointer',fontWeight: typeTest == 'revision'? '500': '300'}} onClick={()=>{handleTestTypeClicked('revision')}}>Revision</span>
                <span style={{marginLeft: '10px',cursor: 'pointer',fontWeight: typeTest == 'exam'? '500': '300'}} onClick={()=>{handleTestTypeClicked('exam')}}>Exam</span>
                <span style={{marginLeft: '10px',cursor: 'pointer',fontWeight: typeTest == 'final'? '500': '300'}} onClick={()=>{handleTestTypeClicked('final')}}>Final</span>
            </div>
            
            <div style={{cursor: 'pointer'}} >
                <span onClick={selectAllTest}>Select All</span>
                <span onClick={unSelectTest} style={{marginLeft: '10px'}}>Unselect All</span>
            </div>
            
        </div>
    )

}