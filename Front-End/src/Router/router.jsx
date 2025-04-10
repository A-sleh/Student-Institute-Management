import { lazy } from "react"
const  Statistics =  lazy(() => import( ".././components/Statistics/Statistics"))
const  NewStudent =  lazy(() => import( "../components/Students/NewStudent/NewStudent.jsx" ))
const  StudentsDetails =  lazy(() => import( ".././components/Students/StudentsDetails.jsx"))
const  NewTeacher =  lazy(() => import( ".././components/Teachers/newTeacher/NewTeacher.jsx"))
const  ManageTeacher =  lazy(() => import( ".././components/Teachers/manageTeachers/ManageTeacher.jsx"))
const  TeachersDetails =  lazy(() => import( ".././components/Teachers/teacherDetails/TeachersDetails.jsx"))
const  StudentsPays =  lazy(() => import( ".././components/Bills/StudentsPays.jsx"))
const  TeachersSalaries =  lazy(() => import( ".././components/Bills/TeachersSalaries.jsx"))
const  ExternalPays =  lazy(() => import( ".././components/Bills/ExternalPays.jsx"))
const  AllBillDetails =  lazy(() => import( ".././components/Bills/AllBillDetails.jsx"))
const  Test =  lazy(() => import( ".././components/Tests/Test.jsx"))
const  CreateReport =  lazy(() => import( ".././components/Tests/CreateReport.jsx"))
const  NewClass =  lazy(() => import( ".././components/Classes/NewClass.page.jsx"))
const  ManageClasses =  lazy(() => import( ".././components/Classes/ManageClasses.page.jsx"))
const  ClassesDetails =  lazy(() => import( ".././components/Classes/ClassesDetails.page.jsx"))
const  Subject =  lazy(() => import( ".././components/Subjects/Subject.jsx"))
const  UpdateStudent =  lazy(() => import( ".././components/Students/NewStudent/UpdateStudent.jsx"))
const  StudentInformation =  lazy(() => import( ".././components/Students/StudentInformation.jsx"))
const  InsertNewStudent =  lazy(() => import( ".././components/Classes/ManageClasses/InsertNewStudent.jsx"))
const  MoveStudentsToAnotherClass =  lazy(() => import( ".././components/Classes/ManageClasses/MoveStudentsToAnotherClass.jsx"))
const  UpdateTeacher =  lazy(() => import( ".././components/Teachers/teacherDetails/UpdateTeacher.jsx"))
const  TeacherInformation =  lazy(() => import( ".././components/Teachers/teacherInformation/TeacherInformation.jsx"))
const  TeacherNewClass =  lazy(() => import( ".././components/Teachers/manageTeachers/TeacherNewClass.jsx"))
const  TeacherNewSubject =  lazy(() => import( ".././components/Teachers/manageTeachers/TeacherNewSubject.jsx"))
const  ShowBillStudentDetails =  lazy(() => import( ".././components/Bills/StudentsPaysCom/ShowBillStudentDetails.jsx"))
const  NewBill =  lazy(() => import( ".././components/Bills/StudentsPaysCom/NewBill.jsx"))
const  NewBillExternal =  lazy(() => import( ".././components/Bills/ExternalPaysCom/NewBill.jsx"))
const  ManagStudentBill =  lazy(() => import( ".././components/Bills/StudentsPaysCom/ManagStudentBill.jsx"))
const  StudentBillDetails =  lazy(() => import( ".././components/Bills/StudentsPaysCom/StudentBillDetails.jsx"))
const StudentMissedDays = lazy(() => import( "../components/Students/studentsMissDays/StudentMissedDays.jsx"))
const  ShowBillTeacherDetails =  lazy(() => import( ".././components/Bills/TeacherPaysCom/ShowBillTeacherDetails.jsx"))
const  ManagTeacherBill =  lazy(() => import( ".././components/Bills/TeacherPaysCom/ManagTeacherBill.jsx"))
const  NewTeacherBill =  lazy(() => import( ".././components/Bills/TeacherPaysCom/NewTeacherBill.jsx"))
const  TeacherBillDetails =  lazy(() => import( ".././components/Bills/TeacherPaysCom/TeacherBillDetails.jsx"))
const  ManagExternalBill =  lazy(() => import( ".././components/Bills/ExternalPaysCom/ManagExternalBill.jsx"))
const  ShowBillExternalDetails =  lazy(() => import( ".././components/Bills/ExternalPaysCom/ShowBillExternalDetails.jsx"))
const  NewTest =  lazy(() => import( ".././components/Tests/CreateTestTools/NewTest/NewTest.jsx"))
const  ShowAllTest =  lazy(() => import( ".././components/Tests/CreateTestTools/ShowAllTest/ShowAllTest.jsx"))
const  RecevingMarkes =  lazy(() => import( ".././components/Tests/CreateTestTools/AssineMarke/RecevingMarkes.jsx"))
const  StudentTestDetails =  lazy(() => import( ".././components/Tests/CreateTestTools/ShowAllTest/StudentTestDetails.jsx"))
const  TestClassCurrent =  lazy(() => import( ".././components/Tests/CreateTestTools/AssineMarke/TestClassCurrent.jsx"))
const  StudentMarkForm =  lazy(() => import( ".././components/Tests/CreateTestTools/AssineMarke/StudentMarkForm.jsx"))
const  NewReportForm =  lazy(() => import( ".././components/Tests/CreateReportTools/NewReport/NewReportForm.jsx"))
const  ManageReports =  lazy(() => import( ".././components/Tests/CreateReportTools/ManageReport/ManageReports.jsx"))
const  ReportDetails =  lazy(() => import( ".././components/Tests/CreateReportTools/Report details/ReportDetails.jsx"))
const  PrintReport =  lazy(() => import( ".././components/Tests/CreateReportTools/Print Report/PrintReport.jsx"))
const  LinkTestWithReport =  lazy(() => import( ".././components/Tests/CreateReportTools/ManageReport/LinkTestWithReport.jsx"))
const  ShowClassReports =  lazy(() => import( "../components/Tests/CreateReportTools/Report details/ClassReports.jsx"))
const  ReportClassDetails =  lazy(() => import( ".././components/Tests/CreateReportTools/Report details/ReportClassDetails.jsx"))
const  StudentReportTests =  lazy(() => import( ".././components/Tests/CreateReportTools/Report details/StudentReportTests.jsx"))
const  RemoveTeachersFromClass =  lazy(() => import(".././components/Classes/ManageClasses/RemoveTeachersFromClass.jsx"))
const  ClassReportPrint =  lazy(() => import( ".././components/Tests/CreateReportTools/Print Report/ClassReportPrint.jsx"))
const Grade = lazy(() => import( ".././components/Grade/Grade.jsx"))
const NewGrade = lazy(() => import( ".././components/Grade/new form/NewGradeForm.jsx"))
const ManageGrades = lazy(() => import( ".././components/Grade/manage grades/ManageGrades.jsx"))
const Setting = lazy(() => import( "../components/setting/Setting.jsx"))
const ClassStudents = lazy(() => import("../components/Students/studentsMissDays/ClassStudents.jsx"))

