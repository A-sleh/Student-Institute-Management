import API from "./API.js";

export default {

  // student? datasercices
  StudentsInformaion: (id,queryParam,limit,page) => {
    return API.Student.get(id,queryParam,limit,page);
  },
  StudentsInCurrentClass: (classId) => {
    return API.Student.getAllInCurrentClass(classId);
  },
  SearchOnCurrentSutdentName: (searchKey) => {
    return API.Student.getStudentsByName(searchKey);
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
  StudentsAbsence: (studentsIds,date) => {
    return API.Absence.post(studentsIds,date)
  },
  showStudentsAbcenceInCurrentClass : (classId,abcenceDate) => {
    return API.Absence.get(classId,abcenceDate)
  },


  // class? dataservices
  showCalsses: (id) => {
    return API.Class.get.All(id);
  },
  ShowClassWithSpecificGrade : (gradId) => {
    return API.Class.get.SpecificGrade(gradId);
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
  ShowTeacherInSideClass : (classId) => {
    return API.Class.get.Teacher(classId)
  },
  ShowAllCurrentSubjectsInTheClass: (classId) => {
    return API.ClassSubject.get(classId)
  },

  // subject? dataServices
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

  // teacher? dataServices  
  AddNewTeacher : (data) => {
    return API.Teacher.post(data)
  },
  TeacherInformaion : (id,limit,page) => {
    return API.Teacher.get.get(id,limit,page)
  },
  AllTeacherInformaion : () => {
    return API.Teacher.get.getAll()
  },
  SearchOnCurrentTeacherName: (searchKey) => {
    return API.Teacher.get.SearchOnCurrentTeacherName(searchKey);
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
  AddTeacherToClass : (teacherSubject,classId) => {
    return API.TeacherClass.post(teacherSubject,classId)
  },

  // bill? dataServices
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
  SearchingIncomBills: (query) => {
    return API.Bill.get.searchExternalBills(`billType=in${query}`)
  },
  SearchingOutcomeBills: (query) => {
    return API.Bill.get.searchExternalBills(`billType=out${query}`)
  },
  ShowOutComeBillsBalance : () => {
    return API.Bill.get.outComeBillBalance()
  },
  ShowLasteStudentsBill : (type,limit,page) => {
    return API.Bill.get.global(type,limit,page)
  },
  ShowLasteTeacherBill : (type,limit,page) => {
    return API.Bill.get.global(type,limit,page)
  },
  ShowLasteExternalBill : (type,limit,page,moreQuery) => {
    return API.Bill.get.global(type,limit,page,moreQuery)
  },
  ShowRemeainingIncome : () => {
    return API.Bill.get.restInComeBill()
  },
  ShowRemeainingOutcome : () => {
    return API.Bill.get.restOutComeBill()
  },
  ShowIncomeBalanceInCurrentRange: (startDate,endDate) => {
    return API.Bill.get.inComeBalanceInRange(startDate,endDate)
  },
  ShowoutcomeBalanceInCurrentRange: (startDate,endDate) => {
    return API.Bill.get.outComeBalanceInRange(startDate,endDate)
  },
  ShowFirstBill : () => {
    return API.Bill.get.showBill('ASC')
  },
  ShowLastBill : () => {
    return API.Bill.get.showBill('DESC')
  },

  // test? dataServices
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
  AssingeMarkToTheTest : (testMark,testId,testDate) => {
    return API.Test.put.changeMark(testMark,testId,testDate)
  },
  RemoveTestFromCurrentReport : (data) => {
    return API.Test.put.removeTestFromReport(data)
  },
  ShowStudentTestInCurrentReport : (studentId,reportId) => {
    return API.Test.get.StudentTestInCurrentReport(studentId,reportId)
  },
  ShowStudentTestNotAddedToReport : (studentId) => {
    return API.Test.get.StudentTestNotAddedToReport(studentId)
  },

  // report? dataServices
  CreateNewReport: (data) => {
    return API.Report.post(data)
  },
  ShowAllNativeReports : (id,queryParams) => {
    return API.Report.get.AllReports(id,queryParams)
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
  ShowStudentReports : (studentId) => {
    return API.Report.get.StudentReports(studentId)
  },
  ShowStudentReportsAvg : (studentId) => {
    return API.Report.get.StudnetReportsAvg(studentId)
  },
  ShowTheTopOneInEachClassInCurrentReport: (reportId) => {
    return API.Report.get.TopOneStudents(reportId)
  },
  ShowTheAvgForEachClasseInCurrentReport: (reportId) => {
    return API.Report.get.TopOneClasses(reportId)
  },


  // Statistics? dataServices
  ShowGradeCountByType : () => {
    return API.Statistics.get.countByType()
  },
  ShowTeachersRateInCurrentSubject: (subjectId) => {
    return API.Statistics.get.TeacherRateBySubject(subjectId)
  },

  // grade? dataServices
  ShowAllInstituteGrade : () => {
    return API.Grade.get()
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

  // setting? dataServices
  ShowCurrentSettings : () => {
    return API.Setting.get() 
  },
  ChangeTheLanguage: (data) => {
    return API.Setting.put(data) 
  },
  ChangeAdminName: (data) => {
    return API.Setting.put(data) 
  },
  ChangeTheScreenStatus: (data) => {
    return API.Setting.put(data) 
  },

  // Authentication? DataServices
  LogginAsAdmin : (data) => {
    return API.Authentication.post(data) 
  },
  LoggoutFromAdmin : () => {
    return API.Authentication.put.logout() 
  },
  ChangeAdminPassword : (data) => {
    return API.Authentication.put.changePassword(data) 
  }


};



