/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { format } from "date-fns"
import { ButtonsContainerStyle, GoBackBtnStyle, InputStyle, SubmitBtnStyle } from "../../../shared/style/styleTag"
import { TESTMARKCOLUMN } from "../columnsTools/TestMarlColumn"
import { errorActionLogic, successActionLogic } from "../../../shared/logic/logic"
import { NavigateSubHeaderStyle } from "../../style/styleTage"
import DataServices from "../../../../Data/dynamic/DataServices"
import Notification from "../../../Global/Notification"
import Table from "../../../shared/Table"
import useTestMarkStudents from "../../../../hooks/Test_hooks/useTestMarkStudents"
import { useSelector } from "react-redux"
import { StudentMarkFormTEXT } from "../../../../Data/static/test/CreateTestTools/AssineMarke/StudentMarkFormTEXT"

export default function StudentMarkForm() {
    
    const {currentLange} = useSelector( state => state.language)
    const {backBtn,confirmBtn ,studentsTitle ,successAssignTheMarkMES ,errorAssignTheMarkMES} = StudentMarkFormTEXT[currentLange]

    const testId = useParams().testId
    const classDetailsEncode = useLocation().state
    const gotoPage = useNavigate()
    const classDetailsDecode = JSON.parse(decodeURIComponent(classDetailsEncode))
    const { title : classTitle,subject,date,testType,classId} = classDetailsDecode
    // Notification states 
    const [negativeFiled,setNegativeFiled] = useState(false)
    const [successAssigne,setSuccessAssigne] = useState(false)
    // data states
    const inputRef = useRef(null)
    const [testDate,setTestDate] = useState(format(new Date() , 'yyyy-MM-dd'))
    const [inputId,setInputId] = useState(-1)
    const [_,setReRender] = useState(0)
    const [studentTest,marks,setMarks] = useTestMarkStudents(classId,testId,subject.maximumMark)
    
    const columns =  useMemo(()=>[
        ...TESTMARKCOLUMN
        ,{
            Header : {
                arabic: 'العلامه' ,
                english: 'Mark'
            } ,
            accessor: 'marks',
            Cell : ({row}) => {
                const { testMarkId } = row.original
                return <input type="text" value={marks[testMarkId]} ref={ inputId == row.id  ? inputRef : undefined } onClick={()=>setInputId(row.id)} onChange={(e)=>{handleInputChange(e.target.value,testMarkId)}} style={{border: 'none' ,textAlign: 'center', outline: 'none' , padding: '10px'}} /> 
            } 
        }

    ],[marks,inputId,currentLange])

    // to keep focus on the input field
    useEffect(()=>{setReRender(1)},[marks,inputId])

    function validMarkInput() {
        const keys = Object.keys(marks) 
        const value = Object.values(marks) 
        let markStatus = new Map()
        let notValid = 0 ; 

        for(let i = 0 ; i < keys.length ; ++ i ) {
            markStatus[keys[i]] = value[i] < 0 ;
            notValid |= (value[i] <= 0 ) ;
        }

        return !notValid ;
    }

    function convertKeyToChar() {

        const keys = Object.keys(marks) 
        const value = Object.values(marks) 
        let mark = new Map()
        
        keys.map((key,index) => {
            console.log(key,value[index])
            mark[`"${key}"`] = value[index]
        })

        return mark
    }

    function handleConfirmclicked() {
        const doRquest = validMarkInput() ; 
        
        if(doRquest) {
            DataServices.AssingeMarkToTheTest(convertKeyToChar(marks),testId,testDate).then( _ => {
                successActionLogic(setSuccessAssigne)
            })
        }else {
            errorActionLogic(setNegativeFiled)
        }
    }

    function handleInputChange(newValue,testMarkId) {
        let newMaksObj = new Map() 
        newMaksObj = {...marks}
        newMaksObj[testMarkId] = newValue
        setMarks(newMaksObj)
    }

    inputRef.current?.focus()
    
    return (
        <>
            <Notification  title={errorAssignTheMarkMES} type={'error'} state ={negativeFiled} setState={setNegativeFiled}/>
            <Notification  title={successAssignTheMarkMES} type={'success'} state ={successAssigne} setState={setSuccessAssigne}/>
            <Table column={columns} data={studentTest||[]} showMainHeader={false}>
                <NavigateSubHeaderStyle>
                    {subject.grade?.toLowerCase()} / {classTitle?.toLowerCase()} / {testType?.toLowerCase()} / {subject.subject?.toLowerCase()}
                    <span style={{position: 'absolute' , bottom: '0' , left: '50%'}} >{studentsTitle}</span>
                    <span style={{float: 'right' }} >{format( new Date(date) , ' yyyy / MM / dd') }</span>
                </NavigateSubHeaderStyle>
                <InputStyle type={'date'} style={{width: '100%'}} value={testDate} onChange={(e) => setTestDate(e.target.value)}/>
            </Table>

            <ButtonsContainerStyle>
                <SubmitBtnStyle onClick={()=>{handleConfirmclicked()}}>{confirmBtn}</SubmitBtnStyle>
                <GoBackBtnStyle onClick={()=>{gotoPage(-1)}} >{backBtn}</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </>
    )
}
