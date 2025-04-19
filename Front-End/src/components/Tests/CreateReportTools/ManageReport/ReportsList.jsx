/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useContext } from "react"
import { ReportsContainerStyle } from "../../style/styleTage"
import { SelectedReportContext } from "./LinkTestWithReport"
import { format } from "date-fns"
import { getDateOnly } from "../../../shared/logic/logic"

export default function ReportsList({reports}) {

    return (
        <ReportsContainerStyle >
            {
                reports.map( (report,index) => {
                    return <ReportCard key={index} report={report} />
                })
            }
        </ReportsContainerStyle>
    )
}

function ReportCard({report}) {

    const {selectedReport,setSelectedReport} = useContext(SelectedReportContext)
    const {reportTitle,startDate,reportId} = report

    return (
        <div onClick={()=>{setSelectedReport(reportId)}} style={{display: 'flex' , gap: '20px' , minWidth: '140px', padding: '8px' , justifyContent: 'space-between',alignItems: 'center' , backgroundColor: selectedReport == reportId ?  '#056699': '#f3f1f1d7'   , cursor: 'pointer',borderLeft: selectedReport == reportId ? '4px solid #f3f1f1d7' : '4px solid #056699' , borderRadius: '3px' , transition: '.4s' }}>
            <span style={{padding: '2px 10px' , borderRadius: '3px' , backgroundColor: 'white'}}>{reportTitle}</span>
            <span  style={{color: selectedReport == reportId ? 'white': 'black' }}>{format(getDateOnly(startDate), "yyyy / MM / dd")}</span>
        </div>
    )
}
