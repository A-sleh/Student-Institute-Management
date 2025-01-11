/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useLocation, useNavigate, useParams } from "react-router-dom";
import useStudentsMarkClass from "../../../../hooks/useStudentsMarkClass";
import { ButtonsContainerStyle, GoBackBtnStyle } from "../../../shared/style/styleTag";
import { TESTMARKCOLUMN } from "../columnsTools/TestMarlColumn";
import Table from "../../../shared/Table";
import { format } from "date-fns";
import { useMemo } from "react";
import { ShowAllTestTEXT } from "../../../../Data/static/test/CreateTestTools/ShowAllTestTEXT";
import { useSelector } from "react-redux";

export default function StudentTestDetails() {

    const {currentLange} = useSelector( state => state.language)
    const { backBtn ,studentTitle} = ShowAllTestTEXT[currentLange]
    
    const classDetailsEncode = useLocation().state 
    const classDetailsDecode = JSON.parse(decodeURIComponent(classDetailsEncode)) 
    const { title : classTitle,subject,date,testType,testId,classId} = classDetailsDecode
    const [studentsMarks] = useStudentsMarkClass(classId,testId,subject.maximumMark)
    const column = useMemo(() => [...TESTMARKCOLUMN,{Header : {arabic: 'العلامه',english: 'Mark'} , accessor: 'mark'}],[currentLange])
    const gotoPage = useNavigate()

    return (
        <>
            <Table column={column } data={studentsMarks||[]} showMainHeader={false}>
                <h3 style={{backgroundColor: '#066599',position: 'relative',padding: '20px 10px 0 10px' , textAlign: 'left' , color: 'white' , fontSize: '1.3em',fontWeight: '400'}}>
                    {subject.grade?.toLowerCase()} / {classTitle?.toLowerCase()} / {testType?.toLowerCase()} / {subject.subject?.toLowerCase()}
                    <span style={{position: 'absolute' , bottom: '0' , left: '50%'}} >{studentTitle}</span>
                    <span style={{float: 'right' }} >{format( new Date(date) , ' yyyy / MM / dd') }</span>
                </h3>
            </Table>

            <ButtonsContainerStyle>
                <GoBackBtnStyle onClick={()=>{gotoPage(-1)}} >{backBtn}</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </>
    )
}