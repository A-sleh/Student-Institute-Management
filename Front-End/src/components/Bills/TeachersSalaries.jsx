/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import {  NavLink, Outlet } from "react-router-dom";
import Title from "../Global/Title";
import { HeaderNavStyle } from "../shared/style/styleTag";

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
                <HeaderNavStyle >
                    <span></span>
                    <ol>
                        {
                            urlList.map( link => {
                                return <li><NavLink to={link.path} style={({ isActive }) => { return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'} }}>{link.title}</NavLink></li>
                            })
                        }
                    </ol>
                    <span></span>
                </HeaderNavStyle>
            <Outlet />
        </>
    )
}