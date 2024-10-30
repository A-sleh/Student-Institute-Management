import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Suspense } from "react";

const  NavBar =  lazy(() => import( "./components/NavBar/NavBar.jsx"))
const  SidBar =  lazy(() => import( "./components/SideBar/SidBar.jsx"))
const  Statistics =  lazy(() => import( "./components/Statistics/Statistics"))
const  NewStudent =  lazy(() => import( "./components/Students/NewStudent.jsx"))
const  StudentsDetails =  lazy(() => import( "./components/Students/StudentsDetails.jsx"))
const  NewTeacher =  lazy(() => import( "./components/Teachers/newTeacher/NewTeacher.jsx"))
const  ManageTeacher =  lazy(() => import( "./components/Teachers/manageTeachers/ManageTeacher.jsx"))
const  TeachersDetails =  lazy(() => import( "./components/Teachers/teacherDetails/TeachersDetails.jsx"))
const  StudentsPays =  lazy(() => import( "./components/Bills/StudentsPays.jsx"))
const  TeachersSalaries =  lazy(() => import( "./components/Bills/TeachersSalaries.jsx"))
const  ExternalPays =  lazy(() => import( "./components/Bills/ExternalPays.jsx"))
const  AllBillDetails =  lazy(() => import( "./components/Bills/AllBillDetails.jsx"))
const  Test =  lazy(() => import( "./components/Tests/Test.jsx"))
const  CreateReport =  lazy(() => import( "./components/Tests/CreateReport.jsx"))

