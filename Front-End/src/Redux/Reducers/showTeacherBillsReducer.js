import { ALL_TEACHER, S_TEACHER_BILLS, S_TEACHER_BILLS_CURRENT_PAGE, S_TEACHER_BILLS_DATA_ORIGIN, S_TEACHER_BILLS_SEARCH_FIELD, S_TEACHER_BILLS_TOTAL_PAGE } from "../actions/type"

const showTeacherBillsReducer = ( state = { 
    currentPage : 1 ,
    teachersBills : [] ,
    totalPage: 1,
    dataOrigin: ALL_TEACHER,
    searchField : ''
} , action ) => {

    switch(action.type) {
        case S_TEACHER_BILLS:
            return {...state,teachersBills: action.payload }
        case S_TEACHER_BILLS_CURRENT_PAGE:
            return {...state,currentPage: action.payload }
        case S_TEACHER_BILLS_TOTAL_PAGE : 
            return {...state,totalPage: action.payload }
        case S_TEACHER_BILLS_SEARCH_FIELD : 
            return {...state,searchField: action.payload }
        case S_TEACHER_BILLS_DATA_ORIGIN : 
            return {...state,dataOrigin: action.payload }
        default : 
            return state ;
    }
}

export default showTeacherBillsReducer