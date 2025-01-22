/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useLocation, useNavigate, useParams } from "react-router-dom"
import { TESTCOLUMNS } from "../columnsTools/testColumns";
import { GoBackBtnStyle } from "../../../shared/style/styleTag";
import { createContext, useState } from "react";
import { NavigateSubHeaderStyle } from "../../style/styleTage";
import Notification from "../../../Global/Notification";
import Table from "../../../shared/Table";
import useGetSubjects from "../../../../hooks/subjects_hooks/useGetSubjects";
import useGetTests from "../../../../hooks/test_hooks/useGetTests";
import HeaderFiltersTests from "./HeaderFiltersTests";
import { useSelector } from "react-redux";
import { RecevingMarkesTEXT } from "../../../../Data/static/test/CreateTestTools/AssineMarke/RecevingMarkesTEXT";

export const FiltersSharedState = createContext()

export default function TestClassCurrent() {

    const {currentLange} = useSelector( state => state.language)
    const {backBtn ,testsTitle ,errorRecivingMarkMES,showCorrectionTestTitle ,showUnCorrectionTestTitle} = RecevingMarkesTEXT[currentLange]

    const classId = useParams().classId;
    const classDetailsEncode = useLocation().state
    const classDetailsDecode = JSON.parse(decodeURIComponent(classDetailsEncode))
    const {grade ,title : classTitle,fromShowPage} = classDetailsDecode
    const [subjects] = useGetSubjects(grade)
    const [markNotCorrectionYet,setMarkNotCorrectionYet] = useState(false)

    // filters states
    const [dateSearch,setDateSearch] = useState('')
    const [filterBySubject,setFilterBySubject] = useState('All')
    const [testType,setTestType] = useState('All') ;
    const [testState,setTestState] = useState(false)
    const [tests] = useGetTests(classId,true,testState,testType,filterBySubject,dateSearch,testState)
    const gotoPage = useNavigate()

    return (   
        <>     
            <Notification title={errorRecivingMarkMES} type={'error'} state ={markNotCorrectionYet} setState={setMarkNotCorrectionYet} />
            <FiltersSharedState.Provider value={{dateSearch,subjects,setDateSearch,filterBySubject,setFilterBySubject,testType,setTestType}}>
                <HeaderFiltersTests />
            </FiltersSharedState.Provider>

            <Table column={TESTCOLUMNS} data={tests} showMainHeader={false} url={`/Test/${fromShowPage ? 'StudentTestDetails': 'StudentMarkForm'}`} idKeyParams={'testId'}>
                <NavigateSubHeaderStyle>
                    {grade} / {classTitle} / {testsTitle}
                    <span style={{float: 'right'}}>
                        <button style={{backgroundColor: 'transparent' , border: 'none' , outline: 'none' , color: 'white',cursor: 'pointer', fontWeight: testState ? '300': '600' , marginLeft: '15px' , fontSize: '18px'}} onClick={()=>setTestState(false)}>{showCorrectionTestTitle}</button>
                        <button style={{backgroundColor: 'transparent' , border: 'none' , outline: 'none' , color: 'white',cursor: 'pointer', fontWeight: testState ?  '600': '300' , marginLeft: '15px' , fontSize: '18px'}} onClick={()=>setTestState(true)}>{showUnCorrectionTestTitle}</button>
                    </span>
                </NavigateSubHeaderStyle>
            </Table>

            <GoBackBtnStyle onClick={()=>{gotoPage(-1)}} >{backBtn}</GoBackBtnStyle>
        </>
    )
}
