/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useNavigate } from "react-router-dom";
import { TeacherTagsContainer } from "../style/styleTags";
import { ClassesDetailsTEXT } from "../../../Data/static/classes/ClassesDetails/ClassesDetailsTEXT";
import {useDispatch, useSelector} from 'react-redux'
import { CLASS_SECTION } from "../../../Redux/actions/type";

export default function StudnetsTagsList({students,classHasNoStudents,classId}) {

    const {currentLange} = useSelector( state => state.language)
    const { noStudentsWOR} = ClassesDetailsTEXT[currentLange]
    
    return (
        <>
            {
                classHasNoStudents ? <span style={{ color: "red", fontWeight: "400", fontSize: "16px" }}> {noStudentsWOR} </span> : 
                <div style={{display: 'flex' , flexWrap: 'wrap' , gap: '10px' , backgroundColor: '#f3f1f1d7' , padding: '10px'}}>
                    { students?.map((student,index) => <StudentTag student={student} key={index} classId={classId}/> )  }
                </div>
            }
        </>
    )
}

function StudentTag({student,classId}) {

    const { studentId, name, lastName } = student;
    const gotoStudentDetails = useNavigate()
    const determainParentClass = useDispatch()
    
    function handleStudentTageClicked(studentId) {
        determainParentClass({
            type: CLASS_SECTION ,
            payload: classId
        })
        gotoStudentDetails(`/StudentInformation/${studentId}`)
    }

    return (
        <TeacherTagsContainer key={studentId}  >
            <span  onClick={() => handleStudentTageClicked(studentId) } >
                {name} {lastName}
            </span>
        </TeacherTagsContainer>
    )
}
