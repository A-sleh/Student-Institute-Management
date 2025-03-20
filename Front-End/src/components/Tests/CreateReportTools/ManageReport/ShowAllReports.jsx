/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { InputStyle } from '../../../shared/style/styleTag';
import { useState } from "react"
import SearchSubHeader from "../../../shared/SearchSubHeader";
import useReports from "../../../../hooks/report_hooks/useReports";
import ReportsList from "./ReportsList";
import { ManageReportTEXT } from '../../../../Data/static/test/CreateReportTools/ManageReportTEXT';
import { useSelector } from 'react-redux';


export default function ShowAllReport() {

    const {currentLange} = useSelector( state => state.language)
    const {reportsTitle} = ManageReportTEXT[currentLange]
    const [searchByDate,setSearchByDate] = useState('')
    const [search,setSearch] = useState('')
    const [reports] = useReports(search,searchByDate)

    return (
        <>
            <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px', padding: '10px' ,marginBottom: '10px'}}>
                <SearchSubHeader filter={search} setFilter={setSearch}>
                    <InputStyle type={'date'} style={{ width : 'minmax(250px,100%)' }} value={searchByDate} onChange={(e)=>{setSearchByDate(e.target.value)}}/>
                    <h3 style={{color: '#056699' }} >{reportsTitle}</h3>
                </SearchSubHeader >
                <ReportsList reports={reports} />
            </div>
        </>
    )
}


