/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { useEffect, useMemo, useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import { COLUMNS } from "./TableStructuer/Columns";
import { Link, Outlet } from "react-router-dom";
import Title from "../Global/Title";
import Notification from "../Global/Notification";
import DeleteModal from "../Modal/DeleteModal";
import TablePaginated from "../shared/TablePaginated";
import { SubHeaderTableStyle } from "../shared/style/tableTagsStyle";

export default function StudentsDetails() {


  const [deleteModal, setDeleteModal] = useState(false);
  const [successDeleteStudent, setSuccessDeleteStudent] = useState(false);
  const [currentStudentInfo, setCurrentStudentInfo] = useState({
    id: null,
    name: "",
  });
  const [studentInfo, setstudentInfo] = useState([]);


  function handleDleteClicked(student) {
    setCurrentStudentInfo({
      name: `${student.name} ${student.lastName}`,
      id: student.studentId,
    });
    setDeleteModal(true);
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

  useEffect(() => {
    DataServices.StudentsInformaion().then((StudentsInfo) => {
      setstudentInfo(
        StudentsInfo.map((student) => {
          const { name, lastName } = student;
          return {
            ...student,
            className: student.class?.title,
            full_name: name + " " + lastName,
          };
        })
      );
    });
  },[successDeleteStudent]);
  
  return (
    <>
      {
        deleteModal && 
        <DeleteModal element={currentStudentInfo.name} type={"student"} id={currentStudentInfo.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteStudent} />
      }
      <Notification title={"student was deleted"} type={"success"} state={successDeleteStudent} setState={setSuccessDeleteStudent} />

      <Title title={window.location.pathname} />

      <TablePaginated data={studentInfo || []} column={column}>
        <SubHeaderTableStyle >
          Total Students Number : <span>{studentInfo?.length || 0 }</span>
        </SubHeaderTableStyle>
      </TablePaginated> 

    </>
  );
}
