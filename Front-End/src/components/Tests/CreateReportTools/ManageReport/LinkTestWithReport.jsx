/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { createContext, lazy, Suspense, useMemo, useState } from "react"
import { NavigateSubHeaderStyle, QuizExamContainerStyle } from "../../style/styleTage"
import { errorActionLogic, separateTesetsAccordingToType, successActionLogic } from "../../../shared/logic/logic"
import { useParams} from "react-router-dom"
import DataServices from "../../../../Data/dynamic/DataServices"
import Notification from "../../../Global/Notification"
import useClassTests from "../../../../hooks/class_hooks/useClassTest"
import useClass from "../../../../hooks/class_hooks/useClass"
import Loader from "../../../Modal/Loader"
import { ManageReportTEXT } from "../../../../Data/static/test/CreateReportTools/ManageReportTEXT"
import { useSelector } from "react-redux"
import ReportTests from "../Report details/ReportTests"
import useGetReport from "../../../../hooks/report_hooks/useGetReport"
import  ShowAllReport from "./ShowAllReports"
import ManageSeletedTests from "./TestsShow/ManageSelectedTests"
import ControalButtons from "../../../shared/ControalButtons"

// shared data to deep components
export const SelectedReportContext = createContext({})
export const SuccessRemoveTestContext = createContext(null)

export default function LinkTestWithReport() {

    const {currentLange} = useSelector( state => state.language)
    const {confirmBtn,examType ,quizType ,successLinkTestMES ,errorLinkTestMES,successUnLinkTestMES} = ManageReportTEXT[currentLange]

    const classId = useParams().classId
    const [Class] = useClass(classId)
    const [selectedReport,setSelectedReport] = useState(null)
    const [selectedTestId,setSelectedTestId] = useState({})
    const [selectedQuizId,setSelectedQuizId] = useState({})
    const [successLinkTest,setSuccessLinkTest] = useState(false)
    const [successUnLinkTest,setSuccessUnLinkTest] = useState(false)
    const [wornining,setWornining] = useState(false)
    const [quiz,exam] = useClassTests(classId,successLinkTest,successUnLinkTest)
    const [currentReport] = useGetReport(selectedReport,successLinkTest,successUnLinkTest)
    const [selectedReportQuizs,selectedReportExams] = separateTesetsAccordingToType(currentReport?.tests || [])
    
    //Memoization section
    const ManageSeletedQuizMemo = useMemo(()=><ManageSeletedTests data={quiz}  type={quizType} selectionTest={selectedQuizId} setSelectionTest={setSelectedQuizId} /> ,[quiz,selectedQuizId,currentLange,successUnLinkTest])
    const ManageSeletedExamMemo = useMemo(()=><ManageSeletedTests data={exam}  type={examType} selectionTest={selectedTestId} setSelectionTest={setSelectedTestId} />,[exam,selectedTestId,currentLange,successUnLinkTest])


    function integrationTestsId() {
        let testIds = [];

        for (let key in selectedQuizId) 
            testIds.push(+key)
        for (let key in selectedTestId) 
            testIds.push(+key)

        return testIds
    }

    function handleCreateReportClicked() {

        let testIds = integrationTestsId()

        if( selectedReport == null || testIds.length == 0 ) {
            errorActionLogic(setWornining)
            return 
        }  
        DataServices.LinkTestWithCurrentReport(selectedReport,testIds).then( _ => {
            successActionLogic(setSuccessLinkTest)
        })
    }

    return (
        <Suspense fallback={<Loader />}>
            <Notification title={successLinkTestMES} type={'success'} state ={successLinkTest} setState={setSuccessLinkTest}/>
            <Notification title={successUnLinkTestMES} type={'success'} state ={successUnLinkTest} setState={setSuccessUnLinkTest}/>
            <Notification title={errorLinkTestMES} type={'error'} state ={wornining} setState={setWornining}/>

            <NavigateSubHeaderStyle >
                <span style={{width: '100%'}}>{Class.title} / {Class.grade}</span>
            </NavigateSubHeaderStyle >

            <SelectedReportContext.Provider value={{selectedReport,setSelectedReport}}>
                <ShowAllReport selectedReport={selectedReport} setSelectedReport={setSelectedReport} gradeId={Class?.gradeId || ''}/>
            </SelectedReportContext.Provider>

            <SuccessRemoveTestContext.Provider value={setSuccessUnLinkTest}>
                <ReportTests quiz={selectedReportQuizs} exam={selectedReportExams} manageMode={true} />
            </SuccessRemoveTestContext.Provider >
                
            <QuizExamContainerStyle >
                    {ManageSeletedQuizMemo}
                    {ManageSeletedExamMemo}
            </QuizExamContainerStyle>

            <ControalButtons titleBtn={confirmBtn} handleBtnClicked={handleCreateReportClicked}/>

        </Suspense>
    )
}
