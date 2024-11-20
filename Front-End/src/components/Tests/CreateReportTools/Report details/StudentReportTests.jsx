/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { NavigateSubHeaderStyle, StudentTestsContainerStyle } from "../../style/styleTage"
import { useLocation, useParams } from "react-router-dom"
import ShowTestTable from "../ShowTestTable"
import useClass from "../../../../hooks/useClass"
import HeaderInformation from "../../../shared/HeaderInformation"
import useGetStudentTestsInReport from "../../../../hooks/useGetStudentTestsInReport"

export default function StudentReportTests() {

    const studnetID = useParams().studentId 
    const studnetDetailsEncode = useLocation().state
    const studentDetailsDecoded = JSON.parse(decodeURIComponent(studnetDetailsEncode))
    const {reportId ,name ,lastName ,Mark ,TotalMark ,classId ,reportTitle} = studentDetailsDecoded
    const [Class] = useClass(classId)
    const [quiz,exam] = useGetStudentTestsInReport(studnetID,reportId)

    const headerList = [
        { value: 'Name', title: `${name} ${lastName}`, icon: "fa-solid fa-user-group"  } ,
        { value: 'Mark', title: `${Mark}`, icon: "bi bi-building-fill-exclamation"  } ,
        { value: 'Total Mark', title: `${TotalMark}`, icon: "fa-solid fa-graduation-cap"  } ,
    ]
    
    return (
        <div>

            <NavigateSubHeaderStyle >
                <span style={{width: '100%'}}>{Class.title} / {Class.grade} / {reportTitle} </span>
            </NavigateSubHeaderStyle >

            <HeaderInformation title={'Student Results'} data={headerList}/>
            
            <h3>Student Tests</h3>

            <StudentTestsContainerStyle >
                <ShowTestTable title={'Quizs'} tests={quiz.tests || [] } />
                <ShowTestTable title={'Exam'} tests={exam.tests || [] } />
            </StudentTestsContainerStyle> 
        </div>
    )
}