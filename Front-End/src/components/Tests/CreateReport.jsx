/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import Title from "../Global/Title"
import { Outlet } from 'react-router-dom'
import SubNavBar from "../shared/SubNavBar"

const urlList = [
    {
        title: 'New Report',
        path: 'NewReportForm',
    },
    {
        title: 'Manage Report',
        path : 'ManageReports',
    },
    {
        title: 'Report Details',
        path : 'ReportDetails',
    },
    {
        title: 'Print Report',
        path : 'PrintReport',
    }
]

export default function CreateReport() {
    return(
        <>
            <Title title={window.location.pathname}/> 
            <SubNavBar urlList={urlList} />
            <Outlet />
        </>
    )
}