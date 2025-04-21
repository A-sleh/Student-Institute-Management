import { ADMINLOGUNG, ADMINLOGUNGOUT} from "../actions/type";

const adminReducer = ( state = {isAdmin : false , adminName: '' } , action ) => {

    switch(action.type) {
        case ADMINLOGUNG :
            return {isAdmin: action.payload.isAdmin ,adminName : action.payload.adminName }
        case ADMINLOGUNGOUT :
            return {isAdmin: action.payload , adminName: ''}
        default : 
            return state ;
    }
}

export default adminReducer