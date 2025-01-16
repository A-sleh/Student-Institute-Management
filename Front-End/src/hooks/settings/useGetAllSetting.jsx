import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetAllSetting() {

    const [settings,setSettings] = useState({})
    
    useEffect(() => {
        DataServices.ShowCurrentSettings().then( res => setSettings(res) ) 
    },[])

    return settings
}