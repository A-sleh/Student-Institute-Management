import { FILTER_STUDENTS_BY_CLASS } from "../actions/type";

const studentsBillsReducer = ( state = { filterField : 'All' } , action) => {
    switch(action.type) {
        case FILTER_STUDENTS_BY_CLASS :
            return { filterField : action.payload }
        default : 
            return state ;
    }
}

export default studentsBillsReducer