/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { TEACHERCLASSCOLUMNS } from "../columns/TeacherClassColumn";
import useTeacherClassDetails from "../../../hooks/useTeacherClassDetails";
import TablePaginated from "../../shared/TablePaginated";

export default function TeacherClasses({teacherId}) {

    const [classes] = useTeacherClassDetails(teacherId)
    
    return(
        <div style={{width: '100%' ,flex: '1' , display: 'flex' , flexDirection: 'column' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Its Classes</span>
            <TablePaginated column={TEACHERCLASSCOLUMNS} data={classes || []} unableId={true} styleObj={{padding: '5px' , fontSize: '14px' , sameColor: true}} showMainHeader={false} rowNumber={3} smallControalSection={true}/>
        </div>
    )
}