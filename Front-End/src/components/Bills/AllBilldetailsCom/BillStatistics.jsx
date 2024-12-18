/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import BillCard from "./BillCard";
import useInstituteBillsBalance from "../../../hooks/useInstituteBillsBalance";
import { BillStatisticesContainerStyle } from "../style/styleComponents";

export default function BillStatistics() {

    const [income,outcome,balance,restIncome,restOutcome,penefite] = useInstituteBillsBalance()

    const billCardsList = [
        {
            title : 'Total income',
            content : income,
            iconPath : "bi bi-box-arrow-in-down",
            delay : 100,
        },
        {
            title : 'Total outcome',
            content : outcome,
            iconPath : "bi bi-box-arrow-in-up",
            delay : 300,
        },
        {
            title : 'Balance',
            content : balance,
            iconPath : 'bi bi-cash-coin',
            delay : 500,
        },
        {
            title : 'Not obtained income',
            content : restIncome,
            iconPath : 'bi bi-coin',
            delay : 700,
        },
        {
            title : 'Not paid outcome',
            content : restOutcome,
            iconPath : "bi bi-cash-stack",
            delay : 900,
        },
        {
            title : 'Total penefite',
            content : penefite,
            iconPath : "bi bi-currency-dollar",
            delay : 1100,
        },
    ]

    return(
        <BillStatisticesContainerStyle > 
            <h1>Total balance information</h1>
            <div className="bills">
                {
                    billCardsList.map( (bill,index) => {
                        const { title ,content ,iconPath ,delay } = bill
                        return <BillCard key={index} title={title} content={content} iconPath={iconPath} delay={delay}/>
                    })
                }
            </div>
        </BillStatisticesContainerStyle>
    )
}
