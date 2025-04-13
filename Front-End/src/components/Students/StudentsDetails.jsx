/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/
import { useEffect, useMemo, useState } from "react";
import { COLUMNS } from "./column/Columns";
import { Link, Outlet } from "react-router-dom";
import Title from "../Global/Title";
import Notification from "../Global/Notification";
import DeleteModal from "../Modal/DeleteModal";
import TablePaginated from "../shared/TablePaginated";
import useStudentsInfo from "../../hooks/student_hooks/useStudentsInfo";
import SubHeaderFilterClassByGrade from "../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import { FilterClassByGradeI } from "../shared/subHeaderTable/FilterClassByGradeI";
import useGetStudentsByName from "../../hooks/student_hooks/useGetStudentsByName";
import { useSelector } from "react-redux";
import { StudentsDetailsText } from "../../Data/static/Students/StudentsInformation/StudentsDetails";

export default function StudentsDetails() {

  const {currentLange} = useSelector( state => state.language)
  const {grade : selectedGrade} = useSelector(state => state.grade)
  const {notFoundStudentsMES,successDeleteStudentMES} = StudentsDetailsText[currentLange]

  const [deleteModal, setDeleteModal] = useState(false);
  const [successDeleteStudent, setSuccessDeleteStudent] = useState(false);
  const [selectedClass,setSelectedClass] = useState('all')
  const [searchField,setSearchField] = useState('')
  const [currentStudentInfo, setCurrentStudentInfo] = useState({
    id: null,
    name: "",
  });
  const [sendRequest,setSendRequest] = useState(false)
  const [searchedStudents,notFoundMes,setNotFoundMes] = useGetStudentsByName(searchField,sendRequest)
  const [currentPage,setCurrentPage] = useState(1)
  const [studentsInfo] = useStudentsInfo(selectedGrade,setCurrentPage,15,currentPage,successDeleteStudent);
  const { students, totalPages} = studentsInfo
  
  useEffect(() => {
    if(selectedClass != 'all') 
      setSearchField('')
  },[selectedClass]) 

  function handleSearchClicked() {
    setSendRequest(true)
    setTimeout(()=> setSendRequest(false),200)
  }
  
  function handleDleteClicked(student) {
    setCurrentStudentInfo({
      name: `${student.name} ${student.lastName}`,
      id: student.studentId,
    });
    setDeleteModal(true);
  }

  function mappingClassStudents(students,classTitle = null) {

      let removeStudentsOBJ = {...selectedClass}
      delete removeStudentsOBJ?.students

      return students?.map( student => {
        return {...{
          ... student ,
          full_name: student.name + ' ' + student.lastName ,
          className: classTitle == null ? student?.class?.title : classTitle,
        },class: selectedClass?.students != undefined ? removeStudentsOBJ : student?.class}
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
              to={`/UpdateStudent/${row.original.studentId}?data=${encodeURIComponent(
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

  function tableInfo() {
    // data comes from search field
    if(searchField != '' && searchedStudents?.length != 0) 
      return {
        data: mappingClassStudents(searchedStudents) ,
        studentsNum: searchedStudents.length ,
        totalPage: 1 
      }
    // data comes from selector filter
    if(selectedClass != 'all' ) {
      setCurrentPage(1)
      return {
        data: mappingClassStudents(selectedClass?.students,selectedClass?.title) ,
        studentsNum: selectedClass?.students?.length ,
        totalPage: 1 
      }
    }
    // all data 
    return {
      data: students ,
      studentsNum: 15 ,
      totalPage: totalPages
    } 
  }
  
  return (
    <>
      {
        deleteModal && 
        <DeleteModal element={currentStudentInfo.name} type={"student"} id={currentStudentInfo.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteStudent} />
      }
      <Notification title={successDeleteStudentMES} type={"success"} state={successDeleteStudent} setState={setSuccessDeleteStudent} />
      <Notification title={notFoundStudentsMES} type={"error"} state={notFoundMes} setState={setNotFoundMes} />

      <Title title={window.location.pathname} />
      <TablePaginated data={(tableInfo().data) || []  } column={column} search ={{searchField,setSearchField,handleSearchClicked}} setNextPageState={setCurrentPage} totalPages={tableInfo().totalPage} currPage={currentPage} rowNumber={tableInfo().studentsNum } >
        { searchField == '' ? <div>
          <SubHeaderFilterClassByGrade />
          <FilterClassByGradeI setSelectedClass={setSelectedClass} selectedClass={selectedClass} gradeId={selectedGrade?.gradeId} />
        </div> : null}
      </TablePaginated> 

    </>
  );
}
