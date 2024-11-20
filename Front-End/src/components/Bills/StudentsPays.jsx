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
        title: 'Show All Students Pays',
        path: 'ShowBillStudentDetails',
    },
    {
        title: 'Manage Pays',
        path : 'ManagStudentBill',
    },
    {
        title: 'New Pay',
        path : 'NewBill',
    }
]

export default function StudentsPays() {
    return(
        <>
            <Title title={window.location.pathname} />
            <SubNavBar urlList={urlList} />
            <Outlet />
        </>
    )
}