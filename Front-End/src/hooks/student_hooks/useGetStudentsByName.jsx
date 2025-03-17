
import { errorActionLogic } from "../../components/shared/logic/logic";
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetStudentsByName(searchKey,pass) {

    const [studentInfo, setstudentInfo] = useState([]);
    const [notFoundMes,setNotFoundMes] = useState(false)

    useEffect(() => {

        if(searchKey == '' || searchKey == undefined  || !pass  ) return 
        else {
            DataServices.SearchOnCurrentSutdentName(searchKey).then((StudentsInfo) =>  {
                
                if(StudentsInfo.length == 0 ) 
                    errorActionLogic(setNotFoundMes)

                setstudentInfo(StudentsInfo )
            }) 
        }
    },[searchKey,pass]);

    useEffect( () => {

        // reset teacher array when the search field is empty
        if(searchKey == '' ) 
            setstudentInfo([])
    },[searchKey]);
    

    return [studentInfo,notFoundMes,setNotFoundMes]
}