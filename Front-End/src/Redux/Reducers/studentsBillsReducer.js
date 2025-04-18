import { ALL_STUDENTS_BILLS, M_BILL_CURRENT_PAGE, M_BILL_TOTAL_PAGES, M_DATA_ORIGIN, M_FILTER_STUDENTS_BY_CLASS, M_SEARCH_FILED, M_STUDENT_BILLS_BALANCE } from "../actions/type";

const studentsBillsReducer = ( state = { 
    filterField : 'All' , 
    studentsBills: [] ,
    currentPage: 1 , 
    totalPage: 0,
    searchField: '',
    dataOrigin: ALL_STUDENTS_BILLS
} , action) => {

    switch(action.type) {
        case M_FILTER_STUDENTS_BY_CLASS :
            return { ...state, filterField : action.payload }
        case M_SEARCH_FILED :
            return { ...state, searchField : action.payload }
        case M_BILL_CURRENT_PAGE :
            return { ...state, currentPage : action.payload }
        case M_STUDENT_BILLS_BALANCE :
            return { ...state, studentsBills : action.payload }
        case M_DATA_ORIGIN :
            return { ...state, dataOrigin : action.payload }
        case M_BILL_TOTAL_PAGES :
            return { ...state, totalPage : action.payload }
        default : 
            return state ;
    }
}

export default studentsBillsReducer