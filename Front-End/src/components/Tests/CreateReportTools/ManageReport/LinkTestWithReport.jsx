/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { createContext, lazy, Suspense, useMemo, useState } from "react"
import { NavigateSubHeaderStyle, QuizExamContainerStyle } from "../../style/styleTage"
import { errorActionLogic, successActionLogic } from "../../../shared/logic/logic"
import { useParams} from "react-router-dom"
import DataServices from "../../../../Data/dynamic/DataServices"
import Notification from "../../../Global/Notification"
import useClassTests from "../../../../hooks/useClassTest"
import useClass from "../../../../hooks/useClass"
import Loader from "../../../Modal/Loader"
const  ControalButtons =  lazy(() => import( "../../../shared/ControalButtons"))
const  ManageSeletedTests =  lazy(() => import( "./TestsShow/ManageSelectedTests"))
const  ShowAllReport =  lazy(() => import(  "./ShowAllReports"))

// shared data to deep components
export const SelectedReportContext = createContext({})

export default function LinkTestWithReport() {

    const classId = useParams().classId
    const [Class] = useClass(classId)
    const [selectedReport,setSelectedReport] = useState(null)
    const [selectedTestId,setSelectedTestId] = useState({})
    const [selectedQuizId,setSelectedQuizId] = useState({})
    const [successLinkTest,setSuccessLinkTest] = useState(false)
    const [wornining,setWornining] = useState(false)
    const [quiz,exam] = useClassTests(classId,true,successLinkTest)
    
    //Memoization section
    const ManageSeletedQuizMemo = useMemo(()=><ManageSeletedTests data={quiz}  type={'Quiz'} selectionTest={selectedQuizId} setSelectionTest={setSelectedQuizId} /> ,[quiz,selectedQuizId])
    const ManageSeletedExamMemo = useMemo(()=><ManageSeletedTests data={exam}  type={'Exam'} selectionTest={selectedTestId} setSelectionTest={setSelectedTestId} />,[exam,selectedTestId])

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
            <Notification title={'Link test with report'} type={'success'} state ={successLinkTest} setState={setSuccessLinkTest}/>
            <Notification title={'You must select reporat ,And some tests'} type={'error'} state ={wornining} setState={setWornining}/>

            <NavigateSubHeaderStyle >
                <span style={{width: '100%'}}>{Class.title} / {Class.grade}</span>
            </NavigateSubHeaderStyle >

            <SelectedReportContext.Provider value={{selectedReport,setSelectedReport}}>
                <ShowAllReport selectedReport={selectedReport} setSelectedReport={setSelectedReport}/>
            </SelectedReportContext.Provider>

            <QuizExamContainerStyle >
                {ManageSeletedQuizMemo}
                {ManageSeletedExamMemo}
            </QuizExamContainerStyle>

            <ControalButtons titleBtn={'Confirm'} handleBtnClicked={handleCreateReportClicked}/>

        </Suspense>
    )
}
