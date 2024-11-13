
/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { SubHeaderTableStyle } from "../../shared/style/tableTagsStyle";
import {  useMemo, useState } from "react";
import { COLUMNS } from "../columns/Columns";  
import { Link } from "react-router-dom";
import Title from "../../Global/Title";
import Notification from "../../Global/Notification";
import DeleteModal from "../../Modal/DeleteModal";
import TablePaginated from "../../shared/TablePaginated";
import useTeachersInfo from "../../../hooks/useTeachersInfo";

export default function TeachersDetails() {

    const [teachersDetails] = useTeachersInfo()
    const [deleteModal, setDeleteModal] = useState(false);
    const [successDeleteTeacher,setSuccessDeleteTeacher] = useState(false)
    const [NotDeletTeacher, setNotDeleteTeacher] = useState(false);
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
              to={`/UpdateTeacher/${row.original.id}?data=${encodeURIComponent(JSON.stringify(row.original) )}`}
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

    return(
        <>
            <Notification  title={'Delete Theacer'} type={'success'} state ={successDeleteTeacher} setState={setSuccessDeleteTeacher} />
            <Notification  title={'Teacher is teaching in one of the classes.'} type={'error'} state ={NotDeletTeacher} setState={setNotDeleteTeacher} />
            { 
              deleteModal && 
              <DeleteModal element={currentStudentInfo.name} type={"Teacher"} id={currentStudentInfo.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteTeacher} setUnSuccessDelete={setNotDeleteTeacher} />
            }
            <Title title={window.location.pathname} /> 

            <TablePaginated data={teachersDetails || []} column={column}>
              <SubHeaderTableStyle >
                Total Teachers Number : <span>{teachersDetails?.length || 0 }</span>
              </SubHeaderTableStyle>
            </TablePaginated>
        </>
    )
}