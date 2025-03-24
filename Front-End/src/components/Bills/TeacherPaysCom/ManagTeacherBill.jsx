/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useSelector } from "react-redux";
import useGetTeachersBills from "../../../hooks/teacher_hooks/useGetTeachersBills";
import Table from "../../shared/Table";
import { COLUMNS } from "../style/COLUMNS.JS";
import { useNavigate } from "react-router-dom";

export default function ManagTeacherBill() {

    const [teacherDetails] = useGetTeachersBills()
    const {isAdmin} = useSelector( state => state.admin)
    const goTo = useNavigate()

    useEffect(() => {
        if(!isAdmin) {
            goTo('/StudentsPays')
        }
    },[isAdmin])
    

    return(
        <>
            <Table data={teacherDetails || []} column={COLUMNS} idKeyParams={'teacherId'} url={`/TeachersSalaries/TeacherBillDetails`} specialState='manage' />
        </>
    )
}