const  NewClass =  lazy(() => import( "./components/Classes/NewClass.jsx"))
const  ManageClasses =  lazy(() => import( "./components/Classes/ManageClasses.jsx"))
const  ClassesDetails =  lazy(() => import( "./components/Classes/ClassesDetails.jsx"))
const  Subject =  lazy(() => import( "./components/Subjects/Subject.jsx"))
const  UpdateStudent =  lazy(() => import( "./components/Students/UpdateStudent.jsx"))
const  StudentInformation =  lazy(() => import( "./components/Students/StudentInformation.jsx"))
const  InsertNewStudent =  lazy(() => import( "./components/Classes/InsertNewStudent.jsx"))
const  MoveStudentsToAnotherClass =  lazy(() => import( "./components/Classes/MoveStudentsToAnotherClass.jsx"))
const  UpdateTeacher =  lazy(() => import( "./components/Teachers/teacherDetails/UpdateTeacher.jsx"))
const  TeacherInformation =  lazy(() => import( "./components/Teachers/teacherInformation/TeacherInformation.jsx"))
const  TeacherNewClass =  lazy(() => import( "./components/Teachers/manageTeachers/TeacherNewClass.jsx"))
const  TeacherNewSubject =  lazy(() => import( "./components/Teachers/manageTeachers/TeacherNewSubject.jsx"))
const  ShowBillStudentDetails =  lazy(() => import( "./components/Bills/StudentsPaysCom/ShowBillStudentDetails.jsx"))
const  NewBill =  lazy(() => import( "./components/Bills/StudentsPaysCom/NewBill.jsx"))
const  NewBillExternal =  lazy(() => import( "./components/Bills/ExternalPaysCom/NewBill.jsx"))
const  ManagStudentBill =  lazy(() => import( "./components/Bills/StudentsPaysCom/ManagStudentBill.jsx"))
const  StudentBillDetails =  lazy(() => import( "./components/Bills/StudentsPaysCom/StudentBillDetails.jsx"))
const  ShowBillTeacherDetails =  lazy(() => import( "./components/Bills/TeacherPaysCom/ShowBillTeacherDetails.jsx"))
const  ManagTeacherBill =  lazy(() => import( "./components/Bills/TeacherPaysCom/ManagTeacherBill.jsx"))
const  NewTeacherBill =  lazy(() => import( "./components/Bills/TeacherPaysCom/NewTeacherBill.jsx"))
const  TeacherBillDetails =  lazy(() => import( "./components/Bills/TeacherPaysCom/TeacherBillDetails.jsx"))
const  ManagExternalBill =  lazy(() => import( "./components/Bills/ExternalPaysCom/ManagExternalBill.jsx"))
const  ShowBillExternalDetails =  lazy(() => import( "./components/Bills/ExternalPaysCom/ShowBillExternalDetails.jsx"))
const  NewTest =  lazy(() => import( "./components/Tests/CreateTestTools/NewTest/NewTest.jsx"))
const  ShowAllTest =  lazy(() => import( "./components/Tests/CreateTestTools/ShowAllTest/ShowAllTest.jsx"))
const  RecevingMarkes =  lazy(() => import( "./components/Tests/CreateTestTools/AssineMarke/RecevingMarkes.jsx"))
const  ClassesTestDetails =  lazy(() => import( "./components/Tests/CreateTestTools/ShowAllTest/ClassesTestDetails.jsx"))
const  StudentTestDetails =  lazy(() => import( "./components/Tests/CreateTestTools/ShowAllTest/StudentTestDetails.jsx"))
const  TestClassCurrent =  lazy(() => import( "./components/Tests/CreateTestTools/AssineMarke/TestClassCurrent.jsx"))
const  StudentMarkForm =  lazy(() => import( "./components/Tests/CreateTestTools/AssineMarke/StudentMarkForm.jsx"))
const  NewReportForm =  lazy(() => import( "./components/Tests/CreateReportTools/NewReport/NewReportForm.jsx"))
const  ManageReports =  lazy(() => import( "./components/Tests/CreateReportTools/ManageReport/ManageReports.jsx"))
const  ReportDetails =  lazy(() => import( "./components/Tests/CreateReportTools/Report details/ReportDetails.jsx"))
const  PrintReport =  lazy(() => import( "./components/Tests/CreateReportTools/Print Report/PrintReport.jsx"))
const  LinkTestWithReport =  lazy(() => import( "./components/Tests/CreateReportTools/ManageReport/LinkTestWithReport.jsx"))
const  ShowClassReports =  lazy(() => import( "./components/Tests/CreateReportTools/Report details/ShowClassReports.jsx"))
const  ReportClassDetails =  lazy(() => import( "./components/Tests/CreateReportTools/Report details/ReportClassDetails.jsx"))
const  StudentReportTests =  lazy(() => import( "./components/Tests/CreateReportTools/Report details/StudentReportTests.jsx"))
const  RemoveTeachersFromClass =  lazy(() => import( "./components/Classes/RemoveTeachersFromClass.jsx"))
const  ClassReportPrint =  lazy(() => import( "./components/Tests/CreateReportTools/Print Report/ClassReportPrint.jsx"))


const urlPath = [
  { path: "NewStudent", component: <NewStudent /> },
  { path: "StudentsDetails", component: <StudentsDetails /> },
  { path: "NewTeacher", component: <NewTeacher /> },
  { path: "TeachersDetails", component: <TeachersDetails /> },
  { path: "ManageTeacher", component: <ManageTeacher /> },
  { path: "ManageTeacher/TeacherNewClass/:id", component: <TeacherNewClass /> }, 
  { path: "ManageTeacher/TeacherNewSubject/:id", component: <TeacherNewSubject /> }, 
  { path: "/UpdateTeacher/:info", component: <UpdateTeacher /> },
  { path: "/TeacherInformation/:info", component: <TeacherInformation /> },
  { path: "AllBillDetails", component: <AllBillDetails /> },
  { path: "estDetails", component: <estDetails /> },
  { path: "NewClass", component: <NewClass /> },
  { path: "ManageClasses", component: <ManageClasses /> },
  { path: "RemoveTeachersFromClass/:classId", component: <RemoveTeachersFromClass /> },
  { path: "ClassesDetails", component: <ClassesDetails /> },  
  { path: "Subject", component: <Subject /> },
  { path: "/StudentInformation/:id", component: <StudentInformation /> },
  { path: "/UpdateStudent/:info", component: <UpdateStudent /> },
  { path: "/ManageClasses/InsertNewStudent", component: <InsertNewStudent /> },
  { path: "/MoveStudentsToAnotherClass/:classId", component: <MoveStudentsToAnotherClass /> },

];




