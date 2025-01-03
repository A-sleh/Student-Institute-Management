
/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { CloseButtonStyle, SearchButtonStyle } from "../style/styleComponents";
import { FillterBillsHeader } from "../../shared/FillterBillsHeader";
import { useState } from "react"
import Notification from "../../Global/Notification";
import useInOutComeBills from "../../../hooks/useInOutComeBills";
import BillsContainer from "./BillsContainer";

export default function ShowBillExternalDetails() {

    const [successDelete,setSuccessDelete] = useState(false);
    const [openSearch,setOpenSearch] = useState(false)
    const [inComeBills,outComeBills] = useInOutComeBills(successDelete)
    const [searchFiled,setSearchFiled] = useState('');
    const [radioState,setRadioState] = useState({
        billNo: true , 
        date: false ,
        note : false
    })


    return (
        <>
            <Notification  title={'Bill Delelte'} type={'success'} state ={successDelete} setState={setSuccessDelete}/>
            {
                !openSearch ? <SearchButtonStyle onClick={()=>setOpenSearch(true)} >Search </SearchButtonStyle> : 
                <FillterBillsHeader radioState={radioState} setRadioState={setRadioState} searchFiled={searchFiled} setSearchFiled={setSearchFiled}>
                    <CloseButtonStyle onClick={()=>{setOpenSearch(false);setSearchFiled('')}}> Close </CloseButtonStyle>
                </FillterBillsHeader>
            }
            <BillsContainer bills={inComeBills} title={'In Come Bills'} radiofilter={radioState} searchInput={searchFiled} cardType={'show'} setSuccessDelete={setSuccessDelete} />
            <BillsContainer bills={outComeBills} title={'Out Come Bills'} radiofilter={radioState} searchInput={searchFiled} cardType={'show'} setSuccessDelete={setSuccessDelete} />
        </>
    )
}
