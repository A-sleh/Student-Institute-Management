import { useEffect, useMemo, useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import { COLUMNS } from "./TableStructuer/Columns";
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

export default function StudentsDetails() {
  const [studentInfo, setstudentInfo] = useState([]);
  const column = useMemo(() => COLUMNS, []);

  useEffect(() => {
    DataServices.StudentsInformaion().then((StudentsInfo) => {
      setstudentInfo(
        StudentsInfo.map((student) => {
          const { name, lastName } = student;
          return {
            ...student,
            full_name: name + " " + lastName,
          };
        })
      );
    });
  }, []);

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
    { data: studentInfo, columns: column },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  console.table(
    useTable({ data: studentInfo, columns: column }, usePagination)
  );

  const { globalFilter ,pageIndex } = state;
  return (
    <div>
      <Title title={window.location.pathname} />
      <TableHeader
        filter={globalFilter}
        setFilter={setGlobalFilter}
        studentNumber={rows.length}
      />
      <table {...getTableProps()} >
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
                    <i className="bi bi-arrow-up" style={{ opacity: "0" }}></i>
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
        canPreviousPage ={canPreviousPage}
        canNextPage={canNextPage}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
      />
    </div>
  );
}
