import { ARABIC , ENGLISH } from "../actions/type";

const changeLanguageReducer = ( state = {currentLange : 'english' } , action ) => {
    switch(action.type) {
        case ARABIC :
            return {currentLange: action.payload }
        case ENGLISH :
            return {currentLange: action.payload }
        default : 
            return state ;
    }
}

export default changeLanguageReducer