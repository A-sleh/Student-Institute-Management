/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useNavigate } from "react-router-dom";
import useGetTeachersBills from "../../../hooks/teacher_hooks/useGetTeachersBills";
import { COLUMNS } from "../style/COLUMNS.JS";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TablePaginated from "../../shared/TablePaginated";

export default function ShowBillTeacherDetails() {

    const limitNumber = 12
    const [page,setPage] = useState(1)
    const {teachers,currPage,totalPages} = useGetTeachersBills(limitNumber,page,setPage)
    const {isAdmin} = useSelector( state => state.admin)
    const goTo = useNavigate()

    useEffect(() => {
        if(!isAdmin) {
            goTo('/StudentsPays')
        }
    },[isAdmin])
    
    
    return (
        <TablePaginated data={teachers || []} column={COLUMNS} rowNumber={limitNumber} setNextPageState={setPage} totalPages={totalPages} currPage={currPage} idKeyParams={'teacherId'} url={`/TeachersSalaries/TeacherBillDetails`} />
    )
}




