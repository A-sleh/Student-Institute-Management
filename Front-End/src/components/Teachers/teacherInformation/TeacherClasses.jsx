/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { TEACHERCLASSCOLUMNS } from "../columns/TeacherClassColumn";
import useTeacherClassDetails from "../../../hooks/useTeacherClassDetails";
import TablePaginated from "../../shared/TablePaginated";
import { TeacherInformationTEXT } from "../../../Data/static/teachers/teachersDetails/TeacherInformationTEXT";
import { useSelector } from "react-redux";

export default function TeacherClasses({teacherId}) {

    const {currentLange} = useSelector( state => state.language)
    const {teacherClasses} = TeacherInformationTEXT[currentLange]
    const [classes] = useTeacherClassDetails(teacherId)
    
    return(
        <div style={{width: '100%' ,flex: '1' , display: 'flex' , flexDirection: 'column' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>{teacherClasses}</span>
            <TablePaginated column={TEACHERCLASSCOLUMNS} data={classes || []} unableId={true} styleObj={{padding: '5px' , fontSize: '14px' , sameColor: true}} showMainHeader={false} rowNumber={3} smallControalSection={true}/>
        </div>
    )
}