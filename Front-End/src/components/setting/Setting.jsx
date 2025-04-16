import { useSelector } from "react-redux";
import Title from "../Global/Title";
import AdminLogin from "./AdminLogin";
import ChangeAdminName from "./ChangeAdminName";
import ChangePassword from "./ChangePassword";
import FullScreen from "./FullScreen";
import LanguageList from "./LanguageList";

export default function Setting() {

    const {isAdmin} = useSelector(state => state.admin)
    
    return (
        <>
            <Title title={window.location.pathname} />
            <LanguageList />
            <FullScreen />
            <AdminLogin />
            {isAdmin && <ChangeAdminName /> }
            {isAdmin && <ChangePassword /> }
        </>
    )
}