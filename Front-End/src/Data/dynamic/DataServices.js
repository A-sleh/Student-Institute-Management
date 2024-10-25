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
    return API.Class.get.All(id);
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
    return API.TeacherSubject.get.specifyTeacher(id);
  },
  ShowAllTeachersSubjects : (grade) => {
    return API.TeacherSubject.get.AllTeacher(grade);
  },
  ShowTeacherClass : (id) => {
    return API.TeacherClass.get(id)
  },
  ShowTeacherInSideClass : (classId) => {
    return API.Class.get.Teacher(classId)
  } ,
  AddNewSubjectsForTeacher : (data) => {
    console.log(data)
    return API.TeacherSubject.post(data)
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
  },
  ShowClassBillsDetails : (classId) => {
    return API.Bill.get.class(classId)
  },
  ShowStudentBillBalanc : (studentId) => {
    return API.Bill.get.student.Balance(studentId)
  },
  ShowTeacherBillBalanc : (teacher) => {
    return API.Bill.get.teacher.Balance(teacher)
  },
  ShowStudentBillsDetails: (studentId) => {
    return API.Bill.get.student.AllDetails(studentId)
  },
  ShowTeacherBillsDetails: (teacherId) => {
    return API.Bill.get.teacher.AllDetails(teacherId)
  },
  CreateNewStudnetBill : (data) => {
    return API.Bill.post(data)
  },
  CreateNewTeacherBill : (data) => {
    return API.Bill.post(data)
  },
  DeleteStudentBill : (billId) => {
    return API.Bill.delete(billId)
  },
  ShowInComeBills : () => {
    return API.Bill.get.inComeBill()
  },
  ShowOutComeBills : () => {
    return API.Bill.get.outComeBill()
  },
  ShowInComeBillsBalance : () => {
    return API.Bill.get.inComeBillBalance()
  },
  ShowOutComeBillsBalance : () => {
    return API.Bill.get.outComeBillBalance()
  },
  ShowLasteStudentsBill : (limit,type) => {
    return API.Bill.get.global(limit,type)
  },
  ShowLasteTeacherBill : (limit,type) => {
    return API.Bill.get.global(limit,type)
  },
  ShowLasteExternalBill : (limit,type) => {
    return API.Bill.get.global(limit,type)
  },
  ShowRemeainingIncome : () => {
    return API.Bill.get.restInComeBill()
  },
  ShowRemeainingOutcome : () => {
    return API.Bill.get.restOutComeBill()
  },
  CreateNewTest : (data) => {
    return API.Test.post.CreateNewTest(data)
  },
  ShowAllTests : (id) => {
    return API.Test.get.AllTest(id)
  },
  ShowStudentsMarksInOneClass : (classId,testId) => {
    return API.Test.get.StudentsMarks(classId,`${testId}`)
  },
  ShowClassesWhichDoTheTest : (testId) => {
    return API.Test.get.ClassesTests(testId)
  },
  ClassTestLink : (classId,testId) => {
    return API.Test.post.ClassTest(classId,testId)
  },
  ShowCurrentClassTests : (classId,flag) => {
    return API.Test.get.AllTestInTheClasss(classId,flag)
  },
  AssingeMarkToTheTest : (testMarkId,mark) => {
    return API.Test.put(testMarkId,mark)
  },
  CreateNewReport: (data) => {
    return API.Report.post(data)
  },
  ShowAllNativeReports : (id) => {
    return API.Report.get.AllReports(id)
  },
  LinkTestWithCurrentReport : (classId,data) => {
    return API.Report.put(classId,data)
  },
  ShowAllClassReports : (classId) => {
    return API.Report.get.AllClassReports(classId)
  },
  ShowQuizAvarageInCurrentClassReport : (reportId,classId) => {
    return API.Report.get.AvgCurrentClassReport(reportId,classId,'quiz')
  },
  ShowExamAvarageInCurrentClassReport : (reportId,classId) => {
    return API.Report.get.AvgCurrentClassReport(reportId,classId,'exam')
  },
  ShowAllStudentsForCurrentReport : (reportId,classId) => {
    return API.Report.get.AllStudent(reportId,classId)
  },
  ShowStudentTestInCurrentReport : (studentId,reportId) => {
    return API.Test.get.StudentTestInCurrentReport(studentId,reportId)
  }
};



