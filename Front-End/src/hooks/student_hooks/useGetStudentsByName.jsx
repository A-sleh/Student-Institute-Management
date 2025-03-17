
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetStudentsByName(searchKey,pass) {

    const [studentInfo, setstudentInfo] = useState([]);

    useEffect(() => {

        if(searchKey == '' || searchKey == undefined  || !pass  ) return 
        else {
            DataServices.SearchOnCurrentSutdentName(searchKey).then((StudentsInfo) =>  
                setstudentInfo(StudentsInfo.length != 0 ? StudentsInfo : 'empty')
            ) 
        }
    },[searchKey,pass]);
    

    return [studentInfo]
}