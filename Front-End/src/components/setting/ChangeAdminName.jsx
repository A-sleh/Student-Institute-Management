import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChangeAdminNameTEXT } from "../../Data/static/setting/setting"
import { ADMINLOGUNG, ARABIC } from "../../Redux/actions/type"
import { AdminLoginStyle } from "./settingStyle"
import Notification from "../Global/Notification"
import DataServices from "../../Data/dynamic/DataServices"
import { errorActionLogic, successActionLogic } from "../shared/logic/logic"


export default function ChangeAdminName() {

    // Text content
    const {currentLange} = useSelector( state => state.language)
    const {newAdminName,adminName ,successChangeAdminNameMES ,errorChangeAdminNameMES ,chageBtn} = ChangeAdminNameTEXT[currentLange]
    // main state
    const formFirstState = { username : ''  }
    const [form,setForm] = useState(formFirstState)
    const [formValid,setFormValid] = useState({ username : false })
    const [successChangeName,setSuccessChangeName] = useState(false)
    const [errorChangeName,setErrorChangeName] = useState(false)
    const adminState = useDispatch()

    function validInputs() {
        const { username  } = form 
        setFormValid({
            username: username== ''
        })

        return (username != '' )
    }

    function hanldeSubmitClicked(e) {
        e.preventDefault()
        
        if(validInputs()) {

            DataServices.ChangeAdminName(form ).then (res => {
                if( res.status < 300 ) {
                    successActionLogic(setSuccessChangeName)
                    adminState({  type: ADMINLOGUNG ,  payload: { isAdmin: true , adminName: form.username }})
                    setForm(formFirstState)
                }else {
                    errorActionLogic(setErrorChangeName)
                }
            })
        }else {
            errorActionLogic(setErrorChangeName)
        }
        
    }

    return (
        <>
            <Notification title={errorChangeAdminNameMES} type={"error"} state={errorChangeName} setState={setErrorChangeName} />   
            <Notification title={successChangeAdminNameMES} type={"success"} state={successChangeName} setState={setSuccessChangeName} />   
            <h3 style={{margin: '10px 0'}}><i className={currentLange == ARABIC ? "bi bi-caret-left-fill": "bi bi-caret-right-fill"} style={{color: '#056699'}}></i>{newAdminName}</h3>
            <AdminLoginStyle onSubmit={(e) => hanldeSubmitClicked(e) }>
                <section>
                    <div>
                        <label style={{color: formValid.username ? 'red' : '#056699'}}>{adminName }</label>
                        <input type="text" value={form.username} onChange={(e) => setForm({username : e.target.value})}  style={{backgroundColor: formValid.username ? '#ff03033e' : '#ddd'}}/>
                    </div>
                </section>
                <input type="submit"  value={chageBtn } />
            </AdminLoginStyle>
        </>
    )
}