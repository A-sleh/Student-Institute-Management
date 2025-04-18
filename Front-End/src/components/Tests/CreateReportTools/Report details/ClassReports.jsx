/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { NavigateSubHeaderStyle } from "../../style/styleTage"
import { GoBackBtnStyle, InputStyle } from "../../../shared/style/styleTag"
import { REPORTCOLUMNS } from "../columnsTools/REPORTCOLUMNS"
import useClass from "../../../../hooks/class_hooks/useClass"
import useReportOfClassStatistics from "../../../../hooks/report_hooks/useReportOfClassStatistics"
import Table from "../../../shared/Table"
import { ReportDetailsTEXT } from "../../../../Data/static/test/CreateReportTools/ReportDetailsTEXT"
import { useSelector } from "react-redux"
import { getDateOnly } from "../../../shared/logic/logic"

export default function ClassReports() {

    const {currentLange} = useSelector( state => state.language)
    const {backBtn ,classReportsTitle} = ReportDetailsTEXT[currentLange]
    const classId = useParams().classId
    const [Class] = useClass(classId)
    const [reports] = useReportOfClassStatistics(classId)
    const [searchByDate,setSearchByDate] = useState('')
    const gotoPage = useNavigate()

    const filteringReportsByDate = useMemo(() => {
        return reports?.filter( report => {
            if(searchByDate == '') return true 
            return ((getDateOnly(searchByDate) - getDateOnly(report.startDate)) <= 0) 
        })
    },[searchByDate,reports])

    return (
        <div>

            <NavigateSubHeaderStyle >
                <span style={{width: '100%'}}>{Class.title} / {Class.grade}</span>
            </NavigateSubHeaderStyle >

            <Table column={REPORTCOLUMNS } data={filteringReportsByDate || []} url={'/CreateReport/ReportClassDetails'} idKeyParams={'classId'}>
                <div style={{display: 'flex'}}>
                    <InputStyle type={'date'}  value={searchByDate} onChange={(e)=>{setSearchByDate(e.target.value)}}/>
                    <button style={{padding: '0 5px' , border: 'none' , color: 'white',backgroundColor: 'red',cursor: 'pointer'}} onClick={()=>setSearchByDate('')}>x</button>
                </div>
                <h3 style={{color: '#056699' }}>{classReportsTitle}</h3>
            </Table>

            <GoBackBtnStyle onClick={()=>{gotoPage(-1)} } >{backBtn}</GoBackBtnStyle>
        </div>
    )
}
