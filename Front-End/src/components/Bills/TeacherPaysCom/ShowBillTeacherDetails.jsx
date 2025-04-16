/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useNavigate } from "react-router-dom";
import useGetTeachersBills from "../../../hooks/teacher_hooks/useGetTeachersBills";
import { COLUMNS } from "../style/COLUMNS.JS";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TablePaginated from "../../shared/TablePaginated";
import { SEARCHING_TEACHER, S_TEACHER_BILLS, S_TEACHER_BILLS_CURRENT_PAGE, S_TEACHER_BILLS_DATA_ORIGIN, S_TEACHER_BILLS_SEARCH_FIELD, S_TEACHER_BILLS_TOTAL_PAGE } from "../../../Redux/actions/type";

export default function ShowBillTeacherDetails() {

    const limitNumber = 10
    const [sendRequest,setSendRequest] = useState(false)
    const {currentPage , teachersBills , totalPage , dataOrigin, searchField } = useSelector( state => state.showTeacherBills)
    const {teachers,totalPages} = useGetTeachersBills({teachersBills,dataOrigin,setDataOrigin},limitNumber,currentPage,setCurrentPage,searchField,sendRequest)
    const {isAdmin} = useSelector( state => state.admin)
    const dispatch = useDispatch()
    const goTo = useNavigate()


    function changeTeacherBillsState(teacherBills,totalPage) {
        dispatch({
            payload: teacherBills,
            type: S_TEACHER_BILLS
        })
        dispatch({
            payload: totalPage,
            type: S_TEACHER_BILLS_TOTAL_PAGE
        })

        // reset the current page to avoid unknow behaviour
        if(dataOrigin == SEARCHING_TEACHER ) 
            setCurrentPage(1)
    }

    useEffect(() => {
        changeTeacherBillsState(teachers || teachersBills,totalPages)
    },[teachers])

    function setCurrentPage(value) {
        dispatch({
            type: S_TEACHER_BILLS_CURRENT_PAGE ,
            payload: value
        })
    }

    function setSearchField(value) {
        dispatch({
            type: S_TEACHER_BILLS_SEARCH_FIELD ,
            payload: value
        })
    }

    function setDataOrigin(value) {
        dispatch({
            type: S_TEACHER_BILLS_DATA_ORIGIN ,
            payload: value
        })
    }

    useEffect(() => {
        if(!isAdmin) {
            goTo('/StudentsPays')
        }
    },[isAdmin])
    
    function handleSearchClicked() {
        setSendRequest(true)
        setTimeout(()=> setSendRequest(false),200)
    }   
    
    return (
        <TablePaginated data={teachersBills || []} column={COLUMNS} search={{searchField,setSearchField,handleSearchClicked}}  rowNumber={limitNumber} setNextPageState={setCurrentPage} totalPages={totalPage || 1} currPage={currentPage || 1} idKeyParams={'teacherId'} url={`/TeachersSalaries/TeacherBillDetails`} />
    )
}




