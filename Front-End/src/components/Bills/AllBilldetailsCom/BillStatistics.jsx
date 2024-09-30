import { useEffect, useState } from "react";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import DataServices from "../../../Data/dynamic/DataServices";

export default function BillStatistics() {

    const [income,setIncome] = useState({}) 
    const [outcome,setOutcome] = useState({})

    useEffect(() => {
        DataServices.ShowInComeBillsBalance().then( balance => {
            setIncome(balance)
        })
        DataServices.ShowOutComeBillsBalance().then( balance => {
            setOutcome(balance)
        })
    } ,[])

    return( 
        <div style={{backgroundColor : '#ddd' , padding: '10px' , borderRadius: '5px' , display: 'flex' ,flexDirection: 'column'  , width: '400px'}}>
            <h2 style={{fontSize: '20px' , margin: '0'}}>Total balance information</h2>
            <div style={{display: 'flex' , flexDirection: 'column' , marginBottom: '10px'}}>
                <div className="row" style={{display: 'flex' , justifyContent: 'space-between' , backgroundColor: 'white' , padding: '10px' , borderRadius: '5px'}}>
                    <div>
                        <h2 style={{fontSize: '17px' , color: '#066599'}}>Total income</h2>
                        <span style={{fontSize: '18px' , fontWeight: '600'}} >{addSpaceBetweenDigit(income.income)}</span>
                    </div>
                    <div>
                        <h2 style={{fontSize: '17px' , color: '#066599'}}>Total outcome</h2>
                        <span style={{fontSize: '18px' , fontWeight: '600'}}>{addSpaceBetweenDigit(outcome.outcome)}</span>
                    </div>
                </div>
                <div className="row"  style={{display: 'flex' , justifyContent: 'space-between' , backgroundColor: 'white' , padding: '10px' , borderRadius: '5px'}}>
                    <h2 style={{fontSize: '17px' , color: '#066599'}}>Balance</h2>
                    <span style={{fontSize: '18px' , fontWeight: '600'}}>{addSpaceBetweenDigit(`${parseInt(income.income) - parseInt(outcome.outcome)}`)}</span>
                </div>
            </div>
            <div style={{display: 'flex' , flexDirection: 'column' }}>
                <div className="row" style={{display: 'flex' , justifyContent: 'space-between' , backgroundColor: 'white' , padding: '10px' , borderRadius: '5px'}}>
                    <div>
                        <h2 style={{fontSize: '17px' , color: '#066599'}}>Not obtained income</h2>
                        <span style={{fontSize: '18px' , fontWeight: '600'}} >{addSpaceBetweenDigit(income.income)}</span>
                    </div>
                    <div>
                        <h2 style={{fontSize: '17px' , color: '#066599'}}>Not paid outcome</h2>
                        <span style={{fontSize: '18px' , fontWeight: '600'}}>{addSpaceBetweenDigit(outcome.outcome)}</span>
                    </div>
                </div>
                <div className="row"  style={{display: 'flex' , justifyContent: 'space-between' , backgroundColor: 'white' , padding: '10px' , borderRadius: '5px'}}>
                    <h2 style={{fontSize: '17px' , color: '#066599'}}>Total penefite</h2>
                    <span style={{fontSize: '18px' , fontWeight: '600'}}>{addSpaceBetweenDigit(`${parseInt(income.income) - parseInt(outcome.outcome)}`)}</span>
                </div>
            </div>
        </div>
    )
}