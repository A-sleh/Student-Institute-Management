import { FULLSCREEN , UNFULLSCREEN} from "../actions/type";

const fullScreenReducer = ( state = {isFull : true } , action ) => {
    switch(action.type) {
        case FULLSCREEN :
            return {isFull: action.payload }
        case UNFULLSCREEN :
            return {isFull: action.payload }
        default : 
            return state ;
    }
}

export default fullScreenReducer