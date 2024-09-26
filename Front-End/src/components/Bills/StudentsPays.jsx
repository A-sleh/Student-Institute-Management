import { Link, Outlet } from "react-router-dom";
import Title from "../Global/Title";

export default function StudentsPays() {
    return(
        <>
            <Title title={window.location.pathname} />
            <div style={{backgroundColor: '#066599', padding: '5px' , borderRadius: '2px' , marginBottom: '10px' }} className="students-pays-header">
                <ul style={{display: 'flex' , gap: '30px' , listStyle: 'none' , justifyContent: 'center'}}>
                    <li><Link to={'ShowBillStudentDetails'} style={{textDecoration: 'none' , fontSize: '16px' , fontWeight: '500' , color: 'white'}}>Show All Students Pays</Link></li>
                    <li><Link to={'ManagStudentBill'} style={{textDecoration: 'none' , fontSize: '16px' , fontWeight: '500' , color: 'white'}}>Manage Pays</Link></li>
                    <li><Link to={'NewBill'} style={{textDecoration: 'none' , fontSize: '16px' , fontWeight: '500' , color: 'white'}}>New Pay</Link></li>
                </ul>
            </div>
            <Outlet />
        </>
    )
}