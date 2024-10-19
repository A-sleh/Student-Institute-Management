import Title from "../Global/Title"
import { NavLink, Outlet } from 'react-router-dom'
import { HeaderNavStyle } from './CreateTestTools/EmentsStyle'


export default function CreateReport() {
    return(
        <>
            <Title title={window.location.pathname}/> 
                <HeaderNavStyle >
                    <span></span>
                    <li><NavLink to={'NewReportForm'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                    }}>New Report</NavLink></li>
                    <li><NavLink to={'ManageReports'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                        }}>Manage Report</NavLink></li>
                    <li><NavLink to={'ReportDetails'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                        }}>Report Details</NavLink></li>
                    <li><NavLink to={'PrintReport'} style={({ isActive }) => {
                        return {textDecoration: 'none' , fontSize: '16px' , fontWeight: isActive ? '600' : '300' , color: 'white'}
                        }}>Print Report</NavLink></li>
                    <span></span>
                </HeaderNavStyle>         
            <Outlet />
        </>
    )
}