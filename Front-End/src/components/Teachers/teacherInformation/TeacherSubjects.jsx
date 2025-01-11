/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { TEACHERSUBJECTCOLUMN } from "../columns/TeacherSubjectColumn";
import Table from "../../shared/Table";
import useTeacherSubjects from "../../../hooks/useTeacherSubjects";
import { useSelector } from "react-redux";
import { TeacherInformationTEXT } from "../../../Data/static/teachers/teachersDetails/TeacherInformationTEXT";


export default function TeacherSubjects({teacherId}) {

    const {currentLange} = useSelector( state => state.language)
    const {teacherSubjects : teacherSubjectsTEXT} = TeacherInformationTEXT[currentLange]
    const [teacherSubjects] = useTeacherSubjects(teacherId)

    return(
        <div>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>{teacherSubjectsTEXT}</span>
            <Table data={teacherSubjects} column={TEACHERSUBJECTCOLUMN} showMainHeader={false} unableId={true} styleObj={{padding: '5px' , fontSize: '14px' , sameColor: true }}/>
        </div>
        
    )
}