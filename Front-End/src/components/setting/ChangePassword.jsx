import { useDispatch, useSelector } from "react-redux";
import { ADMINLOGUNG, ADMINLOGUNGOUT, ARABIC } from "../../Redux/actions/type";
import { AdminLoginStyle } from "./settingStyle";
import { useState } from "react";

export default function ChangePassword() {

    const formFirstState = { newPassword : '' , oldPassword: '' }
    const [form,setForm] = useState(formFirstState)
    const [formValid,setFormValid] = useState({ old: false , new: false })

    const {currentLange} = useSelector( state => state.language)
    const adminState = useDispatch() 

    function validInputs() {
        const { newPassword , oldPassword } = form 
        setFormValid({
            old : oldPassword == '' ,
            new : newPassword == ''
        })

        return (newPassword != '' && oldPassword != '')
    }

    function hanldeSubmitClicked(e) {
        e.preventDefault()
        
        if(validInputs()) {
            setForm(formFirstState)
            // adminState({  type: ADMINLOGUNG ,  payload: { isAdmin: true , adminName: form.adminName }})
        }
        
    }

    return(
        <>
            <h3 style={{margin: '10px 0'}}><i className={currentLange == ARABIC ? "bi bi-caret-left-fill": "bi bi-caret-right-fill"} style={{color: '#056699'}}></i>{currentLange == ARABIC ? ' تغيير كلمة المرور : ': " Change password : "}</h3>
            <AdminLoginStyle onSubmit={(e) => hanldeSubmitClicked(e) }>
                <section>
                    <div>
                        <label style={{color: formValid.old ? 'red' : '#056699'}}>{currentLange == ARABIC ? 'كلمة المرور القديمة' : 'Old password' }</label>
                        <input type="password" value={form.oldPassword} onChange={(e) => setForm({...form,oldPassword : e.target.value})}  style={{backgroundColor: formValid.old ? '#ff03033e' : '#ddd'}}/>
                    </div>
                    <div>
                    <label style={{color: formValid.new ? 'red' : '#056699'}}>{currentLange == ARABIC ? 'كلمة المرور الجديده' : 'New password' }</label>
                        <input type="password" value={form.newPassword} onChange={(e) => setForm({...form,newPassword : e.target.value})}  style={{backgroundColor: formValid.new ? '#ff03033e' : '#ddd'}}/>
                    </div>
                </section>
                <input type="submit"  value={currentLange == ARABIC ? 'تغيير' : 'Change' } />
            </AdminLoginStyle>
        </>
    )
}