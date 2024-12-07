import { useState } from "react";
import useGetMonthIncomOutcomBalance from "../../../hooks/bill_hooks/useGetMonthIncomOutcomBalance";
import { BackgroundLayoutStyle, InputStatisticsStyle, SelectorStyle } from "../services/style";
import SimpleDonut from "../charts/SimpleDonut";


export default function IncomeOutComeBalanceInRangedMonth() {

    const [date,setDate] = useState({ startDate: '' , endDate : ''})
    const [inComeBalance,outComeBalance] = useGetMonthIncomOutcomBalance(date.startDate,date.endDate)
    
    const data = {
        data: [
            {type: 'Income' , count : inComeBalance },
            {type: 'Outcome' , count : outComeBalance }
        ],
        balance: inComeBalance - outComeBalance ,
        title: ''
    }

    return (
        <BackgroundLayoutStyle style={{flex: '1.5'}}>
            <div style={{display: 'flex' , gap: '5px'}}>
                <InputStatisticsStyle type={'date'} value={date.startDate} onChange={(e) => setDate({...date,startDate: e.target.value})}/>
                <InputStatisticsStyle type={'date'} value={date.endDate} onChange={(e) => setDate({...date,endDate: e.target.value})}/>
            </div>
            <SimpleDonut data={data}/>
        </BackgroundLayoutStyle>
    )
}