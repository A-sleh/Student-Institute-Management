import { useMemo, useState } from "react";
import { COLUMNS } from "./TableTools/Columns.js";
import { useTable, useRowSelect } from "react-table";
import DataServices from "../../Data/dynamic/DataServices";
import Notification from "../Global/Notification.jsx";

export default function StudentTable({
  students,
  setSuccessRemoveStudent,
}) {

  console.log("re-render Student Table component : " ,students );

  const [changeStudent, setChangeStudent] = useState(false);

  const studentDetails = students != undefined ? students.map((student) => {
          const { name, lastName } = student;
          return {
            ...student,
            full_name: name + " " + lastName,
          };
        })
      : '';


  const columns = useMemo(
    () => [
      ...COLUMNS,
      {
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
          class: {
            ...student.class,
            classId: null,
          },
        };
        DataServices.UpdateStudent(removeClassId);
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
          style={{ padding: "10px", backgroundColor: "white", width: "100%" }}
        >
          <table {...getTableProps()}>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
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
        </div>
        <div className="btns-control">
          <button onClick={handleRemoveClicked}>Remove</button>
          <button onClick={handleMoveToClicked}>Move to</button>
        </div>
      </div>
    </>
  );
}
