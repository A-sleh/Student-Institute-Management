import { Link, Outlet } from "react-router-dom";
import Title from "../Global/Title";

export default function TeachersSalaries() {
    return(
        <>
            <Title title={window.location.pathname} />
            <div style={{backgroundColor: '#066599', padding: '5px' , borderRadius: '2px' , marginBottom: '10px' }} className="students-pays-header">
                <ul style={{display: 'flex' , gap: '30px' , listStyle: 'none' , justifyContent: 'center'}}>
                    <li><Link to={'ShowBillTeacherDetails'} style={{textDecoration: 'none' , fontSize: '16px' , fontWeight: '500' , color: 'white'}}>Show All Teachers Pays</Link></li>
                    <li><Link to={'ManagTeacherBill'} style={{textDecoration: 'none' , fontSize: '16px' , fontWeight: '500' , color: 'white'}}>Manage Pays</Link></li>
                    <li><Link to={'NewTeacherBill'} style={{textDecoration: 'none' , fontSize: '16px' , fontWeight: '500' , color: 'white'}}>New Pay</Link></li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}