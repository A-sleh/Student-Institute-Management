
import { useNavigate, useParams } from "react-router-dom"
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
            <div style={{display: 'flex' , gap: '20px' , marginBottom: '20px' , marginTop: '30px'}}>
                <TeacherInfo teacherId={teacherId}/>
                <TeacherClasses teacherId={teacherId}/>
            </div>
            <TeacherSubjects teacherId={teacherId}/>
            <TeacherBills teacherId={teacherId}/>
            <span className="update-class-btn" style={{ fontSize: '14px' , padding: '2px 20px' }} onClick={()=>{gotoPreviousPage(-1)}} >Back</span>
        </>
    )
}