import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx"
import NewSubjectForm from "../components/Subjects/NewSubject/NewSubjectForm.jsx"
import ShowSubjects from "../components/Subjects/displaySubject/ShowSubjects.jsx"

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App /> ,
            children: [
                {
                    element: <Statistics />,
                    index: true 
                },
                {
                    path: 'Statistics',
                    element: <Statistics />,
                },
                {
                    path: 'StudentMissedDays', 
                    element: <StudentMissedDays />
                },
                {
                    path: 'ClassStudents/:classId', 
                    element: <ClassStudents />
                },
                {
                    path: 'NewStudent',
                    element: <NewStudent />,
                },
                {
                    path: 'StudentsDetails',
                    element: <StudentsDetails />,
                },
                {
                    path: 'NewTeacher',
                    element: <NewTeacher />,
                },
                {
                    path: 'TeachersDetails',
                    element: <TeachersDetails />,
                },
                {
                    path: 'ManageTeacher',
                    element: <ManageTeacher />,
                    unstable_keepalive: true
                },
                {
                    path: 'ManageTeacher/TeacherNewClass/:id',
                    element: <TeacherNewClass />,
                },
                {
                    path: 'ManageTeacher/TeacherNewSubject/:id',
                    element: <TeacherNewSubject />,
                },
                {
                    path: '/UpdateTeacher/:info',
                    element: <UpdateTeacher />,
                },
                {
                    path: '/TeacherInformation/:info',
                    element: <TeacherInformation />,
                },
                {
                    path: 'AllBillDetails',
                    element: <AllBillDetails />,
                },
                {
                    path: 'NewClass',
                    element: <NewClass />,
                },
                {
                    path: 'ManageClasses',
                    element: <ManageClasses />,
                },
                {
                    path: 'RemoveTeachersFromClass/:classId',
                    element: <RemoveTeachersFromClass />,
                },
                {
                    path: 'ClassesDetails',
                    element: <ClassesDetails />,
                },
                {
                    path: 'Subject',
                    element: <Subject />,
                    children : [
                        {
                            element: <NewSubjectForm />,
                            index: true,
                        },
                        {
                            path: 'NewSubject', 
                            element: <NewSubjectForm />
                        },
                        {
                            path: 'ShowSubjects', 
                            element: <ShowSubjects />
                        }
                    ]
                },
                {
                    path: '/StudentInformation/:id',
                    element: <StudentInformation />,
                },
                {
                    path: '/UpdateStudent/:info',
                    element: <UpdateStudent />,
                },
                {
                    path: '/ManageClasses/InsertNewStudent',
                    element: <InsertNewStudent />,
                },
                {
                    path: '/MoveStudentsToAnotherClass/:classId',
                    element: <MoveStudentsToAnotherClass />,
                },
                {
                    path: 'StudentsPays',
                    element: <StudentsPays />,
                    children: [
                        {
                            element:  <ShowBillStudentDetails />,
                            index: true
                        },
                        {
                            path: 'ShowBillStudentDetails',
                            element:  <ShowBillStudentDetails />,
                        },
                        {
                            path: 'StudentBillDetails/:id',
                            element:  <StudentBillDetails />,
                        },
                        {
                            path: 'NewBill',
                            element:  <NewBill />,
                        },
                        {
                            path: 'ManagStudentBill',
                            element:  <ManagStudentBill />,
                        }
                    ]
                },
                {
                    path: 'TeachersSalaries',
                    element: <TeachersSalaries />,
                    children: [
                        {
                            element:  <ShowBillTeacherDetails />,
                            index: true
                        },
                        {
                            path: 'ShowBillTeacherDetails',
                            element:  <ShowBillTeacherDetails />,
                        },
                        {
                            path: 'ManagTeacherBill',
                            element:  <ManagTeacherBill />,
                        },
                        {
                            path: 'TeacherBillDetails/:id',
                            element:  <TeacherBillDetails />,
                        },
                        {
                            path: 'NewTeacherBill',
                            element:  <NewTeacherBill />,
                        }
                    ]
                },
                {
                    path: 'ExternalPays',
                    element: <ExternalPays />,
                    children: [
                        {
                            element:  <ShowBillExternalDetails />,
                            index: true
                        },
                        {
                            path: 'ShowBillExternalDetails',
                            element:  <ShowBillExternalDetails />,
                        },
                        {
                            path: 'ManagExternalBill',
                            element:  <ManagExternalBill />,
                        },
                        {
                            path: 'NewBill',
                            element:  <NewBillExternal />,
                        }
                    ]
                },
                {
                    path: 'Test',
                    element: <Test />,
                    children: [
                        {
                            element:  <NewTest />,
                            index: true
                        },
                        {
                            path: 'NewTest',
                            element:  <NewTest />,
                        },
                        {
                            path: 'ShowAllTest',
                            element:  <ShowAllTest />,
                        },
                        {
                            path: 'RecivingMarks',
                            element:  <RecevingMarkes />,
                        },
                        {
                            path: 'StudentTestDetails/:classId',
                            element:  <StudentTestDetails />,
                        },
                        {
                            path: 'TestClassCurrent/:classId',
                            element:  <TestClassCurrent />,
                        },
                        {
                            path: 'StudentMarkForm/:testId',
                            element:  <StudentMarkForm />,
                        }
                    ]
                },
                {
                    path: 'CreateReport',
                    element: <CreateReport />,
                    children: [
                        {
                            element:  <NewReportForm />,
                            index: true
                        },
                        {
                            path: 'NewReportForm',
                            element:  <NewReportForm />,
                        },
                        {
                            path: 'LinkTestWithReport/:classId',
                            element:  <LinkTestWithReport />,
                        },
                        {
                            path: 'ShowClassReports/:classId',
                            element:  <ShowClassReports />,
                        },
                        {
                            path: 'ClassReportPrint/:classId',
                            element:  <ClassReportPrint />,
                        },
                        {
                            path: 'ReportClassDetails/:classId',
                            element:  <ReportClassDetails />,
                        },
                        {
                            path: 'StudentReportTests/:studentId',
                            element:  <StudentReportTests />,
                        },
                        {
                            path: 'ManageReports',
                            element:  <ManageReports />,
                        },
                        {
                            path: 'ReportDetails',
                            element:  <ReportDetails />,
                        },
                        {
                            path: 'PrintReport',
                            element:  <PrintReport />,
                        }
                    ]
                },
                {
                    path: 'Grade' ,
                    element: <Grade />,
                    children : [
                        {
                            index: true ,
                            element: <NewGrade />
                        },  
                        {
                            path: 'NewGrade' ,
                            element: <NewGrade />
                        },  
                        {
                            path: 'ManageGrades' ,
                            element: <ManageGrades />
                        }
                    ]
                },
                {
                    path: 'Setting' ,
                    element: <Setting />
                },
                {
                    path: '*' ,
                    element: <h1>Not Found Page</h1>
                }
            ]
        }
    ]
    
)

export default router