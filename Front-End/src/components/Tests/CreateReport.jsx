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
        title: {
            arabic: 'تقرير جديد' ,
            english: 'New Report'
        } ,
        isAdmin: true,
        path: 'NewReportForm',
    },
    {
        title: {
            arabic: 'إدارة التقارير' ,
            english: 'Manage Report'
        } ,
        isAdmin: true,
        path : 'ManageReports',
    },
    {
        title: {
            arabic: 'عرض التقارير' ,
            english: 'Report Details'
        } ,
        isAdmin: true,
        path : 'ReportDetails',
    },
    {
        title: {
            arabic: 'طباعة تقرير' ,
            english: 'Print Report'
        } ,
        isAdmin: true,
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