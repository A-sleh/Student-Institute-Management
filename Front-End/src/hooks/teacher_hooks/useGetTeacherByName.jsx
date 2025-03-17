
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"


export default function useGetTeacherByName(searchKey,pass) {

    
    const [teacherInfo, setTeacherInfo] = useState([]);

    useEffect( () => {

        if(searchKey == '' || searchKey == undefined  || !pass  ) return 
        
        DataServices.SearchOnCurrentTeacherName(searchKey).then( (teachers) =>  setTeacherInfo(teachers)) 

    },[searchKey,pass]);


    return [teacherInfo]
}