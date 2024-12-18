/***  
    CSS-OPTIMAIZATION :  , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { LatestBillsContainerStyle } from "../style/styleComponents";
import { useNavigate } from "react-router-dom";
import ShowBillCard  from "../ExternalPaysCom/ShowBillCard";


export default function ShowLatestBills({bills,billsType,showMoreLink}) {
    
    const gotoPage = useNavigate()
    
    return (
        <LatestBillsContainerStyle >
            <h1>Lastest <span>{billsType}</span> bills </h1>
            <main>
                <div className="bill-container-cards">
                    {
                        bills.map( (bill,index) => {
                            return <ShowBillCard type={'show'} bill={bill} key={index} />
                        })
                    }
                </div>
                <button onClick={() => gotoPage(`/${showMoreLink}`)}>show more</button>
            </main>
        </LatestBillsContainerStyle>
    )
}
