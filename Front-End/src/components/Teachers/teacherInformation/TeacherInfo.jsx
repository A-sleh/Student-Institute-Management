/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { HeightContainerAnimation } from "../../Tests/CreateTestTools/EmentsStyle";
import { InformationsCardStyle } from "../../shared/style/styleTag";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import useGetTeacherBillBalance from "../../../hooks/useGetTeacherBillBalance";
import useTeacherInfo from "../../../hooks/useTeacherInfo";

export default function TeacherInfo({teacherId}) {

    const [teacherDetails] = useTeacherInfo(teacherId) ;
    const [teacherSalary] = useGetTeacherBillBalance(teacherId)
    
    const { name , lastName , phone } = teacherDetails ;

    return(
        <div style={{width: '100%' , display: 'flex' , flexDirection: 'column', flex: '.5' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Teacher Information</span>
            <HeightContainerAnimation>
                <InformationsCardStyle >
                    <div >
                        <h4>Name :   <span>{name} {lastName}</span></h4>
                    </div>
                    <div >
                        <h4>Phone Number :  <span>{phone}</span></h4>
                    </div>
                    <div >
                        <h4>Toatal Amount :<span>{addSpaceBetweenDigit(teacherSalary.total)}</span></h4>
                    </div>
                    <div >
                        <h4>Remaining :<span>{addSpaceBetweenDigit(teacherSalary.required)}</span></h4>
                    </div>
                    <div >
                        <h4>Paid :<span>{addSpaceBetweenDigit(teacherSalary.paid)}</span></h4>
                    </div>
                </InformationsCardStyle >   
            </HeightContainerAnimation> 
        </div>
    )
}

