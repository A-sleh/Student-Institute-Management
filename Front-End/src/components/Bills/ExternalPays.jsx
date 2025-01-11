/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { Outlet } from "react-router-dom";
import Title from "../Global/Title";
import SubNavBar from "../shared/SubNavBar";
import { useSelector } from "react-redux";

export default function ExternalPays() {

    const { isAdmin } = useSelector( state => state.admin)
    const urlList = [
        {
            title: {
                english : 'Show All External Pays' ,  
                arabic : 'إظهار الفواتير الخارجيه'
            },
            isAdmin: true,
            path: 'ShowBillExternalDetails',
        },
        {
            title: {
                english :  'Manage Pays' ,  
                arabic : 'إدارة الفواتير الخارجيه'
            },
            isAdmin: isAdmin,
            path : 'ManagExternalBill',
        },
        {
            title: {
                english :  'New Pay' ,  
                arabic : 'فاتوره خارجيه جديده'
            },
            isAdmin: true,
            path : 'NewBill',
        }
    ]

    return(
        <>
            <Title title={window.location.pathname} />
            <SubNavBar urlList={urlList} />
            <Outlet />
        </>
    )
}