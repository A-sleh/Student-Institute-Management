import { ALL_STUDENTS_BILLS, S_BILL_CURRENT_PAGE, S_BILL_TOTAL_PAGES, S_DATA_ORIGIN, S_FILTER_STUDENTS_BY_CLASS, S_SEARCH_FILED, S_STUDENT_BILLS_BALANCE } from "../actions/type";

const showStudentsBillsReducer = ( state = { 
    filterField : 'All' , 
    studentsBills: [] ,
    currentPage: 1 , 
    totalPage: 0,
    searchField: '',
    dataOrigin: ALL_STUDENTS_BILLS
} , action) => {

    switch(action.type) {
        case S_FILTER_STUDENTS_BY_CLASS :
            return { ...state, filterField : action.payload }
        case S_SEARCH_FILED :
            return { ...state, searchField : action.payload }
        case S_BILL_CURRENT_PAGE :
            return { ...state, currentPage : action.payload }
        case S_STUDENT_BILLS_BALANCE :
            return { ...state, studentsBills : action.payload }
        case S_DATA_ORIGIN :
            return { ...state, dataOrigin : action.payload }
        case S_BILL_TOTAL_PAGES :
            return { ...state, totalPage : action.payload }
        default : 
            return state ;
    }
}

export default showStudentsBillsReducer