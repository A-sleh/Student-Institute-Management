/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import useGetTeachersBills from "../../../hooks/teacher_hooks/useGetTeachersBills";
import Table from "../../shared/Table";
import { COLUMNS } from "../style/COLUMNS.JS";

export default function ManagTeacherBill() {

    const [teacherDetails] = useGetTeachersBills()

    return(
        <>
            <Table data={teacherDetails || []} column={COLUMNS} idKeyParams={'teacherId'} url={`/TeachersSalaries/TeacherBillDetails`} specialState='manage' />
        </>
    )
}