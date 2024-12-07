
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useInstituteBillsBalance() {
    
    const [income,setIncome] = useState(0) 
    const [outcome,setOutcome] = useState(0)
    const [restIncome,setRestIncome] = useState(0);
    const [restOutcome,setRestOutcome] = useState(0);
    const balance = parseInt(income) - parseInt(outcome)
    const penefite = restIncome - restOutcome + parseInt(income) - parseInt(outcome)

    useEffect(() => {
        DataServices.ShowInComeBillsBalance().then( income => {
            setIncome(income)
        })
        DataServices.ShowOutComeBillsBalance().then( outcome => {
            setOutcome(outcome)
        })
        DataServices.ShowRemeainingIncome().then( remainingMoney => {
            setRestIncome(remainingMoney)
        })
        DataServices.ShowRemeainingOutcome().then( remainingMoney => {
            setRestOutcome(remainingMoney)
        })
    } ,[])


    return [income,outcome,balance,restIncome,restOutcome,penefite]
}