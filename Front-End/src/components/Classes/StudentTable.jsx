import { useMemo, useState } from "react";
import { COLUMNS } from "./TableTools/Columns.js";
import { useTable, useRowSelect } from "react-table";
import DataServices from "../../Data/dynamic/DataServices";
import Notification from "../Global/Notification.jsx";
import { useNavigate } from "react-router-dom";
import { theadThStyle } from "../Global/globalStyle.js";
import DeleteModal from "../Modal/DeleteModal.jsx";

export default function StudentTable({
  students,
  setSuccessRemoveStudent,
  classID
}) {

  const [changeStudent, setChangeStudent] = useState(false);
  const gotoMoveingStudentsPage = useNavigate() ;
  const studentDetails = useMemo(()=> students != undefined ? students.map((student) => {
          const { name, lastName } = student;
          return {
            ...student,
            full_name: name + " " + lastName,
          };
        })
      : ''
  ,[students.length]);


  const columns = useMemo(
    () => [
      ...COLUMNS,
      {
        Header : 'Selete' ,
        id: "selection",
        Cell: ({ row }) => (
          <input type="checkbox" {...row.getToggleRowSelectedProps()} />
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns: columns,
      data: studentDetails,
    },
    useRowSelect
  );

  const SelectedRows = () => {
    return selectedFlatRows.length != 0;
  };

  function removeStudentsFromClass() {
    return new Promise((resolve) => {
      selectedFlatRows.map((studentInfo, index) => {
        const student = studentInfo.original;

        const removeClassId = {
          ...student,
          class: null,
        };
        DataServices.UpdateStudent(removeClassId)
        if (index == selectedFlatRows.length - 1) {
          resolve();
        }
      });
    });
  }

  function handleRemoveClicked() {
    if (!SelectedRows()) {
      setChangeStudent(true);
      setTimeout(() => {
        setChangeStudent(false);
      }, 3000);
      return;
    }

    removeStudentsFromClass().then(() => {
      setSuccessRemoveStudent(true);
      setTimeout(() => {
        setSuccessRemoveStudent(false);
      }, 2000);
    });
  };

  const handleMoveToClicked = () => {
    if (!SelectedRows()) {
      if (!SelectedRows()) {
        setChangeStudent(true);
        setTimeout(() => {
          setChangeStudent(false);
        }, 3000);
        return;
      }
    }
    const studentsSelectd =  selectedFlatRows.map(student => {
      return student.original ;
    })
    gotoMoveingStudentsPage(`/MoveStudentsToAnotherClass/${classID}`,{ replace: true , state: studentsSelectd });

  };

  return (
    <>
      <Notification
        title={"Please ,Selcet Any Student"}
        type={"error"}
        state={changeStudent}
        setState={setChangeStudent}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "10px",
        }}
      >
        <div
          style={{ padding: "10px", width: "100%" }}
        >
          <table {...getTableProps()}>
              <thead className="thead">
                    {headerGroups.map((headerGroup, index) => (
                        <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={index}
                        className="thead-row"
                        >
                        {headerGroup.headers.map((column, index) => (
                            <th {...column.getHeaderProps()} key={index} style={theadThStyle}>
                            <span
                                style={{ marginLeft: "5px" }}
                                className="thead-cell"
                            >
                                {column.render("Header")}
                            </span>
                            </th>
                        ))}
                        </tr>
                    ))}
              </thead>
            <tbody {...getTableBodyProps()} style={{ backgroundColor: "white"}}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index}>
                    {row.cells.map((cell, index) => (
                      <td {...cell.getCellProps()} key={index} style={{padding: '10px'}}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="btns-control">
          <button onClick={handleRemoveClicked}>Remove</button>
          <button onClick={handleMoveToClicked}>Move to</button>
        </div>
      </div>
    </>
  );
}
