
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useSearchIncomBills(query,pass,searchField) {
    
    const [inComeBills,setInComeBills] = useState([]) 

    useEffect(() => {
        
        if(searchField == '') setInComeBills([])
        if( !pass || query == ''  ) return 
        DataServices.SearchingIncomBills(query).then( Bills => {
            if(Bills.length == 0 ) setInComeBills([null])
            else setInComeBills(Bills)
        })
    }, [pass,searchField])
    
    return inComeBills
}