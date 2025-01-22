


import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useGetMonthIncomOutcomBalance(startDate,endDate) {

    const [inComeBalance,setInComeBalance] = useState(0)
    const [outComeBalance,setOutComeBalance] = useState(0)
    
    if( (new Date(startDate) - new Date(endDate)) > 0 ) {
        const tempDate = startDate 
        startDate = endDate 
        endDate = tempDate
    }

    useEffect(() => {
        if( startDate == '' || endDate == '' || startDate == undefined || endDate == undefined) return 
        DataServices.ShowIncomeBalanceInCurrentRange(startDate,endDate).then( incomeBalance => {
            setInComeBalance(incomeBalance)
        })
        DataServices.ShowoutcomeBalanceInCurrentRange(startDate,endDate).then( outcomeBalance => {
            setOutComeBalance(outcomeBalance)
        })
    },[startDate,endDate])

    return [inComeBalance,outComeBalance]
}