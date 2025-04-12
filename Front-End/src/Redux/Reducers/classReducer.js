import { SEARCH_INPUT_CLASS , CHANGE_CLASS_PAGE, CLASS_SECTION } from "../actions/type";

const classReducer = ( state = {searchField : '' , page: '' , lastClassClicked : '' } , action ) => {
    switch(action.type) {
        case SEARCH_INPUT_CLASS :
            return {...state ,searchField: action.payload }
        case CHANGE_CLASS_PAGE :
            return {...state , page: action.payload }
        case CLASS_SECTION :
            return {...state , lastClassClicked : action.payload }
        default : 
            return state ;
    }
}

export default classReducer