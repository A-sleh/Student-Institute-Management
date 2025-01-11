import { useSelector } from "react-redux";
import { TeacherNewSubjectTEXT } from "../../../Data/static/teachers/ManageTeacher/TeacherNewSubjectTEXT";
import { TeacherHeaderSubDetailsStyle } from "../style/styleTags";

export function TeacherSubDetails({teacherDetails}) {

    const {currentLange} = useSelector( state => state.language)
    const { subjectsNumber ,phoneNumber ,teacherName ,teacherLastName } = TeacherNewSubjectTEXT[currentLange]
    const { name , lastName ,  phone , teacherSubjects } = teacherDetails ;

    return (
        <TeacherHeaderSubDetailsStyle>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>{teacherName} <span style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{name} </span></h4>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>{teacherLastName} <span  style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{lastName}</span></h4>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>{phoneNumber} <span  style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{phone}</span></h4>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>{subjectsNumber} <span  style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{teacherSubjects?.length}</span></h4>
        </TeacherHeaderSubDetailsStyle>
    )
}