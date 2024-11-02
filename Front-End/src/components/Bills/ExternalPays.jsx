/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { NavLink, Outlet } from "react-router-dom";
import { HeaderNavStyle } from "../shared/style/styleTag";
import Title from "../Global/Title";

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
                </HeaderNavStyle >
            <Outlet />
        </>
    )
}