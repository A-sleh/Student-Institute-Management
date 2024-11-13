import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { format } from "date-fns"
import Notification from "../../../Global/Notification"
import { ButtonsContainerStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../../shared/style/styleTag"
import { TESTMARKCOLUMN } from "../columnsTools/TestMarlColumn"
import Table from "../../../shared/Table"

export default function StudentMarkForm() {

    const classDetailsEncode = useLocation().state
    const classDetailsDecode = JSON.parse(decodeURIComponent(classDetailsEncode))
    const { title : classTitle,subject,date,testType,classId} = classDetailsDecode
    const inputRef = useRef([])

    const columns =  useMemo(()=>[
        ...TESTMARKCOLUMN
        ,{
            Header : 'Action' ,
            Cell : ({row}) => {
                const {mark} = row.original
                return <input type="text" value={mark} onChange={(e)=>{handleInputChange(e)}} style={{border: 'none' ,textAlign: 'center', outline: 'none' , padding: '10px'}} />
            } 
        }

    ],[])
    
    const [studentTest,setStudentTest] = useState([])
    const [negativeFiled,setNegativeFiled] = useState(false)
    const [successAssigne,setSuccessAssigne] = useState(false)

    const gotoPage = useNavigate()
    const testId = useParams().testId
    
    
    useEffect(() => {
        DataServices.ShowStudentsMarksInOneClass(classId,testId).then(students => {
            setStudentTest(students.map(student=>({...student,maximumMark:subject.maximumMark})))
            let testMark = new Map() ;
            students.forEach( stduent => {
                testMark[stduent.testMarkId] = stduent.mark || 0
            })
            setMarks(testMark)
        })
    } , [])

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
            <Table column={columns} data={studentTest||[]} showMainHeader={false}>
                <h3 style={{backgroundColor: '#066599',position: 'relative',padding: '20px 10px 0 10px' , textAlign: 'left' , color: 'white' , fontSize: '1.3em',fontWeight: '400'}}>
                    {subject.grade.toLowerCase()} / {classTitle.toLowerCase()} / {testType.toLowerCase()} / {subject.subject.toLowerCase()}
                    <span style={{position: 'absolute' , bottom: '0' , left: '50%'}} >students</span>
                    <span style={{float: 'right' }} >{format( new Date(date) , ' yyyy / MM / dd') }</span>
                </h3>
            </Table>

            <ButtonsContainerStyle>
                <SubmitBtnStyle onClick={()=>{handleConfirmclicked()}}>Confirm</SubmitBtnStyle>
                <GoBackBtnStyle onClick={()=>{gotoPage(-1)}} >Back</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </>
    )
}