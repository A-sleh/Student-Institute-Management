/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { StudentInformationTEXT } from "../../../Data/static/Students/StudentsInformation/StudentInformationTEXT"
import { HeightContainerAnimation } from "../../shared/style/styleTag" 
import { InformationsCardStyle } from "../../shared/style/styleTag"
import { useSelector } from "react-redux";
import addSpaceBetweenDigit from "../../Global/globalStyle"
import useStudentBalance from "../../../hooks/useStudentBalance"
import useStudentInfo from "../../../hooks/useStudentInfo"

export default function StudentInfoCard({studentId}) {

    const {currentLange} = useSelector( state => state.language)
    const {studetnTitle ,studentName ,fatherName ,phone ,missedDay ,billRequired ,padinBill ,remaining} = StudentInformationTEXT[currentLange]
    const [studentInfo] = useStudentInfo(studentId)
    const [studentBillsBalance] = useStudentBalance(studentId)
    
    return (
        <div style={{width: '100%' , display: 'flex' ,flexDirection: 'column', flex: '1.2' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>{studetnTitle}</span>
            <HeightContainerAnimation>
                <InformationsCardStyle >
                    <div >
                        <h4>{studentName} :   <span> {studentInfo?.name} {studentInfo?.lastName}</span></h4>
                        <h4>{fatherName} :   <span> {studentInfo?.fatherName}</span></h4>
                    </div>
                    <div >
                        <h4>{phone} :  <span> {studentInfo?.phone}</span></h4>
                    </div>
                    <div >
                        <h4>{missedDay} : <span> {studentInfo?.missedDays}</span></h4>
                    </div>
                    <div >
                        <h4>{billRequired} : <span >{addSpaceBetweenDigit(studentInfo?.billRequired,currentLange)}</span></h4>
                        <h4>{padinBill} : <span style={{direction: 'ltr'}}>{addSpaceBetweenDigit(studentBillsBalance?.paid || 0,currentLange)}</span></h4>
                    </div>
                    <div >
                        <h4>{remaining} : <span>{addSpaceBetweenDigit(studentBillsBalance?.required || 0,currentLange)}</span></h4>
                    </div>
                </InformationsCardStyle >   
            </HeightContainerAnimation> 
        </div>
    )
}