
/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { CloseButtonStyle, SearchButtonStyle } from "../style/styleComponents";
import { FillterBillsHeader } from "../../shared/FillterBillsHeader";
import { useState } from "react"
import Notification from "../../Global/Notification";
import useInOutComeBills from "../../../hooks/bill_hooks/useInOutComeBills";
import BillsContainer from "./BillsContainer";
import { useSelector } from "react-redux";
import { ManageExternalBillsTEXT } from "../../../Data/static/Bills/ExternalPaysCom/ManageExternalBillsTEXT";

export default function ShowBillExternalDetails() {

    const {currentLange} = useSelector( state => state.language)
    const {searchTitle ,closeBtn ,incomeTitle ,outComeTitle ,successDeleteBillMES} = ManageExternalBillsTEXT[currentLange]

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
            <Notification  title={successDeleteBillMES} type={'success'} state ={successDelete} setState={setSuccessDelete}/>
            {
                !openSearch ? <SearchButtonStyle onClick={()=>setOpenSearch(true)} >{searchTitle} </SearchButtonStyle> : 
                <FillterBillsHeader  radioState={radioState} setRadioState={setRadioState} searchFiled={searchFiled} setSearchFiled={setSearchFiled}>
                    <CloseButtonStyle onClick={()=>{setOpenSearch(false);setSearchFiled('')}}> {closeBtn} </CloseButtonStyle>
                </FillterBillsHeader>
            }
            <BillsContainer bills={inComeBills} title={incomeTitle} radiofilter={radioState} searchInput={searchFiled} cardType={'show'} setSuccessDelete={setSuccessDelete} />
            <BillsContainer bills={outComeBills} title={outComeTitle} radiofilter={radioState} searchInput={searchFiled} cardType={'show'} setSuccessDelete={setSuccessDelete} />
        </>
    )
}
