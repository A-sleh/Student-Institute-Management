

import { useEffect, useState } from "react";
import { ShowClassBalanceHeaderStyle } from "../../Bills/style/styleComponents";
import DataServices from "../../../Data/dynamic/DataServices";
import addSpaceBetweenDigit from "../../Global/globalStyle";

export default function SubHeaderClassBalance({classId}) {

    const [classBalance,setClassBalance] = useState({total:0,paid:0,remaining:0})
    const hiddenTheSecion = classId != 'All'
    
    useEffect(() => {
        if(classId == 'All') return 
        
        DataServices.ShowClassBillsDetails(classId).then( details => {
            setClassBalance(details)
        })     
    },[classId])

    return ( 
        hiddenTheSecion &&    
        <ShowClassBalanceHeaderStyle >
            <div >
                <span >Total</span>
                <span >{addSpaceBetweenDigit(classBalance.total)}</span>
            </div>
            <div>
                <span>Paid</span>
                <span>{addSpaceBetweenDigit(classBalance.paid)}</span>
            </div>
            <div >
                <span >Remaining</span>
                <span >{addSpaceBetweenDigit(classBalance.remaining)}</span>
            </div>
        </ShowClassBalanceHeaderStyle > 
    )
}
