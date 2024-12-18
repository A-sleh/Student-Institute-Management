import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { BILLSCOLUMNS } from "../../Teachers/columns/BillsColumn";
import useLatestBills from "../../../hooks/useLatestBills";
import { useMemo, useState } from "react";
import Table from "../../shared/Table";

export default function LatestBills() {

    const [filterType,setFilterType] = useState('teacher')
    const [teacherBills,studentBills,externalBills] = useLatestBills(6)
    const selectedBills = specifyBillType(filterType)
    const column = useMemo(() => [
        {
            Header: 'Owner' ,
            Cell : ({row}) => {
                const person = row.original[filterType]
                if(filterType == 'external') return 'There are no'
                return person.name + ' ' + person.lastName
            }
        },
        ...BILLSCOLUMNS
    ],[filterType])

    function specifyBillType(filterType) {
        switch(filterType) {
            case 'teacher' : 
                return teacherBills
            case 'student' : 
                return studentBills
            case 'external' : 
                return externalBills
        }
    }

    return (
        <BackgroundLayoutStyle>
            <SelectorStyle value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value={'teacher'}>Teachers</option>
                <option value={'student'}>Student</option>
                <option value={'external'}>External</option>
            </SelectorStyle>
            <Table data={selectedBills} column={column} showMainHeader={false} styleObj={{padding: '4px' , fontSize: '13px' , sameColor: true}}/>
        </BackgroundLayoutStyle>
    )
}