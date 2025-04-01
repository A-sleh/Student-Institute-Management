import { CHANGE_CURRENT_PAGE, TEACHER_SECTION, TEACHERS, TOTAL_PAGES ,TEACHER_SOURCE, ALL_TEACHER, SEARCH_INPUT_TEACHER} from "../actions/type";

const manageTeacherPageReducer = ( state = { 
    currentPage : 1 ,
    teachers : [] ,
    totalPages: 0,
    offSetTeacher: 0,
    dataFrom: ALL_TEACHER,
    searchInput : ''
} , action ) => {

    switch(action.type) {
        case CHANGE_CURRENT_PAGE:
            return {...state,currentPage: action.payload }
        case TOTAL_PAGES:
            return {...state,totalPages: action.payload }
        case TEACHERS:
            return {...state,teachers: action.payload }
        case TEACHER_SECTION : 
            return {...state,offSetTeacher: action.payload }
        case TEACHER_SOURCE : 
            return {...state,dataFrom: action.payload }
        case SEARCH_INPUT_TEACHER : 
            return {...state,searchInput: action.payload }
        default : 
            return state ;
    }
}

export default manageTeacherPageReducer