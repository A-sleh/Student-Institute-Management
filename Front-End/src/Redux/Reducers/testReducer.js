import { INCREAMENTSTUDENTSNUMBER, UPDATESUTENDSNUMBER } from "../actions/type";

const testReducer = ( state = {studentNumber : 0 } , action) => {
    switch(action.type) {
        case UPDATESUTENDSNUMBER :
            return {studentNumber: action.payload }
        case INCREAMENTSTUDENTSNUMBER :
            return {studentNumber: state.studentNumber + action.payload }
        default : 
            return state ;
    }
}

export default testReducer