import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { BILLSCOLUMNS } from "../../Teachers/columns/BillsColumn";
import useLatestBills from "../../../hooks/bill_hooks/useLatestBills";
import { useMemo, useState } from "react";
import Table from "../../shared/Table";
import { useSelector } from "react-redux";
import { ARABIC } from "../../../Redux/actions/type";

export default function LatestBills() {

    const {currentLange} = useSelector( state => state.language)
    const {isAdmin} = useSelector( state => state.admin)
    const [filterType,setFilterType] = useState('external')
    const [teacherBills,studentBills,externalBills] = useLatestBills(6)
    const selectedBills = specifyBillType(filterType)
    const column = useMemo(() => [
        {
            Header: {
                arabic: 'المالك' ,
                english: 'Owner'
            } ,
            accessor: 'owner',
            Cell : ({row}) => {
                const person = row.original[filterType]
                if(filterType == 'external') return '----'
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
                <option value={'external'}>{currentLange == ARABIC ? 'اللفواتير الخارجيه' : 'External'}</option>
                <option value={'student'}>{currentLange == ARABIC ? 'فواتير الطلاب' : 'Student'}</option>
                {isAdmin &&<option value={'teacher'}>{currentLange == ARABIC ? 'فواتير الأساتذه' : 'Teachers'}</option>}
            </SelectorStyle>
            <Table data={selectedBills} column={column} showMainHeader={false} styleObj={{padding: '4px' , fontSize: '13px' , sameColor: true}}/>
        </BackgroundLayoutStyle>
    )
}