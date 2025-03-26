/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useNavigate } from "react-router-dom";
import useGetTeachersBills from "../../../hooks/teacher_hooks/useGetTeachersBills";
import Table from "../../shared/Table";
import { COLUMNS } from "../style/COLUMNS.JS";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ShowBillTeacherDetails() {

    const [teacherDetails] = useGetTeachersBills()
    const {isAdmin} = useSelector( state => state.admin)
    const goTo = useNavigate()

    useEffect(() => {
        if(!isAdmin) {
            goTo('/StudentsPays')
        }
    },[isAdmin])
    
    
    return (
        <Table data={teacherDetails || []} column={COLUMNS} idKeyParams={'teacherId'} url={`/TeachersSalaries/TeacherBillDetails`} />
    )
}




