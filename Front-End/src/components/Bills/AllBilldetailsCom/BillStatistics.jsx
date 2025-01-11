/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import BillCard from "./BillCard";
import useInstituteBillsBalance from "../../../hooks/useInstituteBillsBalance";
import { BillStatisticesContainerStyle } from "../style/styleComponents";
import { useSelector } from "react-redux";
import { ARABIC } from "../../../Redux/actions/type";

export default function BillStatistics() {

    const {currentLange} = useSelector( state => state.language)
    const [income,outcome,balance,restIncome,restOutcome,penefite] = useInstituteBillsBalance()

    const billCardsList = [
        {
            title : {
                english: 'Total income' ,
                arabic: 'إجمالي رصيد الدخل'
            },
            content : income,
            iconPath : "bi bi-box-arrow-in-down",
            delay : 100,
        },
        {
            title : {
                english: 'Total outcome' ,
                arabic: 'إجمالي رصيد الخرج'
            } ,
            content : outcome,
            iconPath : "bi bi-box-arrow-in-up",
            delay : 300,
        },
        {
            title : {
                english: 'Balance' ,
                arabic: 'الرصيد الحالي'
            } ,
            content : balance,
            iconPath : 'bi bi-cash-coin',
            delay : 500,
        },
        {
            title : {
                english: 'Not obtained income' ,
                arabic: 'الرصيد الغير مقبوض'
            } ,
            content : restIncome,
            iconPath : 'bi bi-coin',
            delay : 700,
        },
        {
            title : {
                english: 'Not paid outcome' ,
                arabic: 'المبلغ الواجب دفعه'
            },
            content : restOutcome,
            iconPath : "bi bi-cash-stack",
            delay : 900,
        },
        {
            title : {
                english: 'Total penefite' ,
                arabic: 'إجمالي الفوائد'
            },
            content : penefite,
            iconPath : "bi bi-currency-dollar",
            delay : 1100,
        },
    ]

    return(
        <BillStatisticesContainerStyle > 
            <h1 style={{marginBottom: currentLange == ARABIC ? '8px' : '0'}}>{currentLange == 'arabic' ? 'معلوومات حول الرصيد الاجمالي': 'Total balance information'}</h1>
            <div className="bills">
                {
                    billCardsList.map( (bill,index) => {
                        const { title ,content ,iconPath ,delay } = bill
                        return <BillCard key={index} title={title[currentLange]} content={content} iconPath={iconPath} delay={delay}/>
                    })
                }
            </div>
        </BillStatisticesContainerStyle>
    )
}
