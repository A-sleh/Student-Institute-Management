/***  searchedStudents
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/
import {  useEffect, useMemo, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { StudentsDetailsText } from "../../Data/static/Students/StudentsInformation/StudentsDetails";
import { ALL_STUDENTS, SEARCHING_STUDENTS, STUDENT_CURRENT_PAGE, STUDENT_DATA, STUDENT_DATA_ORIGIN, STUDENT_FILTER_CLASS, STUDENT_ROWS_NUMBER, STUDENT_SEARCH_FIELD, STUDENT_TOTAL_PAGES } from "../../Redux/actions/type";
import useSyncDataLogin from "../../hooks/shared/useSyncDataLogin";
import useSyncSearchingData from "../../hooks/shared/useSyncSearchingData";

export default function StudentsDetails() {

  const LIMIT_NUMBER = 12
  const {currentLange} = useSelector( state => state.language)
  const {grade : selectedGrade} = useSelector(state => state.grade)
  const {students ,currentPage ,totalPage ,searchField ,dataOrigin ,selectedClass ,rowsNuber} = useSelector(state => state.studentsDetails)
  const {successDeleteStudentMES ,errorDeleteStudentMES} = StudentsDetailsText[currentLange]
  const [deleteModal, setDeleteModal] = useState(false);
  const [sendRequest,setSendRequest] = useState(false)
  const [successDeleteStudent, setSuccessDeleteStudent] = useState(false);
  const [unSuccessDeleteStudent, setUnSuccessDeleteStudent] = useState(false);
  const [currentStudentInfo, setCurrentStudentInfo] = useState({
    id: null,
    name: "",
  });
  const dispatch = useDispatch()
  const skipFirstRender = useRef(0)
  const [searchedStudents] = useGetStudentsByName(searchField,sendRequest,successDeleteStudent)
  const searchedStudentsMemo = useMemo(() => {    
    if(searchedStudents?.length != 0 && searchedStudents[0] != null ) { 
      setRowsNumber(searchedStudents?.length )
      return mappingClassStudents(searchedStudents) 
    }
    return [null]
  }
  ,[searchedStudents])
  const [studentsInfo] = useStudentsInfo({selectedGrade,setSelectedClass},setCurrentPage,LIMIT_NUMBER,currentPage,successDeleteStudent);
  console.log(studentsInfo)
  const { students : allStudents , totalPages } = studentsInfo
  const { finalTotalPage ,filteringStudents } = useMemo(() => tableInfo() ,[allStudents,selectedClass])
  
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

    if(selectedClass != 'all' && selectedClass?.students?.length != 0 ) {
      setCurrentPage(1)
      setRowsNumber(selectedClass?.students?.length)
      return {filteringStudents:mappingClassStudents(selectedClass?.students,selectedClass?.title) ,finalTotalPage: 1}
    }
    // all data 
    setSelectedClass('all')
    setRowsNumber(LIMIT_NUMBER)
    return {filteringStudents:allStudents ,finalTotalPage: totalPages}
  }

  function changePageState(students,totalPages,dataOringin){
    dispatch({
      type: STUDENT_DATA,
      payload: students
    })
    dispatch({
      type: STUDENT_TOTAL_PAGES,
      payload: totalPages
    })
    dispatch({
      type: STUDENT_DATA_ORIGIN,
      payload: dataOringin
    })
  }

  useSyncDataLogin(filteringStudents,students,finalTotalPage,currentPage,setCurrentPage,changePageState,{
    oringinAction: ALL_STUDENTS ,
    dataOrigin: dataOrigin
  })

  useSyncSearchingData(filteringStudents,searchedStudentsMemo,students,finalTotalPage,searchField,setCurrentPage,changePageState,{
    dataOrigin: dataOrigin,
    oringinSearch: SEARCHING_STUDENTS,
    originAll: ALL_STUDENTS
  })

  // SEATER FUNCTION 

  function setSearchField(value) {
    dispatch({
      type: STUDENT_SEARCH_FIELD,
      payload: value
    })
  }

  function setCurrentPage(value) {
    dispatch({
      type: STUDENT_CURRENT_PAGE,
      payload: value
    })
  }

  function setSelectedClass(value) {
    dispatch({
      type: STUDENT_FILTER_CLASS,
      payload: value
    })
  }

  function setRowsNumber(value) {
    dispatch({
      type: STUDENT_ROWS_NUMBER,
      payload: value
    })
  }

  useEffect(() => {
    if(skipFirstRender.current ++ ) 
      handleSearchClicked()

  },[successDeleteStudent])

  return (
    <>
      {
        deleteModal && 
        <DeleteModal element={currentStudentInfo.name} type={"student"} id={currentStudentInfo.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteStudent} setUnSuccessDelete={setUnSuccessDeleteStudent} />
      }
      <Notification title={successDeleteStudentMES} type={"success"} state={successDeleteStudent} setState={setSuccessDeleteStudent} />
      <Notification title={errorDeleteStudentMES} type={"error"} state={unSuccessDeleteStudent} setState={setUnSuccessDeleteStudent} />

      <Title title={window.location.pathname} />
      <TablePaginated data={students|| []  } column={column} search ={{searchField,setSearchField,handleSearchClicked}} setNextPageState={setCurrentPage} totalPages={totalPage} currPage={currentPage} rowNumber={rowsNuber} >
        { searchField == '' ? <div>
          <SubHeaderFilterClassByGrade />
          <FilterClassByGradeI reFrech={successDeleteStudent} setSelectedClass={setSelectedClass} selectedClass={selectedClass} gradeId={selectedGrade?.gradeId} />
        </div> : null}
      </TablePaginated> 

    </>
  );
}
