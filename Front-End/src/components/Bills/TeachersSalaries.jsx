/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { Outlet, useNavigate } from "react-router-dom";
import Title from "../Global/Title";
import SubNavBar from "../shared/SubNavBar";
import { useSelector } from "react-redux";


export default function TeachersSalaries() {

    const { isAdmin } = useSelector( state => state.admin )
    const goTo = useNavigate()

    const urlList = [
        {
            title: {
                english : 'Show All Teachers Pays' ,  
                arabic : 'إظهار فواتير الأساتذه'
            },
            isAdmin: true,
            path: 'ShowBillTeacherDetails',
        },
        {
            title: {
                english : 'Manage Pays' ,  
                arabic : 'إدارة فواتير الأساتذه'
            },
            isAdmin: isAdmin,
            path : 'ManagTeacherBill',
        },
        {
            title: {
                english : 'New Pay' ,  
                arabic : 'فاتوة استاذ جديده'
            },
            isAdmin: true,
            path : 'NewTeacherBill',
        }
    ]

    if(!isAdmin) {
        goTo('/StudentsPays')
    }

    return(
        <>
            <Title title={window.location.pathname} />
            <SubNavBar urlList={urlList} />
            <Outlet />
        </>
    )
}