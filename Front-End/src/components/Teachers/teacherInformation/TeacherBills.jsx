/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { BILLSCOLUMNS } from "../columns/BillsColumn";
import useGetTeacherBills from "../../../hooks/teacher_hooks/useGetTeacherBills";
import Table from "../../shared/Table";
import { TeacherInformationTEXT } from "../../../Data/static/teachers/teachersDetails/TeacherInformationTEXT";
import { useSelector } from "react-redux";

export default function TeacherBills({teacherId}) {

    const {currentLange} = useSelector( state => state.language)
    const {teacherBills} = TeacherInformationTEXT[currentLange]
    const [teacherBill] = useGetTeacherBills(teacherId)

    return(
        <div>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>{teacherBills}</span>
            <Table column ={BILLSCOLUMNS} data={teacherBill ||[]} showMainHeader={false} unableId={true} styleObj={{padding: '5px' , fontSize: '14px' , sameColor: true}}/>        
        </div>
    )
}