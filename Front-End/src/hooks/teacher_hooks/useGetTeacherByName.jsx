
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useRef, useState } from "react"


export default function useGetTeacherByName(searchKey,pass,...reFetch) {

    
    const [teacherInfo, setTeacherInfo] = useState([null]);
    const [notFoundMes,setNotFoundMes] = useState(false)
    const skipFirstRender = useRef(0)

    useEffect( () => {

        if(searchKey == '' || searchKey == undefined  || !pass  ) return 
        
        DataServices.SearchOnCurrentTeacherName(searchKey).then( (teachers) =>  {
            if(teachers.length == 0 ) 
                setTeacherInfo([null])
            else 
                setTeacherInfo(teachers)
        }) 

    },[searchKey,pass]);

    useEffect(() => {
        if(skipFirstRender.current ++ ) {
            DataServices.SearchOnCurrentTeacherName(searchKey).then( (teachers) =>  {
                if(teachers.length == 0 ) 
                    setTeacherInfo([null])
            }) 
        }
    },[...reFetch])

    useEffect( () => {

        // reset teacher array when the search field is empty
        if(searchKey == '' ) 
            setTeacherInfo([])
    },[searchKey]);


    return [teacherInfo,notFoundMes,setNotFoundMes]
}