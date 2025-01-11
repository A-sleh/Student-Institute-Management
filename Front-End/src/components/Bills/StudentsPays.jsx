/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { Outlet } from "react-router-dom";
import Title from "../Global/Title";
import SubNavBar from "../shared/SubNavBar";
import { useSelector } from "react-redux";

export default function StudentsPays() {

    const { isAdmin } = useSelector( state => state.admin)
    const urlList = [
        {
            title: {
                english : 'Show All Students Pays' ,  
                arabic : 'إظهار فواتير الطلاب'
            },
            isAdmin: true,
            path: 'ShowBillStudentDetails',
        },
        {
            title: {
                english :  'Manage Pays' ,  
                arabic : 'إدارة فواتير الطلاب'
            },
            isAdmin: isAdmin,
            path : 'ManagStudentBill',
        },
        {
            title: {
                english :  'New Pay' ,  
                arabic : 'فاتوره طالب جديده'
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