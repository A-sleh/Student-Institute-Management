/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/
import { useState } from "react"
import { COLUMNS } from "../style/COLUMNS.JS";
import Table from "../../shared/Table";
import useGetStudentBills from "../../../hooks/student_hooks/useGetStudentBills";
import SubeHeaderFilterByClassName from "../../shared/subHeaderTable/SubeHeaderFilterByClassName";
import SubHeaderClassBalance from "../../shared/subHeaderTable/SubHeaderClassBalance";

export default function ShowBillStudentDetails() {

    const [fileterByClass,setFileterByClass] = useState('All')
    const [studentBillsBalance] = useGetStudentBills(fileterByClass)
    
    
    return (
        <Table data={studentBillsBalance || []} column={COLUMNS} idKeyParams={'studentId'} url={`/StudentsPays/StudentBillDetails`}>
            <SubeHeaderFilterByClassName fileterByClass={fileterByClass} setFileterByClass={setFileterByClass}/>
            <SubHeaderClassBalance classId={fileterByClass} />
        </Table>
    )
}




