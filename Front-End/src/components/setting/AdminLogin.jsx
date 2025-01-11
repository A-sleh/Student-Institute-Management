import { useDispatch, useSelector } from "react-redux";
import { ADMINLOGUNG, ADMINLOGUNGOUT, ARABIC } from "../../Redux/actions/type";
import { AdminLoginStyle } from "./settingStyle";
import { useState } from "react";

export default function AdminLogin() {

    const formFirstState = { adminName : '' , password: '' }
    const {currentLange} = useSelector( state => state.language)
    const {isAdmin} = useSelector( state => state.admin)
    const adminState = useDispatch() 
    const [form,setForm] = useState(formFirstState)
    const [formValid,setFormValid] = useState({ name: false , password : false })

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
            setForm(formFirstState)
            adminState({  type: ADMINLOGUNG ,  payload: { isAdmin: true , adminName: form.adminName }})
        }
        
    }

    return(
        <>
            <h3 style={{margin: '10px 0'}}><i className={currentLange == ARABIC ? "bi bi-caret-left-fill": "bi bi-caret-right-fill"} style={{color: '#056699'}}></i>{currentLange == ARABIC ? ' تسجيل الدخول كمدير : ': " Login as manager : "}</h3>
            <AdminLoginStyle onSubmit={(e) => hanldeSubmitClicked(e) }>
                {
                    isAdmin ? <input className="logout" type="submit" value={currentLange == ARABIC ? 'تسجيل الخروج' : 'Logout' } />
                    : <>
                        <section>
                            <div>
                                <label style={{color: formValid.name ? 'red' : '#056699'}}>{currentLange == ARABIC ? 'أسم المدير' : 'Manager name' }</label>
                                <input type="text" value={form.adminName} onChange={(e) => setForm({...form,adminName : e.target.value})}  style={{backgroundColor: formValid.name ? '#ff03033e' : '#ddd'}}/>
                            </div>
                            <div>
                                <label style={{color: formValid.password ? 'red' : '#056699'}}>{currentLange == ARABIC ? 'كلمة المرور' : 'Password' }</label>
                                <input type="password" value={form.password} onChange={(e) => setForm({...form,password : e.target.value})}  style={{backgroundColor: formValid.password ? '#ff03033e' : '#ddd'}}/>
                            </div>
                        </section>
                        <input type="submit"  value={currentLange == ARABIC ? 'تسجيل دخول' : 'Login' } />
                    </>
                }
            </AdminLoginStyle>
        </>
    )
}