import NavBar from "./components/NavBar/NavBar.jsx";
import SidBar from "./components/SideBar/SidBar.jsx";
import { Routes , Route} from 'react-router-dom' ;
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

export default function App() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <aside style={{width : '20%' , transition: '0.3s'}}>
        <SidBar />
      </aside>
      <main style={{ flex : '1'}}>
        <NavBar />
        <div style={{paddingTop: '20px',paddingLeft: '20px'}}>
          <Routes >
            <Route path="/" element={<Statistics />}  />    
            <Route path="/NewStudent" element={<NewStudent />} />
            <Route path="/StudentsDetails" element={<StudentsDetails />} />
            <Route path="/StudentsDetails" element={<StudentsDetails />} />
            <Route path="/NewTeacher" element={<NewTeacher />} />
            <Route path="/ManageTeacher" element={<ManageTeacher />} />
            <Route path="/TeachersDetails" element={<TeacherDetails />} />
            <Route path="/StudentsPays" element={<StudentsPays />} />
            <Route path="/TeachersSalaries" element={<TeachersSalaries />} />
            <Route path="/ExternalPays" element={<ExternalPays />} />
            <Route path="/AllBillDetails" element={<AllBillDetails />} />
            <Route path="/CreateTest" element={<CreateTest />} />
            <Route path="/CreateReport" element={<CreateReport />} />
            <Route path="/TestDetails" element={<TestDetails />} />
            <Route path="/NewClass" element={<NewClass />} />
            <Route path="/ManageClasses" element={<ManageClasses />} />
            <Route path="/ClassesDetails" element={<ClassesDetails />} />
            <Route path="/Subject" element={<Subject />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
