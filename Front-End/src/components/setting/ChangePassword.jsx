import {  useSelector } from "react-redux";
import {  ARABIC } from "../../Redux/actions/type";
import { AdminLoginStyle } from "./settingStyle";
import { useState } from "react";
import { errorActionLogic, successActionLogic } from "../shared/logic/logic";
import Notification from "../Global/Notification";
import DataServices from "../../Data/dynamic/DataServices";
import { ChangePasswordTEXT } from "../../Data/static/setting/setting";

export default function ChangePassword() {

    const {currentLange} = useSelector( state => state.language)
    const {chagePasswordTitle,oldPasswordTitle ,newPasswordTitle ,
           changeBtn ,errorInChangePasswordMES ,successChangePasswordMES} = ChangePasswordTEXT[currentLange] ;

    const formFirstState = { newPassword : '' , oldPassword: '' }
    const [form,setForm] = useState(formFirstState)
    const [unMatchPassword,setUnMatchPassword] = useState(false)
    const [successChangePassword,setSuccessChangePassword] = useState(false)
    const [formValid,setFormValid] = useState({ old: false , new: false })

    function validInputs() {
        const { newPassword , oldPassword } = form 
        setFormValid({
            old : oldPassword == '' ,
            new : newPassword == ''
        })

        return (newPassword != '' && oldPassword != '' )
    }

    function hanldeSubmitClicked(e) {
        e.preventDefault()
        
        if(validInputs()) {
            const { newPassword , oldPassword } = form 

            DataServices.ChangeAdminPassword(oldPassword,newPassword ).then (res => {
                if( res.status < 300 ) {
                    successActionLogic(setSuccessChangePassword)
                    setForm(formFirstState)
                }else {
                    errorActionLogic(setUnMatchPassword)
                }
            })
        }
        
    }

    return(
        <>
            <Notification title={errorInChangePasswordMES} type={"error"} state={unMatchPassword} setState={setUnMatchPassword} />   
            <Notification title={successChangePasswordMES} type={"success"} state={successChangePassword} setState={setSuccessChangePassword} />   
            <h3 style={{margin: '10px 0'}}><i className={currentLange == ARABIC ? "bi bi-caret-left-fill": "bi bi-caret-right-fill"} style={{color: '#056699'}}></i>{chagePasswordTitle}</h3>
            <AdminLoginStyle onSubmit={(e) => hanldeSubmitClicked(e) }>
                <section>
                    <div>
                        <label style={{color: formValid.old ? 'red' : '#056699'}}>{oldPasswordTitle}</label>
                        <input type="password" value={form.oldPassword} onChange={(e) => setForm({...form,oldPassword : e.target.value})}  style={{backgroundColor: formValid.old ? '#ff03033e' : '#ddd'}}/>
                    </div>
                    <div>
                    <label style={{color: formValid.new ? 'red' : '#056699'}}>{newPasswordTitle }</label>
                        <input type="password" value={form.newPassword} onChange={(e) => setForm({...form,newPassword : e.target.value})}  style={{backgroundColor: formValid.new ? '#ff03033e' : '#ddd'}}/>
                    </div>f
                </section>
                <input type="submit"  value={changeBtn } />
            </AdminLoginStyle>
        </>
    )
}