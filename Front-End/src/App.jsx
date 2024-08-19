import NavBar from "./components/NavBar/NavBar.jsx";
import SidBar from "./components/SideBar/SidBar.jsx";
import { Routes, Route } from "react-router-dom";
import Statistics from "./components/Statistics/Statistics";
import NewStudent from "./components/Students/NewStudent.jsx";
import StudentsDetails from "./components/Students/StudentsDetails.jsx";
import NewTeacher from "./components/Teachers/NewTeacher.jsx";
import ManageTeacher from "./components/Teachers/ManageTeacher.jsx";
import TeacherDetails from "./components/Teachers/TeachersDetails.jsx";
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
import { createContext, useState } from "react";
import UpdateStudent from "./components/Students/UpdateStudent.jsx";
import StudentInformation from "./components/Students/StudentInformation.jsx";
import DeleteStudenModal from "./components/Modal/DeleteStudenModal.jsx";

const urlPath = [
  { path: "NewStudent", component: <NewStudent /> },
  { path: "StudentsDetails", component: <StudentsDetails /> },
  { path: "NewTeacher", component: <NewTeacher /> },
  { path: "TeachersDetails", component: <TeacherDetails /> },
  { path: "ManageTeacher", component: <ManageTeacher /> },
  { path: "StudentsPays", component: <StudentsPays /> },
  { path: "TeachersSalaries", component: <TeachersSalaries /> },
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
];

const renderAllRoute = urlPath.map((route, index) => {
  return (
    <Route path={"/" + route.path} element={route.component} key={index} />
  );
});

export const SharedState = createContext();

export default function App() {
  const [openSideBare, setOpenSideBare] = useState(true);

  const [successDeleteStudent, setSuccessDeleteStudent] = useState(false); // sharing state

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
      }}
    >
      <aside
        style={{ width: openSideBare ? "250px" : "60px", transition: "0.5s" }}
      >
        <SidBar />
      </aside>
      <main style={{ flex: "1" }}>
        <NavBar setOpenSideBare={setOpenSideBare} openSideBare={openSideBare} />
        <SharedState.Provider
          value={{ successDeleteStudent, setSuccessDeleteStudent }}
        >
          <div
            style={{
              padding: "20px",
              paddingTop: "5px",
            }}
          >
            <Routes>
              <Route path="/" element={<Statistics />} />
              {renderAllRoute}
              <Route path="StudentsDetails" element={<StudentsDetails />}>
                <Route
                  path="DeleteStudent/:id"
                  element={
                    <DeleteStudenModal
                      message={`Are You Sure To Delete Student`}
                    />
                  }
                />
              </Route>
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </div>
        </SharedState.Provider>
      </main>
    </div>
  );
}
