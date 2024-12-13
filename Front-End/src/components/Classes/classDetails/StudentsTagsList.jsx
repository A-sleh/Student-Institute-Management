/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useNavigate } from "react-router-dom";
import { TeacherTagsContainer } from "../style/styleTags";

export default function StudnetsTagsList({students,classHasNoStudents}) {

    return (
        <>
            {
                classHasNoStudents ? <span style={{ color: "red", fontWeight: "400", fontSize: "16px" }}> There are no students yet ... </span> : 
                <div style={{display: 'flex' , flexWrap: 'wrap' , gap: '10px' , backgroundColor: '#f3f1f1d7' , padding: '10px'}}>
                    { students?.map((student,index) => <StudentTag student={student} key={index}/> )  }
                </div>
            }
        </>
    )
}

function StudentTag({student}) {

    const { id, name, lastName } = student;
    const gotoStudentDetails = useNavigate()

    return (
        <TeacherTagsContainer key={id}  >
            <span  onClick={() =>gotoStudentDetails(`/StudentInformation/${id}`)} >
                {name} {lastName}
            </span>
        </TeacherTagsContainer>
    )
}
