/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NavigateSubHeaderStyle } from "../../style/styleTage"
import { GoBackBtnStyle, InputStyle } from "../../../shared/style/styleTag"
import { REPORTCOLUMNS } from "../columnsTools/REPORTCOLUMNS"
import useClass from "../../../../hooks/useClass"
import useReportOfClassStatistics from "../../../../hooks/useReportOfClassStatistics"
import Table from "../../../shared/Table"

export default function ClassReports() {

    const classId = useParams().classId
    const [Class] = useClass(classId)
    const [reports] = useReportOfClassStatistics(classId)
    const [searchByDate,setSearchByDate] = useState('')
    const gotoPage = useNavigate()

    return (
        <div>

            <NavigateSubHeaderStyle >
                <span style={{width: '100%'}}>{Class.title} / {Class.grade}</span>
            </NavigateSubHeaderStyle >

            <Table column={REPORTCOLUMNS || []} data={reports} url={'/CreateReport/ReportClassDetails'} idKeyParams={'classId'}>
                <InputStyle type={'date'}  value={searchByDate} onChange={(e)=>{setSearchByDate(e.target.value)}}/>
                <h3 style={{color: '#056699' }}>Class Reports</h3>
            </Table>

            <GoBackBtnStyle onClick={()=>{gotoPage(-1)} } >Back</GoBackBtnStyle>
        </div>
    )
}
