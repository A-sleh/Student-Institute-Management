/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { format } from "date-fns";
import { ReportTestsContainerStyle } from "../../style/styleTage";
import { useSelector } from "react-redux";

export default function ReportTests({quiz,exam}) {
    
    const {currentLange} = useSelector( state => state.language)
    return (
        <ReportTestsContainerStyle>
            <TestList test={quiz.tests} type={currentLange ? 'الأختبارات اليوميه': 'QUIZ'} percent={quiz.Avg}/>
            <TestList test={exam.tests} type={currentLange ? 'المذاكرات ': 'EXAM'} percent={exam.Avg}/>
        </ReportTestsContainerStyle>    
    )
}

function TestList({test,type,percent}) {
    return (            
        <section >
            <div style={{display: 'flex',justifyContent: 'space-between',marginBottom: '10px', alignItems: 'center'}}>
                <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>{type}</span>
                <div>
                    <span style={{padding: '5px 15px' , backgroundColor: 'white'}}>Count : {test?.length || 0 }</span>
                    <span style={{padding: '5px 15px' , backgroundColor: 'white' , marginLeft: '5px'}}>Avg : {percent}</span>
                </div>
            </div>
            <main >
                {
                    test?.map((test,index)=> {
                        return <TestCard test={test} key={index} />
                    })
                }
            </main>
        </section>
    )
}

function TestCard({test}) {

    const {title,date,subject} = test ;
    
    return (
        <div style={{padding: '10px' ,display: 'flex', justifyContent: 'space-between', borderRadius: '3px' , backgroundColor: 'white'}}>
            <span>{subject.subject} / {title}</span>
            <span>{format(new Date(date),'yyyy / MM / dd')} </span>
        </div>
    )
}