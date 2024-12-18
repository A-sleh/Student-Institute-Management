import useInstituteBillsBalance from "../../../hooks/useInstituteBillsBalance";
import BillCard from "../../Bills/AllBilldetailsCom/BillCard";



export default function TotalInstituteBalance() {
 
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

    
    return (
        <div style={{display: 'flex', backgroundColor: '#ddd', flexWrap: 'wrap' , padding: '10px' , marginBottom: '20px' , gap: '5px' , overflow: 'hidden'}}>
            {
                billCardsList.map( (bill,index) => {
                    const { title ,content ,iconPath ,delay } = bill
                    return <BillCard title={title} content={content} iconPath={iconPath} delay={delay} key={index}/>
                })
            }
        </div> 
    );
}
