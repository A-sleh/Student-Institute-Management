
import API from "./API.js";

export default {
    StudentsInformaion : () => {
        return API.Student.get() ;
    },
    AddNewStudent : (data) => {
        return API.Student.post(data) ;
    },
    showAllCalsses : () => {
        return API.Class.get();
    }
}