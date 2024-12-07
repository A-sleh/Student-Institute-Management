import GroupedHorizontalBar from "../charts/GroupedHorizontalBar";
import { BackgroundLayoutStyle, SelectorStyle } from "../services/style";

export default function BalanceEachMonth() {
 
    const data = {
        data : [
            { month: "Jul", men: 79011, women: 3808, menDelta: 149, womenDelta: 62 },
            { month: "Aug", men: 79166, women: 3841, menDelta: 155, womenDelta: 33 },
            { month: "Sep", men: 79514, women: 3813, menDelta: 348, womenDelta: 28 },
            { month: "Oct", men: 79945, women: 3856, menDelta: 411, womenDelta: 43 },
            { month: "Nov", men: 79869, women: 3796, menDelta: -76, womenDelta: -60 },
            { month: "Dec", men: 79701, women: 3783, menDelta: -168, womenDelta: -26 },
            { month: "Apr", men: -797, women: 3783, menDelta: 168, womenDelta: 26 },
        ],
        title : 'Institute balance in each month'
    }
    
    return (
        <BackgroundLayoutStyle style={{flex: '2'}}>
            <GroupedHorizontalBar data={data} />
        </BackgroundLayoutStyle>
    );
}
