import { useEffect, useState } from "react";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import DataServices from "../../../Data/dynamic/DataServices";
import BillCard from "./BillCard";

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
        <div > 
            <h2 style={{fontSize: '20px' , margin: '0'}}>Total balance information</h2>
            <div style={{display: 'flex' , flexDirection: 'column' , gap: '5px' , overflow: 'hidden' , backgroundColor: '#ddd' , padding: '5px'}}>
                <BillCard title={'Total income'} content={income.income} iconPath={"bi bi-box-arrow-in-down"} color ={'#066599'} delay={100}/>
                <BillCard title={'Total outcome'} content={outcome.outcome} iconPath={"bi bi-box-arrow-in-up"} color ={'#066599'} delay={300}/>
                <BillCard title={'Balance'} content={`${parseInt(income.income) - parseInt(outcome.outcome)}`} iconPath={'bi bi-cash-coin'} color ={'#066599'} delay={500}/>
                <BillCard title={'Not obtained income'} content={income.income} iconPath={'bi bi-coin'} color ={'#066599'} delay={700}/>
                <BillCard title={'Not paid outcome'} content={outcome.outcome} iconPath={"bi bi-cash-stack"} color ={'#066599'} delay={900}/>
                <BillCard title={'Total penefite'} content={`${parseInt(income.income) - parseInt(outcome.outcome)}`} iconPath={"bi bi-currency-dollar"} color ={'#066599'} delay={1100}/>
            </div>
        </div>
    )
}

{
            // <div style={{backgroundColor : '#ddd' , padding: '10px' , borderRadius: '5px' , display: 'flex' ,flexDirection: 'column'  , width: '400px'}}>
        //     <h2 style={{fontSize: '20px' , margin: '0'}}>Total balance information</h2>
        //     <div style={{display: 'flex' , flexDirection: 'column' , marginBottom: '10px'}}>
        //         <div className="row" style={{display: 'flex' , justifyContent: 'space-between' , backgroundColor: 'white' , padding: '10px' , borderRadius: '5px'}}>
        //             <div>
        //                 <h2 style={{fontSize: '17px' , color: '#066599'}}>Total income</h2>
        //                 <span style={{fontSize: '18px' , fontWeight: '600'}} >{addSpaceBetweenDigit(income.income)}</span>
        //             </div>
        //             <div>
        //                 <h2 style={{fontSize: '17px' , color: '#066599'}}>Total outcome</h2>
        //                 <span style={{fontSize: '18px' , fontWeight: '600'}}>{addSpaceBetweenDigit(outcome.outcome)}</span>
        //             </div>
        //         </div>
        //         <div className="row"  style={{display: 'flex' , justifyContent: 'space-between' , backgroundColor: 'white' , padding: '10px' , borderRadius: '5px'}}>
        //             <h2 style={{fontSize: '17px' , color: '#066599'}}>Balance</h2>
        //             <span style={{fontSize: '18px' , fontWeight: '600'}}>{addSpaceBetweenDigit(`${parseInt(income.income) - parseInt(outcome.outcome)}`)}</span>
        //         </div>
        //     </div>
        //     <div style={{display: 'flex' , flexDirection: 'column' }}>
        //         <div className="row" style={{display: 'flex' , justifyContent: 'space-between' , backgroundColor: 'white' , padding: '10px' , borderRadius: '5px'}}>
        //             <div>
        //                 <h2 style={{fontSize: '17px' , color: '#066599'}}>Not obtained income</h2>
        //                 <span style={{fontSize: '18px' , fontWeight: '600'}} >{addSpaceBetweenDigit(income.income)}</span>
        //             </div>
        //             <div>
        //                 <h2 style={{fontSize: '17px' , color: '#066599'}}>Not paid outcome</h2>
        //                 <span style={{fontSize: '18px' , fontWeight: '600'}}>{addSpaceBetweenDigit(outcome.outcome)}</span>
        //             </div>
        //         </div>
        //         <div className="row"  style={{display: 'flex' , justifyContent: 'space-between' , backgroundColor: 'white' , padding: '10px' , borderRadius: '5px'}}>
        //             <h2 style={{fontSize: '17px' , color: '#066599'}}>Total penefite</h2>
        //             <span style={{fontSize: '18px' , fontWeight: '600'}}>{addSpaceBetweenDigit(`${parseInt(income.income) - parseInt(outcome.outcome)}`)}</span>
        //         </div>
        //     </div>
        // </div>
}