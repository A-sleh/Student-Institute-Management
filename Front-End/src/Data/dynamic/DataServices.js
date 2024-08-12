
import API from "./API.js";

export default {
    StudentsInformaion : () => {
        return API.Student.get.students() ;
    }
}