

import { useEffect, useState } from "react";
import { ShowClassBalanceHeaderStyle } from "../../Bills/style/styleComponents";
import DataServices from "../../../Data/dynamic/DataServices";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import { useSelector } from "react-redux";
import { SubHeaderClassBalanceTEXT } from "../../../Data/static/subHeaderTable/subHeaderTableTEXT";

export default function SubHeaderClassBalance({classId}) {

    const {currentLange} = useSelector( state => state.language)
    const {totalTitle ,paidTitle ,remainingTitle} = SubHeaderClassBalanceTEXT[currentLange]

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
                <span >{totalTitle}</span>
                <span >{addSpaceBetweenDigit(classBalance.total)}</span>
            </div>
            <div>
                <span>{paidTitle}</span>
                <span>{addSpaceBetweenDigit(classBalance.paid)}</span>
            </div>
            <div >
                <span >{remainingTitle}</span>
                <span >{addSpaceBetweenDigit(classBalance.remaining)}</span>
            </div>
        </ShowClassBalanceHeaderStyle > 
    )
}
