
import API from "./API.js";

export default {
    StudentsInformaion : (id) => {
        return API.Student.get(id) ;
    },
    AddNewStudent : (data) => {
        return API.Student.post(data) ;
    },
    UpdateStudent: (data) => {
        return API.Student.put(data) ;
    },
    DeleteSutent: (id) => {
        return API.Student.delete(id) ;
    },
    showAllCalsses : () => {
        return API.Class.get();
    },
    CreateNewClass : (data) => {
        return API.Class.post(data);
    }
}