/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/
import { useState } from "react"
import { COLUMNS } from "../style/COLUMNS.JS";
import useGetStudentBills from "../../../hooks/student_hooks/useGetStudentBills";
import SubeHeaderFilterByClassName from "../../shared/subHeaderTable/SubeHeaderFilterByClassName";
import SubHeaderClassBalance from "../../shared/subHeaderTable/SubHeaderClassBalance";
import TablePaginated from "../../shared/TablePaginated";

export default function ShowBillStudentDetails() {

    
    const [fileterByClass,setFileterByClass] = useState('All')
    const [page,setPage] = useState(1)
    const limitNumber = 12
    const {students,currPage,totalPages} = useGetStudentBills(fileterByClass,limitNumber,page,setPage)
    
    return (
        <TablePaginated data={students || []} column={COLUMNS} rowNumber={fileterByClass != 'All' ? students?.length : limitNumber} setNextPageState={setPage} totalPages={totalPages} currPage={currPage} idKeyParams={'studentId'} url={`/StudentsPays/StudentBillDetails`}>
            <SubeHeaderFilterByClassName fileterByClass={fileterByClass} setFileterByClass={setFileterByClass}/>
            <SubHeaderClassBalance classId={fileterByClass} />
        </TablePaginated>
    )
}




