import { useState } from "react"
import { COLUMNS } from "./COLUMNS.JS"
import useGetStudentBills from "../../../hooks/useGetStudentBills"
import Table from "../../shared/Table"
import SubeHeaderFilterByClassName from "../../shared/subHeaderTable/SubeHeaderFilterByClassName"


export default function ManagStudentBill() {

    const [fileterByClass,setFileterByClass] = useState('All')
    const [studentBillsBalance] = useGetStudentBills(fileterByClass)

    return (
        <Table data={studentBillsBalance || []} column={COLUMNS} >
            <SubeHeaderFilterByClassName fileterByClass={fileterByClass} setFileterByClass={setFileterByClass}/>
        </Table>
    )
}