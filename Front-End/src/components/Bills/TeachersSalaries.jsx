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
        title: 'Show All Teachers Pays',
        path: 'ShowBillTeacherDetails',
    },
    {
        title: 'Manage Pays',
        path : 'ManagTeacherBill',
    },
    {
        title: 'New Pay',
        path : 'NewTeacherBill',
    }
]

export default function TeachersSalaries() {
    return(
        <>
            <Title title={window.location.pathname} />
            <SubNavBar urlList={urlList} />
            <Outlet />
        </>
    )
}