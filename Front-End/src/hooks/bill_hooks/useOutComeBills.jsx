
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useOutComeBills(limit,page,...reFrach) {
    
    const [outComeBills,setOutComeBills] = useState([]) 

    useEffect(() => {
        DataServices.ShowLasteExternalBill('external',limit,page,'paymentType=out').then( Bills => {
            setOutComeBills(Bills);
        })
    }, [...reFrach,page])



    return [outComeBills]
}