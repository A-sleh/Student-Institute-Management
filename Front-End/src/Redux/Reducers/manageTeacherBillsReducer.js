import { ALL_TEACHER, TEACHER_BILLS, TEACHER_BILLS_CURRENT_PAGE, TEACHER_BILLS_DATA_ORIGIN, TEACHER_BILLS_SEARCH_FIELD, TEACHER_BILLS_TOTAL_PAGE } from "../actions/type"

const manageTeacherBillsReducer = ( state = { 
    currentPage : 1 ,
    teachersBills : [] ,
    totalPage: 1,
    dataOrigin: ALL_TEACHER,
    searchField : ''
} , action ) => {

    switch(action.type) {
        case TEACHER_BILLS:
            return {...state,teachersBills: action.payload }
        case TEACHER_BILLS_CURRENT_PAGE:
            return {...state,currentPage: action.payload }
        case TEACHER_BILLS_TOTAL_PAGE : 
            return {...state,totalPage: action.payload }
            case TEACHER_BILLS_SEARCH_FIELD : 
            return {...state,searchField: action.payload }
        case TEACHER_BILLS_DATA_ORIGIN : 
            return {...state,dataOrigin: action.payload }
        default : 
            return state ;
    }
}

export default manageTeacherBillsReducer