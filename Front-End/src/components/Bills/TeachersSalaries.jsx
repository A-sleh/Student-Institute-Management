import { Link, NavLink, Outlet } from "react-router-dom";
import Title from "../Global/Title";

export default function TeachersSalaries() {
    return(
        <>
            <Title title={window.location.pathname} />
            <div style={{backgroundColor: '#066599', padding: '10px' , borderRadius: '2px' , marginBottom: '10px' }} className="students-pays-header">
                <ul style={{display: 'flex' , gap: '30px' , listStyle: 'none' , justifyContent: 'center'}}>
                    <li><NavLink to={'ShowBillTeacherDetails'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                        }}>Show All Teachers Pays</NavLink></li>
                    <li><NavLink to={'ManagTeacherBill'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                        }}>Manage Pays</NavLink></li>
                    <li><NavLink to={'NewTeacherBill'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                        }}>New Pay</NavLink></li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}