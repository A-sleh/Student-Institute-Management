import { useEffect, useState } from "react";
import useGetMonthIncomOutcomBalance from "../../../hooks/bill_hooks/useGetMonthIncomOutcomBalance";
import { BackgroundLayoutStyle, InputStatisticsStyle,  } from "../services/style";
import SimpleDonut from "../charts/SimpleDonut";
import DataServices from "../../../Data/dynamic/DataServices";
import { getShortNumberFormat } from "../../shared/logic/logic";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { ARABIC } from "../../../Redux/actions/type";


export default function IncomeOutComeBalanceInRangedMonth() {

    const {currentLange} = useSelector( state => state.language)
    const [date,setDate] = useState({ startDate: '2020-1-1' , endDate : '2000-1-1'})
    const [inComeBalance,outComeBalance] = useGetMonthIncomOutcomBalance(date.startDate,date.endDate)

    useEffect(() => {
        DataServices.ShowFirstBill().then( Bill => {
            setDate({ startDate: Bill?.data[0].date || '1990-1-1' , endDate : format(new Date(),'yyyy-MM-dd') })
        })
    } ,[])

    
    
    const data = {
        data: [
            {type: currentLange == ARABIC ? 'الدخل' : 'Income' , count : inComeBalance },
            {type: currentLange == ARABIC ? 'الخرج' : 'Outcome' , count : outComeBalance }
        ],
        balance: parseFloat(getShortNumberFormat(inComeBalance - outComeBalance ).number)  ,
        unit : getShortNumberFormat(inComeBalance - outComeBalance ).unit ,
        title: ''
    }
    
    return (
        <BackgroundLayoutStyle style={{flex: '1.2'}}>
            <div style={{display: 'flex' , gap: '5px'}}>
                <InputStatisticsStyle type={'date'} value={ format(date.startDate,'yyyy-MM-dd')} onChange={(e) => setDate({...date,startDate: e.target.value})}/>
                <InputStatisticsStyle type={'date'} value={date.endDate} onChange={(e) => setDate({...date,endDate: e.target.value})}/>
            </div>
            <SimpleDonut data={data}/>
        </BackgroundLayoutStyle>
    )
}