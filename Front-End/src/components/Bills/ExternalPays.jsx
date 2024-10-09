import { NavLink, Outlet } from "react-router-dom";
import Title from "../Global/Title";
import { HeaderNavStyle } from "../Tests/CreateTestTools/EmentsStyle";

export default function ExternalPays() {
    return(
        <>
            <Title title={window.location.pathname} />
            <HeaderNavStyle >
                <span></span>
                    <ul style={{display: 'flex' , gap: '30px' , listStyle: 'none' , justifyContent: 'center'}}>
                        <li><NavLink to={'ShowBillExternalDetails'} style={({ isActive }) => {
                            return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                            }}>Show All External Pays</NavLink></li>
                        <li><NavLink to={'ManagExternalBill'} style={({ isActive }) => {
                            return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                            }}>Manage Pays</NavLink></li>
                        <li><NavLink to={'NewBill'} style={({ isActive }) => {
                            return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                        }}>New Pay</NavLink></li>
                    </ul>
                <span></span>
                </HeaderNavStyle >
            <Outlet />
        </>
    )
}