/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { BillsContainerStyle } from "../style/styleComponents";
import  ShowBillCard  from "./ShowBillCard";

export default function BillsContainer(props) {

    const { bills , title , radiofilter , searchInput , cardType , setSuccessDelete } = props

    return(
        <BillsContainerStyle>
            <h3>{title}</h3>
            <div className="bill-body">
                {
                    bills.map( (bill,index) => {
                        const {billNo,date,note} = bill
                        if(radiofilter.billNo && !`${billNo}`.toLowerCase().includes(searchInput.toLocaleLowerCase())) {
                            return 
                        }
                        if(radiofilter.note && !`${note}`.toLowerCase().includes(searchInput.toLocaleLowerCase())) {
                            return 
                        }
                        if(radiofilter.date && !`${date}`.toLowerCase().includes(searchInput.toLocaleLowerCase())) {
                            return 
                        }
                        return <ShowBillCard type={cardType} bill={bill} setSuccessDelete={setSuccessDelete} key={index} />
                    })
                }
            </div>
        </BillsContainerStyle>
    )
}