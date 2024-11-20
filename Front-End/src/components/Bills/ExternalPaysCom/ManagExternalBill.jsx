/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { CloseButtonStyle, SearchButtonStyle } from "../style/styleComponents";
import { useState } from "react"
import { SeacherInputHeader } from "../StudentsPaysCom/StudentBillDetails";
import Notification from "../../Global/Notification";
import BillsContainer from "./BillsContainer";
import useInOutComeBills from "../../../hooks/useInOutComeBills";

export default function ManagExternalBill() {


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
                <SeacherInputHeader radioState={radioState} setRadioState={setRadioState} searchFiled={searchFiled} setSearchFiled={setSearchFiled}>
                    <CloseButtonStyle onClick={()=>{setOpenSearch(false);setSearchFiled('')}}> Close </CloseButtonStyle>
                </SeacherInputHeader>
            }
            <BillsContainer bills={inComeBills} title={'In Come Bills'} radiofilter={radioState} searchInput={searchFiled} cardType={'manage'} setSuccessDelete={setSuccessDelete} />
            <BillsContainer bills={outComeBills} title={'Out Come Bills'} radiofilter={radioState} searchInput={searchFiled} cardType={'manage'} setSuccessDelete={setSuccessDelete} />
        </>
    )
}