
/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { SubHeaderTableStyle } from "../../shared/style/tableTagsStyle";
import {  useEffect, useMemo, useState } from "react";
import { COLUMNS } from "../columns/Columns";  
import { Link } from "react-router-dom";
import Title from "../../Global/Title";
import Notification from "../../Global/Notification";
import DeleteModal from "../../Modal/DeleteModal";
import TablePaginated from "../../shared/TablePaginated";
import useTeachersInfo from "../../../hooks/teacher_hooks/useTeachersInfo";
import { TeachersDetailsTEXT } from "../../../Data/static/teachers/teachersDetails/TeachersDetailsTEXT";
import { useSelector } from "react-redux";
import useGetTeacherByName from "../../../hooks/teacher_hooks/useGetTeacherByName";

export default function TeachersDetails() {

  const {currentLange} = useSelector( state => state.language)
  const {totalTeachersTitle ,successDeleteTeacherMES  ,errorDeleteTeacherMES} = TeachersDetailsTEXT[currentLange]
  const [deleteModal, setDeleteModal] = useState(false);
  const [successDeleteTeacher,setSuccessDeleteTeacher] = useState(false)
  const [NotDeletTeacher, setNotDeleteTeacher] = useState(false);
  const [currentPage,setCurrentPage] = useState(1)
  const limitNumber = 12
  const [sendRequest,setSendRequest] = useState(false)
  const [searchField,setSearchField] = useState('')
  const [teachersInfo] = useGetTeacherByName(searchField,sendRequest)
  const [teachers] = useTeachersInfo(limitNumber,currentPage,successDeleteTeacher)
  const { teachers : teachersDetails , totalPages, totalTeachers} = teachers

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
          <Link
            to={`/TeacherInformation/${row.original.teacherId}`}
            style={{ color: "gray", cursor: "pointer" }}
          >
            <i className="bi bi-person-lines-fill"></i>
          </Link>
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
  ], [])

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
  
  function tableInfo() {
    // data comes from search field
    
    if(searchField != '' && teachersInfo.length != 0 ) {
      return {
        data: teachersInfo ,
        teacherNumPerRow: teachersInfo.length ,
        totalTeacher: teachersInfo.length,
        totalPage: 1 
      }
    }
    // all data 
    return {
      data: teachersDetails ,
      teacherNumPerRow: 15 ,
      totalTeacher: totalTeachers,
      totalPage: totalPages
    } 
  }
  

  return(
      <>
          <Notification  title={successDeleteTeacherMES} type={'success'} state ={successDeleteTeacher} setState={setSuccessDeleteTeacher} />
          <Notification  title={errorDeleteTeacherMES} type={'error'} state ={NotDeletTeacher} setState={setNotDeleteTeacher} />
          { 
            deleteModal && 
            <DeleteModal element={currentStudentInfo.name} type={"Teacher"} id={currentStudentInfo.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteTeacher} setUnSuccessDelete={setNotDeleteTeacher} />
          }
          <Title title={window.location.pathname} /> 

          <TablePaginated data={tableInfo().data || []} column={column} search ={{searchField,setSearchField,handleSearchClicked}} setNextPageState={setCurrentPage} totalPages={tableInfo().totalPage} currPage={currentPage} rowNumber={tableInfo().teacherNumPerRow}>
            <SubHeaderTableStyle >
              {totalTeachersTitle} : <span>{tableInfo().totalTeacher || 0 }</span>
            </SubHeaderTableStyle>
          </TablePaginated>
      </>
  )
}