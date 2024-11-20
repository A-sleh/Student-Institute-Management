/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { Outlet } from "react-router-dom";
import Title from "../Global/Title";
import SubNavBar from "../shared/SubNavBar";

const urlList = [
    {
        title: 'Show All External Pays',
        path: 'ShowBillExternalDetails',
    },
    {
        title: 'Manage Pays',
        path : 'ManagExternalBill',
    },
    {
        title: 'New Pay',
        path : 'NewBill',
    }
]

export default function ExternalPays() {
    return(
        <>
            <Title title={window.location.pathname} />
            <SubNavBar urlList={urlList} />
            <Outlet />
        </>
    )
}