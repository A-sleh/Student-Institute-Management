import { Outlet } from "react-router-dom";
import SubNavBar from "../shared/SubNavBar";
import Title from "../Global/Title";
import useGetBalanceInEachMonth from "../../hooks/bill_hooks/useGetBalanceInEachMonth";

const urlList = [
    {
        title: 'New Grade',
        path: 'NewGrade',
    },
    {
        title: 'Manage Grades',
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