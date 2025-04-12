
import { createStore , combineReducers} from 'redux'
import testReducer from './Reducers/testReducer'
import changeLanguageReducer from './Reducers/changeLanguageReducer';
import fullScreenReducer from './Reducers/fullScreenReducer';
import adminReducer from './Reducers/adminReducer';
import changeGrade from './Reducers/changeGrade';
import manageTeacherPageReducer from './Reducers/manageTeacherPageReducer';
import classReducer from './Reducers/classReducer';


const store = createStore(combineReducers({
    grade:changeGrade,admin:adminReducer ,
    studentNumber:testReducer,
    language:changeLanguageReducer,
    fullScreen:fullScreenReducer,
    pageCounter: manageTeacherPageReducer,
    classRd: classReducer
})) ;

export default store
