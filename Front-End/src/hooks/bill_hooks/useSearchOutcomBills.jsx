
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useSearchOutcomBills(query,pass,searchField) {
    
    const [outComeBills,setOutcomeBills] = useState([]) 

    useEffect(() => {

        if(searchField == '') setOutcomeBills([])
        if( !pass || query == '' ) return 
        DataServices.SearchingOutcomeBills(query).then( Bills => {
            if(Bills.length == 0 ) setOutcomeBills([null])
            else setOutcomeBills(Bills)
        })
    }, [pass,searchField])
    
    return outComeBills
}