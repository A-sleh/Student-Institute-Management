
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export const intialStateBills = {
    data : [] ,
    page : 1 ,
    total: 1
}

export default function useOutComeBills(limit,page,...reFrach) {

    const [outComeBills,setOutComeBills] = useState(intialStateBills) 

    useEffect(() => {
        DataServices.ShowLasteExternalBill('external',limit,page,'paymentType=out').then( Bills => {
            setOutComeBills(Bills);
        })
    }, [...reFrach,page])

    return outComeBills
}