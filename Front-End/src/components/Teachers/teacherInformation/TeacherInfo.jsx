/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { HeightContainerAnimation } from "../../shared/style/styleTag"; 
import { InformationsCardStyle } from "../../shared/style/styleTag";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import useGetTeacherBillBalance from "../../../hooks/teacher_hooks/useGetTeacherBillBalance";
import useTeacherInfo from "../../../hooks/teacher_hooks/useTeacherInfo";
import { useSelector } from "react-redux";
import { TeacherInformationTEXT } from "../../../Data/static/teachers/teachersDetails/TeacherInformationTEXT";

export default function TeacherInfo({teacherId}) {

    const {currentLange} = useSelector( state => state.language)
    const {teacherName,teacherTitle ,phoneNumber ,paidBill ,remainingBill ,totalBalance} = TeacherInformationTEXT[currentLange]

    const [teacherDetails] = useTeacherInfo(teacherId) ;
    const [teacherSalary] = useGetTeacherBillBalance(teacherId)
    
    const { name , lastName , phone } = teacherDetails ;

    return(
        <div style={{width: '100%' , display: 'flex' , flexDirection: 'column', flex: '.5' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>{teacherTitle}</span>
            <HeightContainerAnimation>
                <InformationsCardStyle >
                    <div >
                        <h4>{teacherName} :   <span>{name} {lastName}</span></h4>
                    </div>
                    <div >
                        <h4>{phoneNumber} :  <span>{phone}</span></h4>
                    </div>
                    <div >
                        <h4>{totalBalance} : <span >{addSpaceBetweenDigit(teacherSalary.total,currentLange)}</span></h4>
                    </div>
                    <div >
                        <h4>{remainingBill} : <span >{addSpaceBetweenDigit(teacherSalary.required,currentLange)}</span></h4>
                    </div>
                    <div >
                        <h4>{paidBill} : <span >{addSpaceBetweenDigit(teacherSalary.paid,currentLange)}</span></h4>
                    </div>
                </InformationsCardStyle >   
            </HeightContainerAnimation> 
        </div>
    )
}

