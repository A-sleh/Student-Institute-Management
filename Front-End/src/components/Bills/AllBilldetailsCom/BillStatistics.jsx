import { useEffect, useState } from "react";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import DataServices from "../../../Data/dynamic/DataServices";
import BillCard from "./BillCard";

export default function BillStatistics() {

    const [income,setIncome] = useState({}) 
    const [outcome,setOutcome] = useState({})
    const [restIncome,setRestIncome] = useState(0);
    const [restOutcome,setRestOutcome] = useState(0);

    useEffect(() => {
        DataServices.ShowInComeBillsBalance().then( balance => {
            setIncome(balance)
        })
        DataServices.ShowOutComeBillsBalance().then( balance => {
            setOutcome(balance)
        })
        DataServices.ShowRemeainingIncome().then( remainingMoney => {
            setRestIncome(remainingMoney)
        })
        DataServices.ShowRemeainingOutcome().then( remainingMoney => {
            setRestOutcome(remainingMoney)
        })
    } ,[])

    return(
        <div > 
            <h2 style={{fontSize: '20px' , margin: '0'}}>Total balance information</h2>
            <div style={{display: 'flex' , flexDirection: 'column' , gap: '5px' , overflow: 'hidden' , backgroundColor: '#ddd' , padding: '5px'}}>
                <BillCard title={'Total income'} content={income.income} iconPath={"bi bi-box-arrow-in-down"} color ={'#066599'} delay={100}/>
                <BillCard title={'Total outcome'} content={outcome.outcome} iconPath={"bi bi-box-arrow-in-up"} color ={'#066599'} delay={300}/>
                <BillCard title={'Balance'} content={`${parseInt(income.income) - parseInt(outcome.outcome)}`} iconPath={'bi bi-cash-coin'} color ={'#066599'} delay={500}/>
                <BillCard title={'Not obtained income'} content={restIncome} iconPath={'bi bi-coin'} color ={'#066599'} delay={700}/>
                <BillCard title={'Not paid outcome'} content={restOutcome} iconPath={"bi bi-cash-stack"} color ={'#066599'} delay={900}/>
                <BillCard title={'Total penefite'} content={`${restIncome - restOutcome + parseInt(income.income) - parseInt(outcome.outcome)}`} iconPath={"bi bi-currency-dollar"} color ={'#066599'} delay={1100}/>
            </div>
        </div>
    )
}
