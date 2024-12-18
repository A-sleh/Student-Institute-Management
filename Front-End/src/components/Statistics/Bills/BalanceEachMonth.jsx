import useGetBalanceInEachMonth from "../../../hooks/bill_hooks/useGetBalanceInEachMonth";
import GroupedHorizontalBar from "../charts/GroupedHorizontalBar";
import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";

export default function BalanceEachMonth() {

    const [totalBalance] = useGetBalanceInEachMonth()
 
    const data = {
        data : totalBalance.map( (monthDetails,index) => {
            let percent = 0 
            if( index ) {
                const diff = monthDetails.balance - monthDetails[index - 1].balance 
                percent = diff /  monthDetails.balance
            }
            return {
                month: monthDetails.month , 
                balance : monthDetails.balance ,
                percent : percent
            }
        }),
        title : 'Institute balance in each month'
    }
    
    return (
        <BackgroundLayoutStyle style={{flex: '2'}}>
            <GroupedHorizontalBar data={data} />
        </BackgroundLayoutStyle>
    );
}
