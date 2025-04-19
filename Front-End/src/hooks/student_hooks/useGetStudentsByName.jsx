
import { errorActionLogic } from "../../components/shared/logic/logic";
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useRef, useState } from "react"

export default function useGetStudentsByName(searchKey,pass,...reFetch) {

    const [studentInfo, setstudentInfo] = useState([]);
    const [notFoundMes,setNotFoundMes] = useState(false)
    const skipFirstRender = useRef(0)

    useEffect(() => {

        if(searchKey == '' || searchKey == undefined  || !pass  ) return 
        else {
            DataServices.SearchOnCurrentSutdentName(searchKey).then((StudentsInfo) =>  {
                
                if(StudentsInfo.length == 0 ) {
                    setstudentInfo([null])
                    errorActionLogic(setNotFoundMes)
                }
                setstudentInfo(StudentsInfo )
            }) 
        }
    },[pass,searchKey]);

    useEffect(() => {
        if(skipFirstRender.current ++ ) {
            DataServices.SearchOnCurrentSutdentName(searchKey).then((StudentsInfo) =>  {
                if(StudentsInfo.length == 0 ) {
                    setstudentInfo([null])
                }
            }) 
        }
    },[...reFetch])

    useEffect( () => {
        // reset teacher array when the search field is empty
        if(searchKey == '' ) 
            setstudentInfo([])
    },[searchKey]);
    

    return [studentInfo,notFoundMes,setNotFoundMes]
}