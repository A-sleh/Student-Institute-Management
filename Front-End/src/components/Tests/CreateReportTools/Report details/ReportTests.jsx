/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { format } from "date-fns";
import { ReportTestsContainerStyle } from "../../style/styleTage";
import { useSelector } from "react-redux";
import DataServices from "../../../../Data/dynamic/DataServices";


export default function ReportTests({quiz,exam,manageMode = false }) {
    
    const {currentLange} = useSelector( state => state.language)
    return (
        <ReportTestsContainerStyle>
            <TestList  type={currentLange ? 'الأختبارات اليوميه': 'QUIZ'} numberOfTests={quiz.tests?.length || 0}>
                {
                    quiz.tests?.map((test,index)=> { return <TestCard test={test} key={index} manageMode={quiz?.selectedReport} /> })
                }
            </TestList>
            <TestList  type={currentLange ? 'المذاكرات ': 'EXAM'} percent={exam.Avg} numberOfTests={exam.tests?.length || 0} >
                {
                    exam.tests?.map((test,index)=> { return <TestCard test={test} key={index} manageMode={quiz?.selectedReport} /> })
                }
            </TestList>
        </ReportTestsContainerStyle>    
    )
}

function TestList({numberOfTests,type,percent,children}) {
    return (            
        <section >
            <div style={{display: 'flex',justifyContent: 'space-between',marginBottom: '10px', alignItems: 'center'}}>
                <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>{type}</span>
                <div>
                    <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>Count : { numberOfTests }</span>
                    { percent != undefined && <span style={{padding: '5px 15px' , backgroundColor: 'white' , marginLeft: '5px'}}>Avg : {percent}</span>}
                </div>
            </div>
            <main >{children}</main>
        </section>
    )
}

function TestCard({test,manageMode}) {

    const {title,date,subject,testId} = test ;

    function handleRemoveClicked(testId) {

        const removeTest = new Object()
        removeTest[testId] = null

        DataServices.LinkTestWithCurrentReport(manageMode,removeTest).then( _ => {
            alert(_.status)
            // successActionLogic(setSuccessLinkTest)
        })
    }
    
    return (
        <div style={{padding: '10px' ,display: 'flex', justifyContent: 'space-between', borderRadius: '3px' , backgroundColor: 'white'}}>
            <div style={{display: 'flex' , alignItems: 'center' , justifyContent: 'center'}}>
                { manageMode != undefined ? <i className="bi bi-trash" style={{color: 'red',cursor: 'pointer' , marginLeft: '5px'}} onClick={()=> handleRemoveClicked(testId) }></i> : null }
                <span style={{fontSize: '15px'}}>{subject.subject} / {title}</span>
            </div>
            <span style={{fontSize: '15px' , textWrap: 'nowrap'}}>{format(new Date(date),'yyyy / MM / dd')} </span>
        </div>
    )
}