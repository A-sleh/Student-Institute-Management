import { ALL_EXTERNAL_BILLS, M_ALL_EXTERNAL_RADIO_BUTTONS, M_ALL_EXTERNAL_SEARCH_BUTTON, M_EXTERNAL_BILLS_CURRENT_PAGE_IN, M_EXTERNAL_BILLS_CURRENT_PAGE_OUT, M_EXTERNAL_BILLS_INCOME, M_EXTERNAL_BILLS_INCOME_ORIGIN, M_EXTERNAL_BILLS_OUTCOME, M_EXTERNAL_BILLS_OUTCOME_ORIGIN, M_EXTERNAL_BILLS_SEARCH_FIELD, M_EXTERNAL_BILLS_TOTAL_PAGES_IN, M_EXTERNAL_BILLS_TOTAL_PAGES_OUT } from "../actions/type"


const manageExternalBillsReducer = ( state = { 
    incomeCurrentPage : 1 ,
    outcomeCurrentPage : 1 ,
    incomeBills : [] ,
    outcomeBills : [] ,
    incomeTotalPages: 1,
    outcomeTotalPages: 1,
    outComeDataOrigin: ALL_EXTERNAL_BILLS,
    inComeDataOrigin: ALL_EXTERNAL_BILLS,
    searchField : '',
    openSearch: false ,
    radio: {
        billNo: true , 
        date: false ,
        note : false
    }
} , action ) => {

    switch(action.type) {
        case M_EXTERNAL_BILLS_CURRENT_PAGE_IN:
            return {...state,incomeCurrentPage: action.payload }
        case M_EXTERNAL_BILLS_CURRENT_PAGE_OUT:
            return {...state,outcomeCurrentPage: action.payload }
        case M_EXTERNAL_BILLS_INCOME : 
            return {...state,incomeBills: action.payload }
        case M_EXTERNAL_BILLS_OUTCOME : 
            return {...state,outcomeBills: action.payload }
        case M_EXTERNAL_BILLS_TOTAL_PAGES_IN : 
            return {...state,incomeTotalPages: action.payload }
        case M_EXTERNAL_BILLS_TOTAL_PAGES_OUT : 
            return {...state,outcomeTotalPages: action.payload }
        case M_EXTERNAL_BILLS_INCOME_ORIGIN : 
            return {...state,inComeDataOrigin: action.payload }
        case M_EXTERNAL_BILLS_OUTCOME_ORIGIN : 
            return {...state,outComeDataOrigin: action.payload }
        case M_EXTERNAL_BILLS_SEARCH_FIELD : 
            return {...state,searchField: action.payload }
        case M_ALL_EXTERNAL_RADIO_BUTTONS: 
            return {...state,radio: action.payload }
        case M_ALL_EXTERNAL_SEARCH_BUTTON: 
            return {...state,openSearch: action.payload }
        default : 
            return state ;
    }
}

export default manageExternalBillsReducer