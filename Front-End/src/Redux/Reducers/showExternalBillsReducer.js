import { ALL_EXTERNAL_BILLS, ALL_EXTERNAL_RADIO_BUTTONS, ALL_EXTERNAL_SEARCH_BUTTON, EXTERNAL_BILLS_CURRENT_PAGE_IN, EXTERNAL_BILLS_CURRENT_PAGE_OUT, EXTERNAL_BILLS_INCOME, EXTERNAL_BILLS_INCOME_ORIGIN, EXTERNAL_BILLS_OUTCOME, EXTERNAL_BILLS_OUTCOME_ORIGIN, EXTERNAL_BILLS_SEARCH_FIELD, EXTERNAL_BILLS_TOTAL_PAGES_IN, EXTERNAL_BILLS_TOTAL_PAGES_OUT } from "../actions/type"


const showExternalBillsReducer = ( state = { 
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
        case EXTERNAL_BILLS_CURRENT_PAGE_IN:
            return {...state,incomeCurrentPage: action.payload }
        case EXTERNAL_BILLS_CURRENT_PAGE_OUT:
            return {...state,outcomeCurrentPage: action.payload }
        case EXTERNAL_BILLS_INCOME : 
            return {...state,incomeBills: action.payload }
        case EXTERNAL_BILLS_OUTCOME : 
            return {...state,outcomeBills: action.payload }
        case EXTERNAL_BILLS_TOTAL_PAGES_IN : 
            return {...state,incomeTotalPages: action.payload }
        case EXTERNAL_BILLS_TOTAL_PAGES_OUT : 
            return {...state,outcomeTotalPages: action.payload }
        case EXTERNAL_BILLS_INCOME_ORIGIN : 
            return {...state,inComeDataOrigin: action.payload }
        case EXTERNAL_BILLS_OUTCOME_ORIGIN : 
            return {...state,outComeDataOrigin: action.payload }
        case EXTERNAL_BILLS_SEARCH_FIELD : 
            return {...state,searchField: action.payload }
        case ALL_EXTERNAL_RADIO_BUTTONS: 
            return {...state,radio: action.payload }
        case ALL_EXTERNAL_SEARCH_BUTTON: 
            return {...state,openSearch: action.payload }
        default : 
            return state ;
    }
}

export default showExternalBillsReducer