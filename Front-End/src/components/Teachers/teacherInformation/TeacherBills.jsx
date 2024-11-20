/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { BILLSCOLUMNS } from "../columns/BillsColumn";
import useGetTeacherBills from "../../../hooks/useGetTeacherBills";
import Table from "../../shared/Table";

export default function TeacherBills({teacherId}) {

    const [teacherBills] = useGetTeacherBills(teacherId)

    return(
        <div>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Teacher Bills</span>
            <Table column ={BILLSCOLUMNS} data={teacherBills ||[]} showMainHeader={false} unableId={true} styleObj={{padding: '5px' , fontSize: '14px' , sameColor: true}}/>        
        </div>
    )
}