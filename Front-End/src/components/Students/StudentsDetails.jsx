/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/
import { useMemo, useState } from "react";
import { COLUMNS } from "./column/Columns";
import { Link, Outlet } from "react-router-dom";
import Title from "../Global/Title";
import Notification from "../Global/Notification";
import DeleteModal from "../Modal/DeleteModal";
import TablePaginated from "../shared/TablePaginated";
import useStudentsInfo from "../../hooks/student_hooks/useStudentsInfo";
import SubHeaderFilterClassByGrade from "../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import { FilterClassByGradeI } from "../shared/subHeaderTable/FilterClassByGradeI";

export default function StudentsDetails() {

  const [deleteModal, setDeleteModal] = useState(false);
  const [successDeleteStudent, setSuccessDeleteStudent] = useState(false);
  const [selectedGrade,setSelectedGrade] = useState('')
  const [selectedClass,setSelectedClass] = useState('all')
  const [currentStudentInfo, setCurrentStudentInfo] = useState({
    id: null,
    name: "",
  });
  const [currentPage,setCurrentPage] = useState(1)
  const [studentsInfo] = useStudentsInfo(selectedGrade,setCurrentPage,15,currentPage,successDeleteStudent);
  const { students, totalPages} = studentsInfo
  
  function handleDleteClicked(student) {
    setCurrentStudentInfo({
      name: `${student.name} ${student.lastName}`,
      id: student.studentId,
    });
    setDeleteModal(true);
  }

  function mappingClassStudents() {
      return selectedClass.students.map( student => {
        return {
          ... student ,
          full_name: student.name + ' ' + student.lastName ,
          className: selectedClass.title 
        }
      })
  }

  const column = useMemo(
    () => [
      ...COLUMNS,
      {
        id: "selection",
        Header: "Action",
        Cell: ({ row }) => (
          <div
            style={{
              justifyContent: "space-evenly",
              display: "flex",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
            <Link
              to={`/StudentInformation/${row.original.studentId}`}
              style={{ color: "gray", cursor: "pointer" }}
            >
              <i className="bi bi-person-lines-fill"></i>
            </Link>
            <Link
              to={`/UpdateStudent/${row.original.id}?data=${encodeURIComponent(
                JSON.stringify(row.original)
              )}`}
              style={{ color: "rgb(0 76 255 / 85%)", cursor: "pointer" }}
            >
              <i className="bi bi-person-gear"></i>
            </Link>
            <Link
              onClick={() => {
                handleDleteClicked(row.original);
              }}
              style={{ color: "#ff0000d9", cursor: "pointer" }}
            >
              <i className="bi bi-person-dash"></i>
            </Link>
            <Outlet />
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      {
        deleteModal && 
        <DeleteModal element={currentStudentInfo.name} type={"student"} id={currentStudentInfo.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteStudent} />
      }
      <Notification title={"student was deleted"} type={"success"} state={successDeleteStudent} setState={setSuccessDeleteStudent} />

      <Title title={window.location.pathname} />
      <TablePaginated data={(selectedClass == 'all' ? students :  selectedClass?.students[0] == null ? [] : mappingClassStudents() ) || []  } column={column} setNextPageState={setCurrentPage} totalPages={totalPages} currPage={currentPage} rowNumber={selectedClass == 'all' ? 15 : selectedClass.students.length } >
        <div>
          <SubHeaderFilterClassByGrade setSelectedGrade={setSelectedGrade}/>
          <FilterClassByGradeI setSelectedClass={setSelectedClass} selectedClass={selectedClass} gradeId={selectedGrade?.gradeId} />
        </div>
      </TablePaginated> 

    </>
  );
}
