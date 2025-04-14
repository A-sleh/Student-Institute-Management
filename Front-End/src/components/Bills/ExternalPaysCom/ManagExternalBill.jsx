/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { CloseButtonStyle, SearchButtonStyle } from "../style/styleComponents";
import { useState } from "react"  
import Notification from "../../Global/Notification";
import BillsContainer from "./BillsContainer";
import { FillterBillsHeader } from "../../shared/FillterBillsHeader";
import { useDispatch, useSelector } from "react-redux";
import { ALL_EXTERNAL_BILLS, M_ALL_EXTERNAL_RADIO_BUTTONS, EXTERNAL_SEARCHING_BILLS, M_EXTERNAL_BILLS_CURRENT_PAGE_IN, M_EXTERNAL_BILLS_CURRENT_PAGE_OUT, M_EXTERNAL_BILLS_INCOME, M_EXTERNAL_BILLS_OUTCOME, M_EXTERNAL_BILLS_SEARCH_FIELD, M_EXTERNAL_BILLS_TOTAL_PAGES_IN, M_EXTERNAL_BILLS_TOTAL_PAGES_OUT, M_ALL_EXTERNAL_SEARCH_BUTTON, M_EXTERNAL_BILLS_INCOME_ORIGIN, M_EXTERNAL_BILLS_OUTCOME_ORIGIN } from "../../../Redux/actions/type";
import { ManageExternalBillsTEXT } from "../../../Data/static/Bills/ExternalPaysCom/ManageExternalBillsTEXT";
import useOutComeBills from "../../../hooks/bill_hooks/useOutComeBills";
import useInComeBills from "../../../hooks/bill_hooks/useInComeBills";
import useSearchOutcomBills from "../../../hooks/bill_hooks/useSearchOutcomBills";
import useSearchIncomBills from "../../../hooks/bill_hooks/useSearchIncomBills";
import useSyncDataLogin from "../../../hooks/shared/useSyncDataLogin";
import useSyncSearchingData from "../../../hooks/shared/useSyncSearchingData";

