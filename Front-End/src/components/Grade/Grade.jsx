import { Outlet } from "react-router-dom";
import SubNavBar from "../shared/SubNavBar";
import Title from "../Global/Title";

const urlList = [
    {
        title: {
            english :  'New Grade' ,  
            arabic : 'إضافة فئه'
        },
        isAdmin: true,
        path: 'NewGrade',
    },
    {
        title: {
            english :  'Manage Grades' ,  
            arabic : 'إداره الفئات'
        },
        isAdmin: true,
        path : 'ManageGrades',
    }
]



export default function Grade() {
    
    return (
        <>
            <Title title={window.location.pathname} />
            <SubNavBar urlList={urlList} />
            <Outlet />
        </>
    );
    
}