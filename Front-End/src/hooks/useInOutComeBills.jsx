
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useInOutComeBills(reFrach) {
    
    const [inComeBills,setInComeBills] = useState([]) 
    const [outComeBills,setOutComeBills] = useState([]) 

    useEffect(() => {
        DataServices.ShowInComeBills().then( Bills => {
            if(inComeBills.length != Bills.length )
            setInComeBills(Bills)
        })
        DataServices.ShowOutComeBills().then( Bills => {
            if(outComeBills.length != Bills.length )
            setOutComeBills(Bills);
        })
    }, [reFrach])



    return [inComeBills,outComeBills]
}