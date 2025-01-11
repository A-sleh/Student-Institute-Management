import API from "./API.js";

export default {
  StudentsAbsence: (studentsIds,date) => {
    return API.Absence.post(studentsIds,date)
  },
  StudentsInformaion: (id,gradId,limit,page) => {
    return API.Student.get(id,gradId,limit,page);
  },
  StudentsInCurrentClass: (classId) => {
    return API.Student.getAllInCurrentClass(classId);
  },
  AllStudentsInfo: () => {
    return API.Student.getAll();
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
  TeacherInformaion : (id,limit,page) => {
    return API.Teacher.get(id,limit,page)
  },
  AllTeacherInformaion : () => {
    return API.Teacher.getAll()
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
  ShowCurrentClassTests : (classId,linkedTest,correctionTest) => {
    return API.Test.get.AllTestInTheClasss(classId,linkedTest,correctionTest)
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
  ShowAllReportsFilteredByGrade : (gradeId) => {
    return API.Report.get.spesifyReports(gradeId)
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
  GetAllStduentTestsMarkInCurrentReport : (reportId,classId) => {
    return API.Report.get.AllStudentsMarkInCurrentReport(reportId,classId)
  },
  ShowAllReportsAvgInCurretnClass : (classId) => {
    return API.Report.get.AllReportsAvgInCurrentClass(classId)
  },
  ShowStudentTestInCurrentReport : (studentId,reportId) => {
    return API.Test.get.StudentTestInCurrentReport(studentId,reportId)
  },
  ShowStudentTestNotAddedToReport : (studentId) => {
    return API.Test.get.StudentTestNotAddedToReport(studentId)
  },
  ShowStudentReports : (studentId) => {
    return API.Report.get.StudentReports(studentId)
  },
  ShowGradeCountByType : () => {
    return API.Statistics.get.countByType()
  },
  ShowTeachersRateInCurrentSubject: (subjectId) => {
    return API.Statistics.get.TeacherRateBySubject(subjectId)
  },
  ShowAllInstituteGrade : () => {
    return API.Grade.get()
  },
  ShowStudentReportsAvg : (studentId) => {
    return API.Report.get.StudnetReportsAvg(studentId)
  },
  ShowTheTopOneInEachClassInCurrentReport: (reportId) => {
    return API.Report.get.TopOneStudents(reportId)
  },
  ShowIncomeBalanceInCurrentRange: (startDate,endDate) => {
    return API.Bill.get.inComeBalanceInRange(startDate,endDate)
  },
  ShowoutcomeBalanceInCurrentRange: (startDate,endDate) => {
    return API.Bill.get.outComeBalanceInRange(startDate,endDate)
  },
  ShowTheAvgForEachClasseInCurrentReport: (reportId) => {
    return API.Report.get.TopOneClasses(reportId)
  },
  CreateNewGrade : (data) => {
    return API.Grade.post(data)
  },
  DeleteGrade : (gradeId) => {
    return API.Grade.delete(gradeId)
  },
  UpdateGrade : (data) => {
    return API.Grade.put(data)
  },
  ShowFirstBill : () => {
    return API.Bill.get.showBill('ASC')
  },
  ShowLastBill : () => {
    return API.Bill.get.showBill('DESC')
  },


};



