/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { useState } from "react"
import { COLUMNS } from "../style/COLUMNS.JS" 
import useGetStudentBills from "../../../hooks/student_hooks/useGetStudentBills"
import SubeHeaderFilterByClassName from "../../shared/subHeaderTable/SubeHeaderFilterByClassName"
import SubHeaderClassBalance from "../../shared/subHeaderTable/SubHeaderClassBalance"
import TablePaginated from "../../shared/TablePaginated"
import { useDispatch, useSelector } from "react-redux"
import { FILTER_STUDENTS_BY_CLASS } from "../../../Redux/actions/type"


export default function ManagStudentBill() {

    const {filterField } = useSelector( state => state.studentsBill )
    const chanegTheSelectedClass = useDispatch()
    const [page,setPage] = useState(1)
    const limitNumber = 12
    const {students,currPage,totalPages} = useGetStudentBills(filterField,limitNumber,page,setPage)
    
    function setFileterByClass(value) {
        chanegTheSelectedClass({
            payload: value ,
            type: FILTER_STUDENTS_BY_CLASS
        })
    }

    return (
        <TablePaginated data={students || []} column={COLUMNS} rowNumber={filterField != 'All' ? students?.length : limitNumber} setNextPageState={setPage} totalPages={totalPages} currPage={currPage}  idKeyParams={'studentId'} url={`/StudentsPays/StudentBillDetails`} specialState='manage'>
            <SubeHeaderFilterByClassName filterField={filterField} setFileterByClass={setFileterByClass}/>
            <SubHeaderClassBalance classId={filterField} />
        </TablePaginated>
    )
}