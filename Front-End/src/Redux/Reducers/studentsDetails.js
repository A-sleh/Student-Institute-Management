import { 
    STUDENT_SEARCH_FIELD,
    STUDENT_DATA,
    STUDENT_DATA_ORIGIN,
    STUDENT_FILTER_CLASS,
    STUDENT_CURRENT_PAGE,
    STUDENT_TOTAL_PAGES,
    STUDENT_ROWS_NUMBER,
    ALL_STUDENTS
} from "../actions/type";

const studentsDetails = ( state = { 
    students: [] ,
    currentPage: 1 , 
    totalPage: 0,
    searchField: '',
    dataOrigin: ALL_STUDENTS,
    selectedClass: 'all',
    rowsNuber: 10
} , action) => {

    switch(action.type) {
        case STUDENT_FILTER_CLASS :
            return { ...state, selectedClass : action.payload }
        case STUDENT_SEARCH_FIELD :
            return { ...state, searchField : action.payload }
        case STUDENT_CURRENT_PAGE :
            return { ...state, currentPage : action.payload }
        case STUDENT_DATA :
            return { ...state, students : action.payload }
        case STUDENT_DATA_ORIGIN :
            return { ...state, dataOrigin : action.payload }
        case STUDENT_TOTAL_PAGES :
            return { ...state, totalPage : action.payload }
        case STUDENT_ROWS_NUMBER :
            return { ...state, rowsNuber : action.payload }
        default : 
            return state ;
    }
}

export default studentsDetails