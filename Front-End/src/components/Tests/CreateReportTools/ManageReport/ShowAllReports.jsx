/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { InputStyle } from '../../../shared/style/styleTag';
import { useContext, useEffect, useState } from "react"
import SearchSubHeader from "../../../shared/SearchSubHeader";
import useReports from "../../../../hooks/report_hooks/useReports";
import ReportsList from "./ReportsList";
import { ManageReportTEXT } from '../../../../Data/static/test/CreateReportTools/ManageReportTEXT';
import { useSelector } from 'react-redux';
import { SelectedReportContext } from './LinkTestWithReport';


export default function ShowAllReport({gradeId}) {

    const {currentLange} = useSelector( state => state.language)
    const {selectedReport,setSelectedReport} = useContext(SelectedReportContext)
    const {reportsTitle} = ManageReportTEXT[currentLange]
    const [searchByDate,setSearchByDate] = useState('')
    const [search,setSearch] = useState('')
    const [reports] = useReports(gradeId,search,searchByDate)

    useEffect(() => {
        if(reports?.length == 0 && selectedReport != null )
            setSelectedReport(null)
    },[reports])

    return (
        <>
            <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px', padding: '10px' ,marginBottom: '10px'}}>
                <SearchSubHeader filter={search} setFilter={setSearch}>
                    <div style={{display: 'flex'}}>
                        <InputStyle type={'date'} style={{ width : 'minmax(250px,100%)' }} value={searchByDate} onChange={(e)=>{setSearchByDate(e.target.value)}}/>
                        <button style={{padding: '0 5px' , border: 'none' , color: 'white',backgroundColor: 'red',cursor: 'pointer'}} onClick={()=>setSearchByDate('')}>x</button>
                    </div>
                    <h3 style={{color: '#056699' }} >{reportsTitle}</h3>
                </SearchSubHeader >
                <ReportsList reports={reports} />
            </div>
        </>
    )
}


