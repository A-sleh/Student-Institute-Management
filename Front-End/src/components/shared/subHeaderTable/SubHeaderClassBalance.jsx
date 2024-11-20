

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
                <p >{addSpaceBetweenDigit(classBalance.total)}</p>
            </div>
            <div>
                <span>Paid</span>
                <p>{addSpaceBetweenDigit(classBalance.paid)}</p>
            </div>
            <div >
                <span >Remaining</span>
                <p >{addSpaceBetweenDigit(classBalance.remaining)}</p>
            </div>
        </ShowClassBalanceHeaderStyle > 
    )
}
