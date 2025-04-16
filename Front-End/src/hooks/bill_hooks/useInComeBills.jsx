
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"
import { intialStateBills } from "./useOutComeBills"

export default function useInComeBills(limit,page,...reFrach) {
    
    const [inComeBills,setInComeBills] = useState(intialStateBills) 

    useEffect(() => {
        DataServices.ShowLasteExternalBill('external',limit,page,'paymentType=in').then( Bills => {
            setInComeBills(Bills)
        })
    }, [...reFrach,page])
    
    return inComeBills
}