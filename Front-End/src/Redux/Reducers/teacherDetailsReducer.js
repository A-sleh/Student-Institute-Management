import { 
    ALL_TEACHER,CHANGE_CURRENT_PAGE_DETAILS, NUMBER_ROWS_DETAILS,
    SEARCHING_TEACHER_DETAILS, TEACHER_COUNT_DETAILS, TEACHER_SOURCE_DETAILS,
    TEACHERS_DETAILS, TOTAL_PAGES_DETAILS 
} from "../actions/type";

const teacherDetailsReducer = ( state = { 
    currentPage : 1 ,
    teachers : [] ,
    totalPages: 0,
    dataFrom: ALL_TEACHER,
    searchField : '' ,
    numberOfRows: 1 ,
    numberOfTeachers: 0
} , action ) => {

    switch(action.type) {
        case CHANGE_CURRENT_PAGE_DETAILS:
            return {...state,currentPage: action.payload }
        case TOTAL_PAGES_DETAILS:
            return {...state,totalPages: action.payload }
        case TEACHERS_DETAILS:
            return {...state, teachers: action.payload }
        case TEACHER_SOURCE_DETAILS : 
            return {...state, dataFrom: action.payload }
        case NUMBER_ROWS_DETAILS : 
            return {...state, numberOfRows: action.payload }
        case TEACHER_COUNT_DETAILS : 
            return {...state, numberOfTeachers: action.payload }
        case SEARCHING_TEACHER_DETAILS :
            return {...state, searchField: action.payload }
        default : 
            return state ;
    }
}

export default teacherDetailsReducer