import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { format } from "date-fns"
import Notification from "../../../Global/Notification"
import { ButtonsContainerStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../../shared/style/styleTag"
import { TESTMARKCOLUMN } from "../columnsTools/TestMarlColumn"
import Table from "../../../shared/Table"
import { errorActionLogic, successActionLogic } from "../../../shared/logic/logic"
import { NavigateSubHeaderStyle } from "../../style/styleTage"

export default function StudentMarkForm() {
    
    const classDetailsEncode = useLocation().state
    const classDetailsDecode = JSON.parse(decodeURIComponent(classDetailsEncode))
    const { title : classTitle,subject,date,testType,classId} = classDetailsDecode
    const [marks,setMarks] = useState({})
    
    const columns =  useMemo(()=>[
        ...TESTMARKCOLUMN
        ,{
            Header : 'Action' ,
            Cell : ({row}) => {
                const { testMarkId } = row.original
                return <RowTest handleInputChange={handleInputChange} marks={marks} testMarkId={testMarkId} key={row.id}/>
            } 
        }

    ],[marks])
    
    const [studentTest,setStudentTest] = useState([])
    const [negativeFiled,setNegativeFiled] = useState(false)
    const [successAssigne,setSuccessAssigne] = useState(false)

    const gotoPage = useNavigate()
    const Ref = useRef(null)
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
                successActionLogic(setSuccessAssigne)
            })
        }else {
            errorActionLogic(setNegativeFiled)
        }
    }

    function abdo(e) {
        const fofo = setInterval((e) => {
            e.focus()
        } , 1000 )  
        Ref.current = fofo
    }

    function handleInputChange(newValue,testMarkId,inputRef) {
        let newMaksObj = new Map() 
        newMaksObj = {...marks}
        newMaksObj[testMarkId] = newValue.value
        setMarks(newMaksObj)
        inputRef.current?.focus()
    }

    // inputRef?.focus()
    
    return (
        <>ShowClassDetails
            <Notification  title={'All mark must be positive'} type={'error'} state ={negativeFiled} setState={setNegativeFiled}/>
            <Notification  title={'Assinge marks'} type={'success'} state ={successAssigne} setState={setSuccessAssigne}/>
            <Table column={columns} data={studentTest||[]} showMainHeader={false}>
                <NavigateSubHeaderStyle>
                    {subject.grade.toLowerCase()} / {classTitle.toLowerCase()} / {testType.toLowerCase()} / {subject.subject.toLowerCase()}
                    <span style={{position: 'absolute' , bottom: '0' , left: '50%'}} >students</span>
                    <span style={{float: 'right' }} >{format( new Date(date) , ' yyyy / MM / dd') }</span>
                </NavigateSubHeaderStyle>
            </Table>

            <ButtonsContainerStyle>
                <SubmitBtnStyle onClick={()=>{handleConfirmclicked()}}>Confirm</SubmitBtnStyle>
                <GoBackBtnStyle onClick={()=>{gotoPage(-1)}} >Back</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </>
    )
}

function RowTest({handleInputChange,marks,testMarkId}){
    const inputRef = useRef(null)
    
    
    return <input type="text" value={marks[testMarkId]} ref={inputRef} onChange={(e)=>{handleInputChange(e.target.value,testMarkId,inputRef)}} style={{border: 'none' ,textAlign: 'center', outline: 'none' , padding: '10px'}} />
}