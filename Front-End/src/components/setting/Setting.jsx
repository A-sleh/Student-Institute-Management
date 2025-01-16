import Title from "../Global/Title";
import AdminLogin from "./AdminLogin";
import ChangePassword from "./ChangePassword";
import FullScreen from "./FullScreen";
import LanguageList from "./LanguageList";

export default function Setting() {
    return (
        <>
            <Title title={window.location.pathname} />
            <LanguageList />
            <FullScreen />
            <AdminLogin />
            <ChangePassword />
        </>
    )
}