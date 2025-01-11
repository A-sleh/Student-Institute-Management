
import { createStore , combineReducers} from 'redux'
import testReducer from './Reducers/testReducer'
import changeLanguageReducer from './Reducers/changeLanguageReducer';
import fullScreenReducer from './Reducers/fullScreenReducer';
import adminReducer from './Reducers/adminReducer';


const store = createStore(combineReducers({admin:adminReducer ,studentNumber:testReducer,language:changeLanguageReducer,fullScreen:fullScreenReducer})) ;

export default store
