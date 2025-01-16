import { ARABIC , ENGLISH } from "../actions/type";

const changeLanguageReducer = ( state = {currentLange : 'english' } , action ) => {

    const storedState = JSON.parse(sessionStorage.getItem('lan'))
    if(storedState != undefined ) {
        state = storedState
    }

    switch(action.type) {
        case ARABIC :
            sessionStorage.setItem('lan',JSON.stringify({currentLange:action.payload}))
            return {currentLange: action.payload }
        case ENGLISH :
            sessionStorage.setItem('lan',JSON.stringify({currentLange:action.payload}))
            return {currentLange: action.payload }
        default : 
            return state ;
    }
}

export default changeLanguageReducer