import { DECREMENT, INCREAMENT } from "../actions/type";

const testReducer = ( state = {count : 0 } , action) => {
    switch(action.type) {
        case INCREAMENT :
            return { ...state , count: state.count + 1 } ;
        case DECREMENT : 
            return { ... state , count : state.count - 1 } ; 
        default : 
            return state ;
    }
}

export default testReducer