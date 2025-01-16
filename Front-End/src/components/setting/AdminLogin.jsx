import { useDispatch, useSelector } from "react-redux";
import { ADMINLOGUNG, ADMINLOGUNGOUT, ARABIC } from "../../Redux/actions/type";
import { AdminLoginStyle } from "./settingStyle";
import { useEffect, useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import { errorActionLogic, successActionLogic } from "../shared/logic/logic";
import Notification from "../Global/Notification";
import useGetAllSetting from "../../hooks/settings/useGetAllSetting";
import { AdminLoginTEXT } from "../../Data/static/setting/setting";

export default function AdminLogin() {

    // Main test content
    const {currentLange} = useSelector( state => state.language)
    const {manager ,passwordTitle ,loginBtn ,logoutBtn,mangerLoginTitle ,successLoginMES ,errorLoginMES} = AdminLoginTEXT[currentLange]
    // main state
    const [formValid,setFormValid] = useState({ name: false , password : false })
    const formFirstState = { adminName : '' , password: '' }
    const {isAdmin} = useSelector( state => state.admin)
    const [form,setForm] = useState(formFirstState)
    const [successLoggin,setSuccessLoggin] = useState(false)
    const [errorLoggin,setErrorLoggin] = useState(false)
    const adminState = useDispatch() 
    
    function handleLogoutClicked() {
        DataServices.LoggoutFromAdmin()
        adminState({
            payload: false , 
            type: ADMINLOGUNGOUT
        })
    }

    function validInputs() {
        const { adminName , password } = form 
        setFormValid({
            name : adminName == '' ,
            password : password == ''
        })

        return (adminName != '' && password != '')
    }

    function hanldeSubmitClicked(e) {
        e.preventDefault()

        if(isAdmin) {
            setForm(formFirstState)
            adminState({  type: ADMINLOGUNGOUT , payload: false })
            return 
        }
        
        if(validInputs()) {
            DataServices.LogginAsAdmin(form.adminName,form.password).then(res => {
                
                if( res.status < 300 ) {
                    setForm(formFirstState)
                    successActionLogic(setSuccessLoggin)
                    adminState({  type: ADMINLOGUNG ,  payload: { isAdmin: true , adminName: form.adminName }})
                }else { 
                    errorActionLogic(setErrorLoggin)
                }
            })
        }
        
    }

    return(
        <>
            <Notification title={successLoginMES} type={"success"} state={successLoggin} setState={setSuccessLoggin} />
            <Notification title={errorLoginMES} type={"error"} state={errorLoggin} setState={setErrorLoggin} />
            <h3 style={{margin: '10px 0'}}><i className={currentLange == ARABIC ? "bi bi-caret-left-fill": "bi bi-caret-right-fill"} style={{color: '#056699'}}></i>{mangerLoginTitle}</h3>
            <AdminLoginStyle onSubmit={(e) => hanldeSubmitClicked(e) }>
                {
                    isAdmin ? <input className="logout" type="submit" onClick={()=>handleLogoutClicked()} value={logoutBtn } />
                    : <>
                        <section>
                            <div>
                                <label style={{color: formValid.name ? 'red' : '#056699'}}>{manager}</label>
                                <input type="text" value={form.adminName} onChange={(e) => setForm({...form,adminName : e.target.value})}  style={{backgroundColor: formValid.name ? '#ff03033e' : '#ddd'}}/>
                            </div>
                            <div>
                                <label style={{color: formValid.password ? 'red' : '#056699'}}>{passwordTitle }</label>
                                <input type="password" value={form.password} onChange={(e) => setForm({...form,password : e.target.value})}  style={{backgroundColor: formValid.password ? '#ff03033e' : '#ddd'}}/>
                            </div>
                        </section>
                        <input type="submit"  value={loginBtn} />
                    </>
                }
            </AdminLoginStyle>
        </>
    )
}