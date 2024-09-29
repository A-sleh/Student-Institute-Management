import { NavLink, Outlet } from "react-router-dom";
import Title from "../Global/Title";

export default function ExternalPays() {
    return(
        <>
            <Title title={window.location.pathname} />
            <div style={{backgroundColor: '#066599', padding: '10px' , borderRadius: '2px' , marginBottom: '10px' }} className="students-pays-header">
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
            </div>
            <Outlet />
        </>
    )
}