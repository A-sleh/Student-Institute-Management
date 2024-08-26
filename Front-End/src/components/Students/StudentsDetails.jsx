import { useEffect, useMemo, useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import { COLUMNS } from "./TableStructuer/Columns";
import { Link, Outlet } from "react-router-dom";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";
import "./studentStyle.css";
import Title from "../Global/Title";
import TableHeader from "./TableStructuer/TableHeader";
import TableControalSection from "./TableStructuer/TableControalSection";
import Notification from "../Global/Notification";
import DeleteModal from "../Modal/DeleteModal";

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
              to={`/StudentInformation/${row.original.id}`}
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
            className: student.class.title,
            full_name: name + " " + lastName,
          };
        })
      );
    });
  },[successDeleteStudent]);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    page,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    pageCount,
  } = useTable(
    {
      data: studentInfo,
      columns: column,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;
  return (
    <>
      {deleteModal && (
        <DeleteModal
          element={currentStudentInfo.name}
          type={"student"}
          id={currentStudentInfo.id}
          setDeleteModal={setDeleteModal}
          setSuccessDelete={setSuccessDeleteStudent}
        />
      )}
      <div>
        <Notification
          title={"student was deleted"}
          type={"success"}
          state={successDeleteStudent}
          setState={setSuccessDeleteStudent}
        />
        <Title title={window.location.pathname} />
        <TableHeader
          filter={globalFilter}
          setFilter={setGlobalFilter}
          studentNumber={rows.length}
        />
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                  >
                    {column.isSorted ? (
                      <span style={{ fontSize: "12px" }}>
                        {" "}
                        {!column.isSortedDesc ? (
                          <i className="bi bi-arrow-up"></i>
                        ) : (
                          <i className="bi bi-arrow-down"></i>
                        )}{" "}
                      </span>
                    ) : (
                      <i
                        className="bi bi-arrow-up"
                        style={{ opacity: "0" }}
                      ></i>
                    )}
                    <span style={{ marginLeft: "5px" }}>
                      {column.render("Header")}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <TableControalSection
          pageCount={pageCount}
          previousPage={previousPage}
          nextPage={nextPage}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageIndex={pageIndex}
          gotoPage={gotoPage}
        />
      </div>
    </>
  );
}
