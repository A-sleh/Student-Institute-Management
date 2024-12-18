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
import useGetSubjects from "../../../../hooks/useGetSubjects";
import useGetTests from "../../../../hooks/useGetTests";
import HeaderFiltersTests from "./HeaderFiltersTests";

export const FiltersSharedState = createContext()

export default function TestClassCurrent() {

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
            <Notification title={'The mark not correction yet'} type={'error'} state ={markNotCorrectionYet} setState={setMarkNotCorrectionYet} />
            <FiltersSharedState.Provider value={{dateSearch,subjects,setDateSearch,filterBySubject,setFilterBySubject,testType,setTestType}}>
                <HeaderFiltersTests />
            </FiltersSharedState.Provider>

            <Table column={TESTCOLUMNS} data={tests} showMainHeader={false} url={`/Test/${fromShowPage ? 'StudentTestDetails': 'StudentMarkForm'}`} idKeyParams={'testId'}>
                <NavigateSubHeaderStyle>
                    {grade} / {classTitle} / Tests
                    <span style={{float: 'right'}}>
                        <button style={{backgroundColor: 'transparent' , border: 'none' , outline: 'none' , color: 'white',cursor: 'pointer', fontWeight: testState ? '300': '500' , marginLeft: '15px' , fontSize: '18px'}} onClick={()=>setTestState(false)}>Show correction test</button>
                        <button style={{backgroundColor: 'transparent' , border: 'none' , outline: 'none' , color: 'white',cursor: 'pointer', fontWeight: testState ?  '500': '300' , marginLeft: '15px' , fontSize: '18px'}} onClick={()=>setTestState(true)}>Show uncorrection test</button>
                    </span>
                </NavigateSubHeaderStyle>
            </Table>

            <GoBackBtnStyle onClick={()=>{gotoPage(-1)}} >Back</GoBackBtnStyle>
        </>
    )
}
