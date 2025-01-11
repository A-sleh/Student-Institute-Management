/***  
    CSS-OPTIMAIZATION :  , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { LatestBillsContainerStyle } from "../style/styleComponents";
import { useNavigate } from "react-router-dom";
import ShowBillCard  from "../ExternalPaysCom/ShowBillCard";
import { useSelector } from "react-redux";
import { ARABIC } from "../../../Redux/actions/type";


export default function ShowLatestBills({bills,billsType,showMoreLink}) {
    
    const {currentLange} = useSelector( state => state.language)
    const gotoPage = useNavigate()
    
    return (
        <LatestBillsContainerStyle >
            <h1 style={{marginBottom: currentLange == ARABIC ? '8px' : '0'}}>{currentLange == 'arabic' ? 'اخر' : 'Lastest' } {currentLange == 'arabic'  ? <>الفواتير <span>{billsType}</span></> :  <><span>{billsType}</span> bills</> }</h1>
            <main>
                <div className="bill-container-cards">
                    {
                        bills.map( (bill,index) => {
                            return <ShowBillCard type={'show'} bill={bill} key={index} />
                        })
                    }
                </div>
                <button onClick={() => gotoPage(`/${showMoreLink}`)}>{currentLange == 'arabic' ? 'عرض المزيد' : 'show more' }</button>
            </main>
        </LatestBillsContainerStyle>
    )
}
