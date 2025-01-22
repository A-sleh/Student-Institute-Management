/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { useState } from "react"
import { COLUMNS } from "../style/COLUMNS.JS" 
import useGetStudentBills from "../../../hooks/student_hooks/useGetStudentBills"
import Table from "../../shared/Table"
import SubeHeaderFilterByClassName from "../../shared/subHeaderTable/SubeHeaderFilterByClassName"
import SubHeaderClassBalance from "../../shared/subHeaderTable/SubHeaderClassBalance"


export default function ManagStudentBill() {

    const [fileterByClass,setFileterByClass] = useState('All')
    const [studentBillsBalance] = useGetStudentBills(fileterByClass)

    return (
        <Table data={studentBillsBalance || []} column={COLUMNS} idKeyParams={'studentId'} url={`/StudentsPays/StudentBillDetails`} specialState='manage'>
            <SubeHeaderFilterByClassName fileterByClass={fileterByClass} setFileterByClass={setFileterByClass}/>
            <SubHeaderClassBalance classId={fileterByClass} />
        </Table>
    )
}