import { useEffect, useState } from "react";
import useGetMonthIncomOutcomBalance from "../../../hooks/bill_hooks/useGetMonthIncomOutcomBalance";
import { BackgroundLayoutStyle, InputStatisticsStyle,  } from "../services/style";
import SimpleDonut from "../charts/SimpleDonut";
import DataServices from "../../../Data/dynamic/DataServices";
import { format } from "date-fns";


export default function IncomeOutComeBalanceInRangedMonth() {

    const [date,setDate] = useState({ startDate: '1990-1-1' , endDate : '1990-1-1'})
    const [inComeBalance,outComeBalance] = useGetMonthIncomOutcomBalance(date.startDate,date.endDate)

    useEffect(() => {
        DataServices.ShowFirstBill().then( Bill => {
            setDate({ startDate: Bill[0]?.date , endDate : format(new Date(),'yyyy-MM-dd') })
        })
    } ,[])

    
    
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
                <InputStatisticsStyle type={'date'} value={ format(date.startDate,'yyyy-MM-dd')} onChange={(e) => setDate({...date,startDate: e.target.value})}/>
                <InputStatisticsStyle type={'date'} value={date.endDate} onChange={(e) => setDate({...date,endDate: e.target.value})}/>
            </div>
            <SimpleDonut data={data}/>
        </BackgroundLayoutStyle>
    )
}