import { FULLSCREEN , UNFULLSCREEN} from "../actions/type";

const fullScreenReducer = ( state = {isFull : true } , action ) => {

    const storedState = JSON.parse(sessionStorage.getItem('fullScreen'))
    if(storedState != undefined ) {
        state = storedState
    }
    switch(action.type) {
        case FULLSCREEN :
            sessionStorage.setItem('fullScreen',JSON.stringify({isFull: action.payload }))
            return {isFull: action.payload }
        case UNFULLSCREEN :
            sessionStorage.setItem('fullScreen',JSON.stringify({isFull: action.payload }))
            return {isFull: action.payload }
        default : 
            return state ;
    }
}

export default fullScreenReducer