import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ARABIC, ENGLISH } from "../../Redux/actions/type"
import useGetAllSetting from "../../hooks/settings/useGetAllSetting"
import DataServices from "../../Data/dynamic/DataServices"

export default function LanguageList() {

    
    const {currentLange} = useSelector( state => state.language)
    const langList = ['ENGLISH' , 'ARABIC']
    const [open,setOpent] = useState(false)
    const changeLang = useDispatch() 

    function handleLanguageClicked(lang) {

        DataServices.ChangeTheLanguage({"language" :lang ==  ENGLISH ? 'en' : 'ar' })
        changeLang({
            payload: lang , 
            type: lang 
        })
    }

    return (
        <>
            <h3 style={{marginBottom: '6px'}}><i className={currentLange == ARABIC ? "bi bi-caret-left-fill": "bi bi-caret-right-fill"} style={{color: '#056699'}}></i>{currentLange == ARABIC ? ' اللغة :': " Language : "}</h3>
            <div onClick={() => setOpent(last => !last)} style={{backgroundColor: '#ddd',overflow: 'hidden' , borderRadius: '10px', cursor: 'pointer'}}>
                <div style={{padding: '15px' , fontWeight: '500' , display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
                    <span style={{fontWeight: '700' , fontSize: '18px'}}>{currentLange == ARABIC ? 'تحديد اللغة': "Select Language"}</span>
                    <i className= {open ? "bi bi-caret-up-fill": "bi bi-caret-down-fill"} style={{color: '#056699'}}></i>
                </div>
                <div style={{display: 'grid' , gridTemplateRows: open ? '1fr' :'0' }}>
                    <div style={{display: 'flex' , flexDirection: 'column' }}>
                        {
                            langList.map( language => {
                                return <span onClick={() => handleLanguageClicked(language.toLocaleLowerCase())}style={{fontWeight: currentLange == language.toLocaleLowerCase() ? '600': '400',color: 'white',padding: '15px 20px' , width: '100%' , backgroundColor: '#056599b0'}}>{language}</span>
                            })
                        }    
                    </div>
                </div>
            </div>
        </>
    )
}