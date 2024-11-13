/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { HeightContainerAnimation } from "../../Tests/CreateTestTools/EmentsStyle"
import { InformationsCardStyle } from "../../shared/style/styleTag"
import addSpaceBetweenDigit from "../../Global/globalStyle"
import useStudentBalance from "../../../hooks/useStudentBalance"
import useStudentInfo from "../../../hooks/useStudentInfo"

export default function StudentInfoCard({studentId}) {

    const [studentInfo] = useStudentInfo(studentId)
    const [studentBillsBalance] = useStudentBalance(studentId)
    
    return (
        <div style={{width: '100%' , display: 'flex' ,flexDirection: 'column', flex: '.8' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Student Information</span>
            <HeightContainerAnimation>
                <InformationsCardStyle >
                    <div >
                        <h4>Name :   <span>{studentInfo?.name} {studentInfo?.lastName}</span></h4>
                        <h4>Father Name :   <span>{studentInfo?.fatherName}</span></h4>
                    </div>
                    <div >
                        <h4>Phone Number :  <span>{studentInfo?.phone}</span></h4>
                    </div>
                    <div >
                        <h4>Missed Days :<span>{studentInfo?.missedDays}</span></h4>
                    </div>
                    <div >
                        <h4>Bill Required :<span>{addSpaceBetweenDigit(studentInfo?.billRequired)}</span></h4>
                        <h4>Paid :<span>{addSpaceBetweenDigit(studentBillsBalance?.paid || 0)}</span></h4>
                    </div>
                    <div >
                        <h4>Remaining :<span>{addSpaceBetweenDigit(studentBillsBalance?.required || 0)}</span></h4>
                    </div>
                </InformationsCardStyle >   
            </HeightContainerAnimation> 
        </div>
    )
}