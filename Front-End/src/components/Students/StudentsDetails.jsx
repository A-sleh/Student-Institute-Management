import { useEffect, useMemo, useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import { COLUMNS } from "./TableStructuer/Columns";
import { useTable } from "react-table";
import './studentStyle.css'

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
  
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ data: studentInfo, columns: column });

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup , index ) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index }>
              {headerGroup.headers.map((column , index) => (
                <th {...column.getHeaderProps()} key={index}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row , index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell , index ) => (
                  <td {...cell.getCellProps()} key={index}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
