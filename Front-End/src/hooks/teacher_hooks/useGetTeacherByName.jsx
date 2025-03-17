
import { errorActionLogic } from "../../components/shared/logic/logic";
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"


export default function useGetTeacherByName(searchKey,pass) {

    
    const [teacherInfo, setTeacherInfo] = useState([]);
    const [notFoundMes,setNotFoundMes] = useState(false)

    useEffect( () => {

        if(searchKey == '' || searchKey == undefined  || !pass  ) return 
        
        DataServices.SearchOnCurrentTeacherName(searchKey).then( (teachers) =>  {

            if(teachers.length == 0 ) 
                errorActionLogic(setNotFoundMes)
            setTeacherInfo(teachers)

        }) 

    },[searchKey,pass]);

    useEffect( () => {

        // reset teacher array when the search field is empty
        if(searchKey == '' ) 
            setTeacherInfo([])
    },[searchKey]);


    return [teacherInfo,notFoundMes,setNotFoundMes]
}