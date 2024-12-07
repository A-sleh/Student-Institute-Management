import { Outlet } from "react-router-dom";
import SubNavBar from "../shared/SubNavBar";
import Title from "../Global/Title";

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