export default function ManagExternalBill() {

    const limitNumber = 6
    const {currentLange} = useSelector( state => state.language)
    const { incomeCurrentPage , outcomeCurrentPage , incomeBills , outcomeBills ,
        incomeTotalPages, outcomeTotalPages, inComeDataOrigin,outComeDataOrigin, searchField , radio , openSearch 
    } = useSelector( state => state.manageExternalBills)

    const {searchTitle ,closeBtn ,incomeTitle ,outComeTitle ,successDeleteBillMES ,seaerchBtn } = ManageExternalBillsTEXT[currentLange]
    const [successDelete,setSuccessDelete] = useState(false);
    const dispatch = useDispatch()

    const {data : inComeAllBills = []  , total : inComeTotalPages } = useInComeBills(limitNumber , incomeCurrentPage ,successDelete)
    const {data : outComeAllBills = [] , total : outComeTotalPages } = useOutComeBills(limitNumber , outcomeCurrentPage ,successDelete)
    const [sendRequest,setSendRequest] = useState(false)
    const searchingIncomeBills = useSearchIncomBills(getSearchQuery(),sendRequest,searchField)
    const searchingOutcomeBills = useSearchOutcomBills(getSearchQuery(),sendRequest,searchField)

    function getSearchQuery() {
        if(radio.billNo) return `&billNo=${searchField}`
        if(radio.note) return `&note=${searchField}`
        if(radio.date )  return `&date=${searchField}`
        return ''
    }

    function changeIncomState(bills,totalPages,dataOringin) {
        dispatch({
            payload: bills ,
            type: M_EXTERNAL_BILLS_INCOME
        })
        dispatch({
            payload: totalPages,
            type: M_EXTERNAL_BILLS_TOTAL_PAGES_IN
        })
        dispatch({
            payload: dataOringin ,
            type: M_EXTERNAL_BILLS_INCOME_ORIGIN
        })
    }

    function changeOutcomState(bills,totalPages,dataOringin) {
        dispatch({
            payload: bills ,
            type: M_EXTERNAL_BILLS_OUTCOME
        })
        dispatch({
            payload: totalPages,
            type: M_EXTERNAL_BILLS_TOTAL_PAGES_OUT
        })
        dispatch({
            payload: dataOringin ,
            type: M_EXTERNAL_BILLS_OUTCOME_ORIGIN
        })
    }
    
    useSyncDataLogin(inComeAllBills,incomeBills,inComeTotalPages,incomeCurrentPage,setIncomePage,changeIncomState,{
        dataOrigin:inComeDataOrigin,oringinAction:ALL_EXTERNAL_BILLS
    })

    useSyncDataLogin(outComeAllBills,outcomeBills,outComeTotalPages,outcomeCurrentPage,setOutcomePage,changeOutcomState,{
        dataOrigin: outComeDataOrigin,oringinAction:ALL_EXTERNAL_BILLS
    })
    
    useSyncSearchingData(outComeAllBills,searchingOutcomeBills,outcomeBills,outComeTotalPages,searchField,setOutcomePage,changeOutcomState,{
        dataOrigin: outComeDataOrigin , originAll: ALL_EXTERNAL_BILLS , oringinSearch: EXTERNAL_SEARCHING_BILLS
    })

    useSyncSearchingData(inComeAllBills,searchingIncomeBills,incomeBills,inComeTotalPages,searchField,setIncomePage,changeIncomState,{
        dataOrigin: inComeDataOrigin , originAll: ALL_EXTERNAL_BILLS , oringinSearch: EXTERNAL_SEARCHING_BILLS
    })



    // SEATER FUNCTIONS

    function setIncomePage(value) {
        dispatch({
            payload: value ,
            type: M_EXTERNAL_BILLS_CURRENT_PAGE_IN
        })
    }

    function setOutcomePage(value) {
        dispatch({
            payload: value ,
            type: M_EXTERNAL_BILLS_CURRENT_PAGE_OUT
        })
    }

    function setRadioState(value) {
        dispatch({
            payload: value ,
            type: M_ALL_EXTERNAL_RADIO_BUTTONS
        })
    }

    function setOpenSearch(value) {
        dispatch({
            type: M_ALL_EXTERNAL_SEARCH_BUTTON ,
            payload: value
        })
    }

    function setSearchField(value) {
        dispatch({
            type: M_EXTERNAL_BILLS_SEARCH_FIELD ,
            payload: value
        })
    }

    function handleSearchClicked() {
        setSendRequest(true) 
        setTimeout(() => {
            setSendRequest(false) 
        },200)
    }

    return (
        <>
            <Notification  title={successDeleteBillMES} type={'success'} state ={successDelete} setState={setSuccessDelete}/>
            {
                !openSearch ? <SearchButtonStyle onClick={()=>setOpenSearch(true)} >{searchTitle} </SearchButtonStyle> : 
                <FillterBillsHeader  radioState={radio} setRadioState={setRadioState} searchFiled={searchField} setSearchFiled={setSearchField}>
                    <div style={{display: 'flex' , gap: '5px'}}>
                        <SearchButtonStyle onClick={()=>{handleSearchClicked(false)}}> {seaerchBtn} </SearchButtonStyle>
                        <CloseButtonStyle onClick={()=>{setOpenSearch(false);setSearchField('')}}> {closeBtn} </CloseButtonStyle>
                    </div>
                </FillterBillsHeader>
            }
            <BillsContainer bill={{data:incomeBills,page:incomeCurrentPage,total:incomeTotalPages}} setPage={setIncomePage} title={incomeTitle}  cardType={'manage'} setSuccessDelete={setSuccessDelete} />
            <BillsContainer bill={{data:outcomeBills,page:outcomeCurrentPage,total:outcomeTotalPages}} setPage={setOutcomePage} title={outComeTitle}  cardType={'manage'} setSuccessDelete={setSuccessDelete} />
        </>
    )
}