import NavBar from "./components/NavBar/NavBar.jsx";
import SidBar from "./components/SideBar/SidBar.jsx";
import { Routes, Route } from "react-router-dom";
import Statistics from "./components/Statistics/Statistics";
import NewStudent from "./components/Students/NewStudent.jsx";
import StudentsDetails from "./components/Students/StudentsDetails.jsx";
import NewTeacher from "./components/Teachers/newTeacher/NewTeacher.jsx";
import ManageTeacher from "./components/Teachers/manageTeachers/ManageTeacher.jsx"; 
import TeachersDetails from "./components/Teachers/teacherDetails/TeachersDetails.jsx"; 
import StudentsPays from "./components/Bills/StudentsPays.jsx";
import TeachersSalaries from "./components/Bills/TeachersSalaries.jsx";
import ExternalPays from "./components/Bills/ExternalPays.jsx";
import AllBillDetails from "./components/Bills/AllBillDetails.jsx";
import CreateTest from "./components/Tests/CreateTest.jsx";
import CreateReport from "./components/Tests/CreateReport.jsx";
import TestDetails from "./components/Tests/TestDetails.jsx";
import NewClass from "./components/Classes/NewClass.jsx";
import ManageClasses from "./components/Classes/ManageClasses.jsx";
import ClassesDetails from "./components/Classes/ClassesDetails.jsx";
import Subject from "./components/Subjects/Subject.jsx";
import UpdateStudent from "./components/Students/UpdateStudent.jsx";
import StudentInformation from "./components/Students/StudentInformation.jsx";
import { useState } from "react";
import InsertNewStudent from "./components/Classes/InsertNewStudent.jsx";
import MoveStudentsToAnotherClass from "./components/Classes/MoveStudentsToAnotherClass.jsx";
import UpdateTeacher from "./components/Teachers/teacherDetails/UpdateTeacher.jsx";
import TeacherInformation from "./components/Teachers/teacherInformation/TeacherInformation.jsx";
import TeacherNewClass from "./components/Teachers/manageTeachers/TeacherNewClass.jsx";
import TeacherNewSubject from "./components/Teachers/manageTeachers/TeacherNewSubject.jsx";
import ShowBillStudentDetails from "./components/Bills/StudentsPaysCom/ShowBillStudentDetails.jsx";
import NewBill from "./components/Bills/StudentsPaysCom/NewBill.jsx";
import ManagStudentBill from "./components/Bills/StudentsPaysCom/ManagStudentBill.jsx";
import StudentBillDetails from "./components/Bills/StudentsPaysCom/StudentBillDetails.jsx";
import ShowBillTeacherDetails from "./components/Bills/TeacherPaysCom/ShowBillTeacherDetails.jsx";
import ManagTeacherBill from "./components/Bills/TeacherPaysCom/ManagTeacherBill.jsx";
import NewTeacherBill from "./components/Bills/TeacherPaysCom/NewTeacherBill.jsx";
import TeacherBillDetails from "./components/Bills/TeacherPaysCom/TeacherBillDetails.jsx";


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
  { path: "ExternalPays", component: <ExternalPays /> },
  { path: "AllBillDetails", component: <AllBillDetails /> },
  { path: "CreateTest", component: <CreateTest /> },
  { path: "TestDetails", component: <TestDetails /> },
  { path: "CreateReport", component: <CreateReport /> },
  { path: "estDetails", component: <estDetails /> },
  { path: "NewClass", component: <NewClass /> },
  { path: "ManageClasses", component: <ManageClasses /> },
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
          <Routes>
            <Route path="/" element={<Statistics />} />
            {renderAllRoute}

            <Route path="StudentsPays" element={ <StudentsPays />} >
              <Route path="ShowBillStudentDetails" element={<ShowBillStudentDetails />} />
              <Route path="StudentBillDetails/:id" element={<StudentBillDetails />} />
              <Route path="NewBill" element={<NewBill />} />
              <Route path="ManagStudentBill" element={<ManagStudentBill />} />
            </Route> 

            <Route path="TeachersSalaries" element={<TeachersSalaries />} >
              <Route path="ManagTeacherBill" element={<ManagTeacherBill />} />
              <Route path="TeacherBillDetails/:id" element={<TeacherBillDetails />} />
              <Route path="NewTeacherBill" element={<NewTeacherBill />} />
              <Route path="ShowBillTeacherDetails" element={<ShowBillTeacherDetails />} />
            </Route>

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
