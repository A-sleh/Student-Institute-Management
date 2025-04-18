
/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { CloseButtonStyle, SearchButtonStyle } from "../style/styleComponents";
import { FillterBillsHeader } from "../../shared/FillterBillsHeader";
import { useEffect, useState } from "react"
import Notification from "../../Global/Notification";
import BillsContainer from "./BillsContainer";
import { useDispatch, useSelector } from "react-redux";
import { ManageExternalBillsTEXT } from "../../../Data/static/Bills/ExternalPaysCom/ManageExternalBillsTEXT";
import useOutComeBills from "../../../hooks/bill_hooks/useOutComeBills";
import useInComeBills from "../../../hooks/bill_hooks/useInComeBills";
import { ALL_EXTERNAL_BILLS, ALL_EXTERNAL_RADIO_BUTTONS, EXTERNAL_SEARCHING_BILLS, EXTERNAL_BILLS_CURRENT_PAGE_IN, EXTERNAL_BILLS_CURRENT_PAGE_OUT, EXTERNAL_BILLS_INCOME, EXTERNAL_BILLS_OUTCOME, EXTERNAL_BILLS_SEARCH_FIELD, EXTERNAL_BILLS_TOTAL_PAGES_IN, EXTERNAL_BILLS_TOTAL_PAGES_OUT, ALL_EXTERNAL_SEARCH_BUTTON, EXTERNAL_BILLS_INCOME_ORIGIN, EXTERNAL_BILLS_OUTCOME_ORIGIN } from "../../../Redux/actions/type";
import useSyncDataLogin from "../../../hooks/shared/useSyncDataLogin";
import useSearchOutcomBills from "../../../hooks/bill_hooks/useSearchOutcomBills";
import useSearchIncomBills from "../../../hooks/bill_hooks/useSearchIncomBills";
import useSyncSearchingData from "../../../hooks/shared/useSyncSearchingData";

export default function ShowBillExternalDetails() {
    
    const limitNumber = 6
    const {currentLange} = useSelector( state => state.language)
    const { incomeCurrentPage , outcomeCurrentPage , incomeBills , outcomeBills ,
        incomeTotalPages, outcomeTotalPages, inComeDataOrigin,outComeDataOrigin, searchField , radio , openSearch 
    } = useSelector( state => state.showExternalBills)

    const {searchTitle ,closeBtn ,incomeTitle ,outComeTitle ,successDeleteBillMES ,seaerchBtn } = ManageExternalBillsTEXT[currentLange]
    const [successDelete,setSuccessDelete] = useState(false);
    const dispatch = useDispatch()

    const {data : inComeAllBills = []  , total : inComeTotalPages } = useInComeBills(limitNumber , incomeCurrentPage ,successDelete)
    const {data : outComeAllBills = [] , total : outComeTotalPages } = useOutComeBills(limitNumber , outcomeCurrentPage ,successDelete)
    const [sendRequest,setSendRequest] = useState(false)
    const searchingIncomeBills = useSearchIncomBills(getSearchQuery(),sendRequest,searchField)
    const searchingOutcomeBills = useSearchOutcomBills(getSearchQuery(),sendRequest,searchField)


    useEffect(() => {
        return () => {
            changeIncomState([],0,ALL_EXTERNAL_BILLS)
            changeOutcomState([],0,ALL_EXTERNAL_BILLS)
            setOutcomePage(1)
            setIncomePage(1)
        }
    },[successDelete])

    function getSearchQuery() {
        if(radio.billNo) return `&billNo=${searchField}`
        if(radio.note) return `&note=${searchField}`
        if(radio.date )  return `&date=${searchField}`
        return ''
    }

    function changeIncomState(bills,totalPages,dataOringin) {
        dispatch({
            payload: bills ,
            type: EXTERNAL_BILLS_INCOME
        })
        dispatch({
            payload: totalPages,
            type: EXTERNAL_BILLS_TOTAL_PAGES_IN
        })
        dispatch({
            payload: dataOringin ,
            type: EXTERNAL_BILLS_INCOME_ORIGIN
        })
    }

    function changeOutcomState(bills,totalPages,dataOringin) {
        dispatch({
            payload: bills ,
            type: EXTERNAL_BILLS_OUTCOME
        })
        dispatch({
            payload: totalPages,
            type: EXTERNAL_BILLS_TOTAL_PAGES_OUT
        })
        dispatch({
            payload: dataOringin ,
            type: EXTERNAL_BILLS_OUTCOME_ORIGIN
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
            type: EXTERNAL_BILLS_CURRENT_PAGE_IN
        })
    }

    function setOutcomePage(value) {
        dispatch({
            payload: value ,
            type: EXTERNAL_BILLS_CURRENT_PAGE_OUT
        })
    }

    function setRadioState(value) {
        dispatch({
            payload: value ,
            type: ALL_EXTERNAL_RADIO_BUTTONS
        })
    }

    function setOpenSearch(value) {
        dispatch({
            type: ALL_EXTERNAL_SEARCH_BUTTON ,
            payload: value
        })
    }

    function setSearchField(value) {
        dispatch({
            type: EXTERNAL_BILLS_SEARCH_FIELD ,
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
            <BillsContainer bill={{data:incomeBills,page:incomeCurrentPage,total:incomeTotalPages}} setPage={setIncomePage} title={incomeTitle}  cardType={'show'} setSuccessDelete={setSuccessDelete} />
            <BillsContainer bill={{data:outcomeBills,page:outcomeCurrentPage,total:outcomeTotalPages}} setPage={setOutcomePage} title={outComeTitle}  cardType={'show'} setSuccessDelete={setSuccessDelete} />
        </>
    )
}
