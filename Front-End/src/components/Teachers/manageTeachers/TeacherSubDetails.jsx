import { TeacherHeaderSubDetailsStyle } from "../style/styleTags";

export function TeacherSubDetails({teacherDetails}) {

    const { name , lastName ,  phone , teacherSubjects } = teacherDetails ;

    return (
        <TeacherHeaderSubDetailsStyle>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>First Name <span style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{name} </span></h4>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>Last Name <span  style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{lastName}</span></h4>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>Phone <span  style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{phone}</span></h4>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>Subjects Number <span  style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{teacherSubjects?.length}</span></h4>
        </TeacherHeaderSubDetailsStyle>
    )
}