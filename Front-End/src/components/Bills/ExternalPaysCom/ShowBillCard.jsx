
/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { BillCardStyle } from "../style/styleComponents";
import { useState } from "react";
import { format } from "date-fns";
import DeleteModal from "../../Modal/DeleteModal";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import { useSelector } from "react-redux";

export default function ShowBillCard({type,bill,setSuccessDelete}) {

    const {currentLange} = useSelector( state => state.language)

    const { date , amount , note , billNo , billId } = bill ; 
    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <>
            {
                deleteModal && 
                <DeleteModal element={billNo} type={"Bill"} id={{billId}} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDelete} />
            }
            <BillCardStyle >
                <section>
                    <span style={{fontWeight: '600'}}>{billNo|| 'Bill number...'}</span>
                    {
                        type == 'manage' &&
                        <i className="bi bi-trash3" style={{color: 'red' , cursor: 'pointer' , marginLeft: '10px'}} onClick={() => setDeleteModal(true)}></i>
                    }
                </section>
                <section>
                    <span style={{fontWeight: '500'}}> <span style={{fontSize: '16px',fontWeight: '600',direction: currentLange == 'arabic' ? 'rtl': 'ltr'}}>{currentLange == 'arabic' ? 'المبلغ': 'Amount'} </span> <span style={{direction: 'rtl'}}>{addSpaceBetweenDigit(amount,currentLange)}</span></span>
                    <span>{ format(new Date(date) , 'yyyy / MM / dd')}</span>
                </section>
                <footer>
                    {note || 'Bill note...'} 
                </footer>
            </BillCardStyle >
        </>
    )
    
}