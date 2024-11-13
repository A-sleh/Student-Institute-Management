/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useNavigate, useParams } from "react-router-dom"
import { HeightContainerAnimation } from "../../Tests/CreateTestTools/EmentsStyle";
import { FlexContainerStyle, GoBackBtnStyle } from "../../shared/style/styleTag";
import Title from "../../Global/Title"
import TeacherBills from "./TeacherBills";
import TeacherInfo from "./TeacherInfo";
import TeacherClasses from "./TeacherClasses";
import TeacherSubjects from "./TeacherSubjects";

export default function TeacherInformation() {

    const teacherId = useParams().info ; 
    const gotoPreviousPage = useNavigate();

    return(
        <>
            <Title title={window.location.pathname} />
            <FlexContainerStyle>
                <TeacherInfo teacherId={teacherId}/>
                <TeacherClasses teacherId={teacherId}/>
            </FlexContainerStyle>
            <HeightContainerAnimation delay={'.5s'}>
                <TeacherSubjects teacherId={teacherId}/>
            </HeightContainerAnimation>

            <HeightContainerAnimation delay={'.8s'}>
                <TeacherBills teacherId={teacherId}/>
            </HeightContainerAnimation>
            <GoBackBtnStyle onClick={()=>{gotoPreviousPage(-1)}} >Back</GoBackBtnStyle>
        </>
    )
}