
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
    },
    DeleteClass: (id) => {
        return API.Class.delete(id);
    },
    UpdateClass : (data) => {
        return API.Class.put(data) ;
    },
    DeleteSubject: (id) => {
        API.Subject.delete(id); 
        
    },
    ShowAllSubject: () => {
        return API.Subject.get();
    },
    UpdateSubject: (data) => {
        return API.Subject.put(data);
    }

}