const renderAllRoute = urlPath.map((route, index) => {
  return (
    <Route path={"/" + route.path} element={route.component} key={index} />
  );
});


export default function App() {
  const [openSideBare, setOpenSideBare] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
      }}
    >
      <aside
        style={{ width: openSideBare ? "250px" : "56px", transition: "0.5s" }}
      >
        <SidBar />
      </aside>
      <main style={{ flex: "1" }}>
        <NavBar setOpenSideBare={setOpenSideBare} openSideBare={openSideBare} />
        <div
          style={{
            padding: "20px",
            paddingTop: "5px",
          }}
        >
          <Suspense>
            <Routes>
              <Route path="/" element={<Statistics />} />
              {renderAllRoute}

              <Route path="StudentsPays" element={ <StudentsPays />} >
                <Route index element={<ShowBillStudentDetails />}  />
                <Route path="ShowBillStudentDetails" element={<ShowBillStudentDetails />}  />
                <Route path="StudentBillDetails/:id" element={<StudentBillDetails />} />
                <Route path="NewBill" element={<NewBill />} />
                <Route path="ManagStudentBill" element={<ManagStudentBill />} />
              </Route> 

              <Route path="TeachersSalaries" element={<TeachersSalaries />} >
                <Route index element={<ShowBillTeacherDetails />} />
                <Route path="ShowBillTeacherDetails" element={<ShowBillTeacherDetails />} />
                <Route path="ManagTeacherBill" element={<ManagTeacherBill />} />
                <Route path="TeacherBillDetails/:id" element={<TeacherBillDetails />} />
                <Route path="NewTeacherBill" element={<NewTeacherBill />} />
              </Route>

              <Route path="ExternalPays" element={<ExternalPays />} >
                <Route index element={<ShowBillExternalDetails />} />
                <Route path="ShowBillExternalDetails" element={<ShowBillExternalDetails />} />
                <Route path="ManagExternalBill" element={<ManagExternalBill />} />  
                <Route path="NewBill" element={<NewBillExternal />} />  
              </Route>

              <Route path="Test" element={<Test />} >
                <Route index element={<NewTest />} />  
                <Route path="NewTest" element={<NewTest />} />  
                <Route path="ShowAllTest" element={<ShowAllTest />} />
                {/* <Route path="ManageTest" element={<ManageTest />} /> */}
                <Route path="RecivingMarks" element={<RecevingMarkes />} />
                <Route path="ClassesTestDetails/:testId" element={<ClassesTestDetails />} />
                <Route path="StudentTestDetails/:classId" element={<StudentTestDetails />} />
                <Route path="TestClassCurrent/:classId" element={<TestClassCurrent />} />
                <Route path="StudentMarkForm/:testId" element={<StudentMarkForm />} />
              </Route>

              <Route path="CreateReport" element={<CreateReport />} >
                <Route index element={<NewReportForm />} />  
                <Route path="NewReportForm" element={<NewReportForm />} />  
                <Route path="LinkTestWithReport/:classId" element={<LinkTestWithReport />} />  
                <Route path="ShowClassReports/:classId" element={<ShowClassReports />} />  
                <Route path="ClassReportPrint/:classId" element={<ClassReportPrint />} />  
                <Route path="ReportClassDetails/:reportId" element={<ReportClassDetails />} />  
                <Route path="StudentReportTests/:studentId" element={<StudentReportTests />} />  
                <Route path="ManageReports" element={<ManageReports />} />
                <Route path="ReportDetails" element={<ReportDetails />} />  
                <Route path="PrintReport" element={<PrintReport />} />
              </Route>

              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
