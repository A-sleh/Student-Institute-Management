import { useSelector } from "react-redux";
import useGetBalanceInEachMonth from "../../../hooks/bill_hooks/useGetBalanceInEachMonth";
import { getShortNumberFormat } from "../../shared/logic/logic";
import GroupedHorizontalBar from "../charts/GroupedHorizontalBar";
import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";
import { ARABIC } from "../../../Redux/actions/type";

export default function BalanceEachMonth() {

    const {currentLange} = useSelector( state => state.language)
    const [totalBalance] = useGetBalanceInEachMonth()
 
    const data = {
        data : totalBalance.map( (monthDetails,index) => {
            let percent = 0 
            if( index ) {
                const diff = monthDetails.balance - totalBalance[index - 1].balance 
                percent = diff /  totalBalance[index - 1].balance
            }
            return {
                month: monthDetails.month , 
                balance :getShortNumberFormat(monthDetails.balance).number,
                percent : percent ,
                unit : getShortNumberFormat(monthDetails.balance).unit 
            }
        }),
        title : currentLange == ARABIC ? 'رصيد المعهد في كل شهر': 'Institute balance in each month'
    }
    
    return (
        <BackgroundLayoutStyle style={{flex: '2'}}>
            <GroupedHorizontalBar data={data} />
        </BackgroundLayoutStyle>
    );
}
