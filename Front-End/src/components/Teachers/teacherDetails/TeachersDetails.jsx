
/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { SubHeaderTableStyle } from "../../shared/style/tableTagsStyle";
import { useEffect, useMemo, useState } from "react";
import { COLUMNS } from "../columns/Columns";  
import { Link, useNavigate } from "react-router-dom";
import Title from "../../Global/Title";
import Notification from "../../Global/Notification";
import DeleteModal from "../../Modal/DeleteModal";
import TablePaginated from "../../shared/TablePaginated";
import useTeachersInfo from "../../../hooks/teacher_hooks/useTeachersInfo";
import { TeachersDetailsTEXT } from "../../../Data/static/teachers/teachersDetails/TeachersDetailsTEXT";
import { useDispatch, useSelector } from "react-redux";
import useGetTeacherByName from "../../../hooks/teacher_hooks/useGetTeacherByName";
import { errorActionLogic } from "../../shared/logic/logic";
import { ALL_TEACHER, CHANGE_CURRENT_PAGE_DETAILS, NUMBER_ROWS_DETAILS, SEARCHING_TEACHER, SEARCHING_TEACHER_DETAILS, TEACHER_COUNT_DETAILS, TEACHER_SOURCE_DETAILS, TEACHERS_DETAILS, TOTAL_PAGES_DETAILS } from "../../../Redux/actions/type";

