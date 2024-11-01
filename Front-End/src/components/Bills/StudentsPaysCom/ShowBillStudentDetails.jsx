import { useState } from "react"
import { COLUMNS } from "./COLUMNS.JS";
import Table from "../../shared/Table";
import useGetStudentBills from "../../../hooks/useGetStudentBills";
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




