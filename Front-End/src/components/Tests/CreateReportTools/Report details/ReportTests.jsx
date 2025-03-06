/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { format } from "date-fns";
import { ReportTestsContainerStyle } from "../../style/styleTage";
import { useSelector } from "react-redux";

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
    return (            
        <section >
            <div style={{display: 'flex',justifyContent: 'space-between',marginBottom: '10px', alignItems: 'center'}}>
                <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>{type}</span>
                <div>
                    <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>Count : {test?.length || 0 }</span>
                    { percent != undefined && <span style={{padding: '5px 15px' , backgroundColor: 'white' , marginLeft: '5px'}}>Avg : {percent}</span>}
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

    console.log(test)
    const {title,date,subject,testId} = test ;

    function handleRemoveClicked(testId) {
        alert('here ' + testId)
        // needed to build the logic ( from back-end i need to remove test from report endpoint )
    }
    
    return (
        <div style={{padding: '10px' ,display: 'flex', justifyContent: 'space-between', borderRadius: '3px' , backgroundColor: 'white'}}>
            <div style={{display: 'flex' , alignItems: 'center' , justifyContent: 'center'}}>
                { manageMode ? <i className="bi bi-trash" style={{color: 'red',cursor: 'pointer' , marginLeft: '5px'}} onClick={()=> handleRemoveClicked(testId) }></i> : null }
                <span style={{fontSize: '15px'}}>{subject.subject} / {title}</span>
            </div>
            <span style={{fontSize: '15px' , textWrap: 'nowrap'}}>{format(new Date(date),'yyyy / MM / dd')} </span>
        </div>
    )
}