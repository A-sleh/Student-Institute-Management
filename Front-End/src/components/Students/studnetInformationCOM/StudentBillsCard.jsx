/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { BILLSCOLUMNS } from "../../Teachers/columns/BillsColumn";
import TablePaginated from "../../shared/TablePaginated"
import useStudentBillsDetails from "../../../hooks/useStudentBillsDetails"
import { useSelector } from "react-redux";
import { StudentInformationTEXT } from "../../../Data/static/Students/StudentsInformation/StudentInformationTEXT";

export default function StudentBillsCard({studentId}) {

    const {currentLange} = useSelector( state => state.language)
    const {studentBills :studentBill} = StudentInformationTEXT[currentLange]
    const [studentBills] = useStudentBillsDetails(studentId)
    
    return(
        <div style={{width: '100%' ,flex: '2' , display: 'flex' , flexDirection: 'column' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>{studentBill}</span>
            <TablePaginated column={BILLSCOLUMNS} data={studentBills || []} unableId={true} styleObj={{padding: '5px' , fontSize: '14px' , sameColor: true}} showMainHeader={false} rowNumber={3} smallControalSection={true}/>
        </div>
    )
}