export default function TeachersDetails() {

  const LIMIT_NUMBER = 12
  const x = useSelector( state => state.teacherDetailsPage)
  console.log(x)
  const {numberOfTeachers,searchField,currentPage,numberOfRows, totalPages ,teachers : showingTeachers ,dataFrom} = useSelector( state => state.teacherDetailsPage)
  const {currentLange} = useSelector( state => state.language)
  const {isAdmin} = useSelector( state => state.admin)
  const {totalTeachersTitle ,successDeleteTeacherMES  ,errorDeleteTeacherMES,notFoundMES,unAutherizedMES} = TeachersDetailsTEXT[currentLange]
  
  const goTo = useNavigate()
  const changeState = useDispatch()
  const [deleteModal, setDeleteModal] = useState(false)
  const [successDeleteTeacher,setSuccessDeleteTeacher] = useState(false)
  const [unAutherized,setUnAutherized] = useState(false)
  const [NotDeletTeacher, setNotDeleteTeacher] = useState(false);
  // const [currentPage,setCurrentPage] = useState(1)
  const [sendRequest,setSendRequest] = useState(false)
  const [teachersInfo,notFoundMes,setNotFoundMes] = useGetTeacherByName(searchField,sendRequest)

  const [teachers] = useTeachersInfo(LIMIT_NUMBER,currentPage,successDeleteTeacher)
  const { teachers : allTeachers , totalPages : totalPageOfAllTeachers , totalTeachers : totalNumberOfAllTeachers} = teachers

  const [currentStudentInfo, setCurrentStudentInfo] = useState({
      id: null,
      name: "",
  });

  const column = useMemo(() => [
    ...COLUMNS ,
    {
      Header: "Action",
      id: "selection",
      Cell: ({ row }) => (
        <div style={{ justifyContent: "space-evenly", display: "flex", fontSize: "20px", alignItems: "center" }} >
          <span
            style={{ color: "gray", cursor: "pointer" }}
            onClick={() => handleClickedOnMoreTeacherDetails(row.original.teacherId)}
          >
            <i className="bi bi-person-lines-fill"></i>
          </span>
          <Link
            to={`/UpdateTeacher/${row.original.teacherId}?data=${encodeURIComponent(JSON.stringify(row.original) )}`}
            style={{ color: "rgb(0 76 255 / 85%)", cursor: "pointer" }}
          >
            <i className="bi bi-person-gear"></i>
          </Link>
          <Link onClick={() => { handleDleteClicked(row.original) }} style={{ color: "#ff0000d9", cursor: "pointer" }} >
            <i className="bi bi-person-dash"></i>
          </Link>
        </div>
      ),
    },
  ], [isAdmin])

  useEffect(() => {

    if(allTeachers?.length == 0 || allTeachers == undefined ) return 

    if(showingTeachers?.length == 0 ) {
      dispatchTeacherInfo(allTeachers,totalPageOfAllTeachers,LIMIT_NUMBER,totalNumberOfAllTeachers,ALL_TEACHER)
      setCurrentPage(1)
      return 
    }

    if(dataFrom == ALL_TEACHER && showingTeachers.length != 0 ) {
      dispatchTeacherInfo(allTeachers  ,totalPageOfAllTeachers,LIMIT_NUMBER,totalNumberOfAllTeachers,ALL_TEACHER)
      return 
    }
  
  },[currentPage,allTeachers]) 

  useEffect(() => {
    // to advoid set undefine teachers when the user return from searching and the search input not empyt
    if(showingTeachers?.length != 0 && searchField != '' && teachersInfo == null ) {
        return 
    }
    if(searchField != '' && teachersInfo?.length != 0 ) {
        dispatchTeacherInfo(teachersInfo,1,teachersInfo?.length,teachersInfo?.length,SEARCHING_TEACHER)
        setCurrentPage(1)
        return 
    }
    if(dataFrom == SEARCHING_TEACHER && searchField == '' ) {
      dispatchTeacherInfo(allTeachers,totalPageOfAllTeachers,LIMIT_NUMBER,totalNumberOfAllTeachers,ALL_TEACHER)
      setCurrentPage(1)
      return 
    }
  },[allTeachers,searchField,teachersInfo]) 

  function dispatchTeacherInfo(teachers,totalPages,rowsNumber,teachersNumber,mode) {
      changeState({
          type: TOTAL_PAGES_DETAILS , 
          payload: totalPages
      })
      changeState({
          type: TEACHERS_DETAILS , 
          payload: teachers
      })
      changeState({
          type: TEACHER_SOURCE_DETAILS , 
          payload: mode
      })
      changeState({
          type: NUMBER_ROWS_DETAILS , 
          payload: rowsNumber
      })
      changeState({
          type: TEACHER_COUNT_DETAILS , 
          payload: teachersNumber
      })
  }

  function setCurrentPage(value) {
    changeState({
      type: CHANGE_CURRENT_PAGE_DETAILS , 
      payload: value
    })
  }

  function handleClickedOnMoreTeacherDetails(teacherID) {

    if(isAdmin) 
      goTo(`/TeacherInformation/${teacherID}`)
    else 
      errorActionLogic(setUnAutherized)
  }

  function handleDleteClicked(teacher) {
      setCurrentStudentInfo({
        name: `${teacher.name} ${teacher.lastName}`,
        id: teacher.teacherId,
      });
      setDeleteModal(true);
  }

  function handleSearchClicked() {
    setSendRequest(true)
    setTimeout(()=> setSendRequest(false),200)
  }
  
  function setSearchField(value) {
    changeState({
      type: SEARCHING_TEACHER_DETAILS ,
      payload: value
    })
  }

  return(
      <>
          <Notification  title={successDeleteTeacherMES} type={'success'} state ={successDeleteTeacher} setState={setSuccessDeleteTeacher} />
          <Notification  title={errorDeleteTeacherMES} type={'error'} state ={NotDeletTeacher} setState={setNotDeleteTeacher} />
          <Notification  title={notFoundMES} type={'error'} state ={notFoundMes} setState={setNotFoundMes} />
          <Notification  title={unAutherizedMES} type={'error'} state ={unAutherized} setState={setUnAutherized} />
          { 
            deleteModal && 
            <DeleteModal element={currentStudentInfo.name} type={"Teacher"} id={currentStudentInfo.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteTeacher} setUnSuccessDelete={setNotDeleteTeacher} />
          }
          <Title title={window.location.pathname} /> 

          <TablePaginated data={showingTeachers || [] } column={column} search ={{searchField,setSearchField,handleSearchClicked}} setNextPageState={setCurrentPage} totalPages={totalPages} currPage={currentPage} rowNumber={numberOfRows}>
            <SubHeaderTableStyle >
              {totalTeachersTitle} : <span>{numberOfTeachers || 0 }</span>
            </SubHeaderTableStyle>
          </TablePaginated>
      </>
  )
}