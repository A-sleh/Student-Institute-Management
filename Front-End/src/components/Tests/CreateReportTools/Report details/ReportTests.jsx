/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { format } from "date-fns";
import { ReportTestsContainerStyle } from "../../style/styleTage";
import { useSelector } from "react-redux";
import DataServices from '../../../../Data/dynamic/DataServices'
import { useContext } from "react";
import { SuccessRemoveTestContext } from "../ManageReport/LinkTestWithReport";
import { getDateOnly, successActionLogic } from "../../../shared/logic/logic";


export default function ReportTests({quiz,exam,manageMode = false }) {
    
    const {currentLange} = useSelector( state => state.language)

    return (
        <ReportTestsContainerStyle>
            <TestList test={quiz.tests} type={currentLange ? 'الأختبارات اليوميه': 'QUIZ'} manageMode={manageMode} />
            <TestList test={exam.tests} type={currentLange ? 'المذاكرات ': 'EXAM'} percent={exam.Avg} manageMode={manageMode}  />
        </ReportTestsContainerStyle>    
    )
}

function TestList({test,type,percent,manageMode }) {


    const {currentLange} = useSelector( state => state.language)

    return (            
        <section >
            <div style={{display: 'flex',justifyContent: 'space-between',marginBottom: '10px', alignItems: 'center'}}>
                <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>{type}</span>
                <div>
                    <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>{currentLange ? 'العدد': 'Count'} : {test?.length || 0 }</span>
                    { percent != undefined && <span style={{padding: '5px 15px' , backgroundColor: 'white' , marginLeft: '5px'}}>{currentLange ? 'المعدل': 'Avg'} : {percent}</span>}
                </div>
            </div>
            <main >
                {
                    test?.map((test,index)=> {
                        return <TestCard test={test} key={index} manageMode={manageMode} />
                    })
                }
            </main>
        </section>
    )
}

function TestCard({test,manageMode}) {

    const setSuccessUnLinkTest = useContext(SuccessRemoveTestContext)
    const {title,date,subject} = test ;
    
    function handleRemoveClicked(test) {
    
        DataServices.RemoveTestFromCurrentReport(test).then( _ => {
            successActionLogic(setSuccessUnLinkTest)
        })
    }
    
    return (
        <div style={{padding: '10px' ,display: 'flex', justifyContent: 'space-between', borderRadius: '3px' , backgroundColor: 'white'}}>
            <div style={{display: 'flex' , alignItems: 'center' , justifyContent: 'center'}}>
                { manageMode ? <i className="bi bi-trash" style={{color: 'red',cursor: 'pointer' , marginLeft: '5px'}} onClick={()=> handleRemoveClicked(test) }></i> : null }
                <span style={{fontSize: '15px'}}>{subject.subject} / {title}</span>
            </div>
            <span style={{fontSize: '15px' , textWrap: 'nowrap'}}>{format(getDateOnly(date),'yyyy / MM / dd')} </span>
        </div>
    )
}