import { CHANGE_GRADE} from "../actions/type";

const changeGrade = ( state = {grade: null} , action ) => {

    
    const storedState = JSON.parse( decodeURIComponent(localStorage.getItem('grade')))
    if(storedState != undefined ) {
        state = storedState
    }

    switch(action.type) {
        case CHANGE_GRADE:
            sessionStorage.setItem('grade',JSON.stringify(action.payload))
            return {grade: action.payload}
        default : 
            return state ;
    }
}

export default changeGrade