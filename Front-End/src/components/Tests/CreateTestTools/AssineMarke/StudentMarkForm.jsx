import { useEffect, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"
import { format } from "date-fns"
import Notification from "../../../Global/Notification"

export default function StudentMarkForm() {

    const [studentTest,setStudentTest] = useState([])
    const [marks,setMarks] = useState({})
    const [negativeFiled,setNegativeFiled] = useState(false)
    const [successAssigne,setSuccessAssigne] = useState(false)
    const [marksValid,setMarksValid] = useState({})
    const gotoPage = useNavigate()
    const testId = useParams().testId
    const {classId,testType,date,grade,classTitle,subject} = useLocation().state
    
    
    useEffect(() => {
        DataServices.ShowStudentsMarksInOneClass(classId,testId).then(students => {
            setStudentTest(students)
            let testMark = new Map() ;
            students.forEach( stduent => {
                testMark[stduent.testMarkId] = stduent.mark || 0
            })
            setMarks(testMark)
        })
    } , [])

    function handleMarkChange(newMark,testMarkId) {
        let newMarks = {...marks} ; 
        newMarks[testMarkId] = newMark
        setMarks(newMarks)
    }

    function validMarkInput() {
        const keys = Object.keys(marks) 
        const value = Object.values(marks) 
        let markStatus = new Map()
        let notValid = 0 ; 

        for(let i = 0 ; i < keys.length ; ++ i ) {
            markStatus[keys[i]] = value[i] < 0 ;
            notValid |= (value[i] < 0 ) ;
        }

        setMarksValid(markStatus)

        return !notValid ;
    }

    function assingeMarkToTheTest(marks) {
        return new Promise( resolve => {
            const testMarkIds = Object.keys(marks) 
            const mark = Object.values(marks)     
            for(let i = 0 ; i < testMarkIds.length ; ++ i ) {
                DataServices.AssingeMarkToTheTest(testMarkIds[i],mark[i])
                if( i == testMarkIds.length - 1 ) {
                    resolve('done')
                }
            }
        })
    }

    function handleConfirmclicked() {
        const doRquest = validMarkInput() ; 

        if(doRquest) {
            assingeMarkToTheTest(marks).then( _ => {
                setSuccessAssigne(true)
                setTimeout(() => {
                    setSuccessAssigne(false)
                } , 2000 )
            })
        }else {
            setNegativeFiled(true)
            setTimeout(() => {
                setNegativeFiled(false)
            } , 2000 )
        }
    }
    
    return (
        <>
            <Notification  title={'All mark must be positive'} type={'error'} state ={negativeFiled} setState={setNegativeFiled}/>
            <Notification  title={'Assinge marks'} type={'success'} state ={successAssigne} setState={setSuccessAssigne}/>
            <h3 style={{backgroundColor: '#066599',position: 'relative',padding: '20px 10px 0 10px' , textAlign: 'left' , color: 'white' , fontSize: '1.3em',fontWeight: '400'}}>
                {grade.toLowerCase()} / {classTitle.toLowerCase()} / {testType.toLowerCase()} / {subject.toLowerCase()}
                <span style={{position: 'absolute' , bottom: '0' , left: '50%'}} >students</span>
                <span style={{float: 'right' }} >{format( new Date(date) , ' yyyy / MM / dd') }</span>
            </h3>
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
                <table>
                    <thead  style={{position: 'relative' , top: '-10px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Count</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Name</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Father Name</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentTest.map( (studnetT,index) => {  
                                const {mark,testMarkId,student} = studnetT  
                                return (
                                    <tr className="hovering-row" style={{backgroundColor:  marksValid[testMarkId] ? '#ff00003b': index % 2 == 0 ? 'white' : '#f3f1f1d7' }}>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none'  }}>{index + 1}</td>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none'  }}>{student.name} {student.lastName}</td>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none'  }}>{student.fatherName}</td>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none'  }}> <input type="text" value={marks[testMarkId]} onChange={(e)=>{handleMarkChange(e.target.value,testMarkId)}} style={{border: 'none',backgroundColor: marksValid[testMarkId] ? 'transparent': index % 2  ? 'white' : '#f3f1f1d7' ,textAlign: 'center', outline: 'none' , padding: '10px'}}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div style={{display: 'flex' , gap: '5px'}}>
            <button style={{padding: '4px 15px' , cursor: 'pointer' , backgroundColor: '#066599' , border: 'none' , outline: 'none' ,fontWeight: '500' , borderRadius: '4px' , color : 'white' , margin: '10px 0'}} onClick={()=>{handleConfirmclicked()}}>Confirm</button>
                <button onClick={()=>{gotoPage(-1)} } style={{padding: '4px 20px',cursor: 'pointer' , color: 'white' , backgroundColor: 'red' , border: 'none' , outline: 'none' , borderRadius: '2px' , margin: '10px 0'}}>Back</button>
            </div>
        </>
    )
}