
import { createStore , combineReducers} from 'redux'
import testReducer from './Reducers/testReducer'
import changeLanguageReducer from './Reducers/changeLanguageReducer';
import fullScreenReducer from './Reducers/fullScreenReducer';
import adminReducer from './Reducers/adminReducer';
import changeGrade from './Reducers/changeGrade';
import manageTeacherPageReducer from './Reducers/manageTeacherPageReducer';
import classReducer from './Reducers/classReducer';
import teacherDetailsReducer from './Reducers/teacherDetailsReducer';
import studentsBillsReducer from './Reducers/studentsBillsReducer';
import showStudentsBillsReducer from './Reducers/showStudentsBillsReducer';
import manageTeacherBillsReducer from './Reducers/ManageTeacherBillsReducer';
import showTeacherBillsReducer from './Reducers/showTeacherBillsReducer';


const store = createStore(combineReducers({
    grade:changeGrade,admin:adminReducer ,
    studentNumber:testReducer,
    language:changeLanguageReducer,
    fullScreen:fullScreenReducer,
    pageCounter: manageTeacherPageReducer,
    classRd: classReducer,
    teacherDetailsPage: teacherDetailsReducer,
    studentsBill: studentsBillsReducer,
    showStudentBills: showStudentsBillsReducer,
    manageTeacherBills: manageTeacherBillsReducer,
    showTeacherBills: showTeacherBillsReducer
})) ;

export default store
