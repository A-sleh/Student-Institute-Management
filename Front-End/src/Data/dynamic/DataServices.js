import API from "./API.js";

export default {
  StudentsInformaion: (id) => {
    return API.Student.get(id);
  },
  AddNewStudent: (data) => {
    return API.Student.post(data);
  },
  UpdateStudent: (data) => {
    return API.Student.put(data)
  },
  DeleteSutent: (id) => {
    return API.Student.delete(id);
  },
  showCalsses: (id) => {
    return API.Class.get(id);
  },
  CreateNewClass: (data) => {
    return API.Class.post(data);
  },
  DeleteClass: (id) => {
    return API.Class.delete(id);
  },
  UpdateClass: (data) => {
    return API.Class.put(data);
  },
  DeleteSubject: (id) => {
    return API.Subject.delete(id);
  },
  ShowAllSubject: () => {
    return API.Subject.get();
  },
  UpdateSubject: (data) => {
    return API.Subject.put(data);
  },
  CreateSubject: (data) => {
    return API.Subject.post(data);
  },
  AddNewTeacher : (data) => {
    return API.Teacher.post(data)
  },
  TeacherInformaion : (id) => {
    return API.Teacher.get(id)
  },
  DeleteTeacher : (id) => {
    return API.Teacher.delete(id)
  },
  UpdateTeacherInfo : (data) => {
    return API.Teacher.put(data)
  },
  ShowAllTeacherSubjects : (id) => {
    return API.TeacherSubject.get(id);
  },
  ShowTeacherClass : (id) => {
    return API.TeacherClass.get(id)
  },
  AddNewSubjectsForTeacher : (teacherId,data) => {
    return API.TeacherSubject.post(teacherId,data)
  },
  UpdataSubjectSalary : (teacherId,subjectId ,salary) => {
    return API.TeacherSubject.put(teacherId,subjectId ,salary)
  },
  DeleteTeacherSubject : (teacherSubjectId) => {
    return API.TeacherSubject.delete(teacherSubjectId)
  },
  DeleteTeacherFromClass : (teacherSubjectId,classId) => {
    return API.TeacherClass.delete(teacherSubjectId,classId)
  },
  ShowAllCurrentSubjectsInTheClass: (classId) => {
    return API.ClassSubject.get(classId)
  },
  AddTeacherToClass : (teacherSubject,classId) => {
    return API.TeacherClass.post(teacherSubject,classId)
  }
};
