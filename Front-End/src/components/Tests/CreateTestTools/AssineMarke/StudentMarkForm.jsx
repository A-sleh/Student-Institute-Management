/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { format } from "date-fns"
import { ButtonsContainerStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../../shared/style/styleTag"
import { TESTMARKCOLUMN } from "../columnsTools/TestMarlColumn"
import { errorActionLogic, successActionLogic } from "../../../shared/logic/logic"
import { NavigateSubHeaderStyle } from "../../style/styleTage"
import DataServices from "../../../../Data/dynamic/DataServices"
import Notification from "../../../Global/Notification"
import Table from "../../../shared/Table"
import useTestMarkStudents from "../../../../hooks/Test_hooks/useTestMarkStudents"

export default function StudentMarkForm() {
    
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
    const [inputId,setInputId] = useState(-1)
    const [_,setReRender] = useState(0)
    const [studentTest,marks,setMarks] = useTestMarkStudents(classId,testId,subject.maximumMark)
    
    const columns =  useMemo(()=>[
        ...TESTMARKCOLUMN
        ,{
            Header : 'Action' ,
            Cell : ({row}) => {
                const { testMarkId } = row.original
                console.log(inputId ,row.id )
                return <input type="text" value={marks[testMarkId]} ref={ inputId == row.id  ? inputRef : undefined } onClick={()=>setInputId(row.id)} onChange={(e)=>{handleInputChange(e.target.value,testMarkId)}} style={{border: 'none' ,textAlign: 'center', outline: 'none' , padding: '10px'}} /> 
            } 
        }

    ],[marks,inputId])

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

    function handleInputChange(newValue,testMarkId) {
        let newMaksObj = new Map() 
        newMaksObj = {...marks}
        newMaksObj[testMarkId] = newValue
        setMarks(newMaksObj)
    }

    inputRef.current?.focus()
    
    return (
        <>
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
