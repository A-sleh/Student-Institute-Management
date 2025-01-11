import { ADMINLOGUNG, ADMINLOGUNGOUT} from "../actions/type";

const adminReducer = ( state = {isAdmin : false , adminName: '' } , action ) => {

    
    const storedState = JSON.parse(sessionStorage.getItem('admin'))
    if(storedState != undefined ) {
        state = storedState
    }

    switch(action.type) {
        case ADMINLOGUNG :
            sessionStorage.setItem('admin',JSON.stringify({isAdmin: action.payload.isAdmin ,adminName : action.payload.adminName }))
            return {isAdmin: action.payload.isAdmin ,adminName : action.payload.adminName }
        case ADMINLOGUNGOUT :
            sessionStorage.removeItem('admin')
            return {isAdmin: action.payload , adminName: ''}
        default : 
            return state ;
    }
}

export default adminReducer