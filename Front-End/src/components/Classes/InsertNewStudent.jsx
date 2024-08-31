import { COL } from "./TableTools/AllStudentColumns";
import Title from "../Global/Title";
import { useLocation, useNavigate } from "react-router-dom";
import { useTable, useRowSelect} from "react-table";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import Notification from "../Global/Notification";


export default function InsertNewStudent() {

  const gotoThePreviousPage = useNavigate(); // this is important to move to previous page
  const [successAddStudent,setSuccessAddStudent] = useState(false) ;
  const classDetails = useLocation().state; // this is important ==> to get class details  
  const { classId, title, capacity, students } = classDetails; // this is important
  const [studentDetails, setStudentDetails] = useState([]); // this important ==> to Data of table
  const currentStudents =   students?.length - ( students != undefined && students[0] == null) ; // total students in the class
  const [canSelectStudent,setCanSelectStudent] = useState((currentStudents != capacity)); // this is important ==> to prevent user from select rows
  const boxWasChecked = useRef(0) ;
  
  const ALLSTUDENTCOLUMNS = useMemo(
    () => [
      ...COL,
      {
        id: "selection",
        Header: "select",
        Cell: ({ row }) => {
          return (
            <div onChange={(e) => handleCheckBoxToggle(e.target.checked)}>
              <input
                type="checkbox"
                {...row.getToggleRowSelectedProps()}
                className="check-box"
              />
            </div>
          );
        },
      },
    ],
    [successAddStudent]
  );
  
  const {
    headerGroups,
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns: ALLSTUDENTCOLUMNS,
      data: studentDetails,
    },
    useRowSelect
  );
  useEffect(() => {
    DataServices.StudentsInformaion().then((students) => {
      const filterStudents = students
        .filter((student) => {
          return student.class == null || student.class?.classId == null;
        })
        .map((student) => {
          const { name, lastName } = student;
          return {
            ...student,
            className: student.class?.title,
            full_name: name + " " + lastName,
          };
        });
      setStudentDetails(filterStudents);
    });
  }, [successAddStudent]);

  function handleCheckBoxToggle(checkbox) {
    boxWasChecked.current += ( checkbox ? +1 : -1 ) ;
    
    if( ( boxWasChecked.current + currentStudents) == capacity ) {
      setCanSelectStudent(false);
    }else {
      setCanSelectStudent(true)
    }
  };

function changeStudentsClass(studentSelected) {
  return new Promise((resolve) => {
    studentSelected.map( student => {
      const studnetInfo = student.original ; 
      const newStudent = {
        ...studnetInfo,
        class: {
          classId : classId
        }
      }
      DataServices.UpdateStudent(newStudent)
    })
    resolve() ;
  })
}

  function handleAddClicked(studentSelected) {
    changeStudentsClass(studentSelected).then(()=> {
      setSuccessAddStudent(true) ; 
      setTimeout(() => {
        setSuccessAddStudent(false);
      } ,2000 )
    })
  }

  return (
    <>
      <Title title={window.location.pathname + `To Class - ${title}`} />
      <Notification title={'Add Studnets to the Class'} type={'success'} state ={successAddStudent} setState={setSuccessAddStudent} />
      <div className="insert-new-student">
        <NaveBar
          capacity={capacity}
          selectedFlatRows={selectedFlatRows}
          currentStudents={currentStudents}
          allStudentsWithSelected={capacity - ( currentStudents + selectedFlatRows.length)}
        />
        <div
          style={{
            backgroundColor: "#dddddd70",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ margin: "10px 0" }}>Students Without Class </h3>
          <table
            {...getTableProps()}
            className={ canSelectStudent ?  "table": "class-full table" }
          >
            <thead className="thead">
              {headerGroups.map((headerGroup, index) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={index}
                  className="thead-row"
                >
                  {headerGroup.headers.map((column, index) => (
                    <th {...column.getHeaderProps()} key={index}>
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
            <tbody {...getTableBodyProps()} className="tbody">
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={index}
                    style={{ padding: "3px" }}
                  >
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="buttons-controal">
            <button
              disabled={selectedFlatRows.length == 0}
              onClick={() => handleAddClicked(selectedFlatRows)}
            >
              Add
            </button>
            <button
              onClick={() => {
                gotoThePreviousPage("/ManageClasses", { replace: true });
              }}
            >
              Go Back
            </button>
          </div>
          {!canSelectStudent ? (
            <span style={{ color: "red", fontSize: "13px" }}>
              Don't you can choose more students ,Class become a full
            </span>
          ): undefined}
        </div>
      </div>
    </>
  );
}

function NaveBar(props) {
  const {
    capacity,
    selectedFlatRows,
    currentStudents,
    allStudentsWithSelected,
  } = props;
  return (
    <nav
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#066599",
        margin: "20px 0",
        borderRadius: "5px",
        color: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <span>
        Class Capacity : <b>{capacity}</b>
      </span>
      <span>
        You Can Select <b>{allStudentsWithSelected}</b> Students Just
      </span>
      <span>
        Number Of Seleted Student <b>{selectedFlatRows.length}</b>
      </span>
      <span>
        Number Of Students In a Class <b>{currentStudents}</b>
      </span>
    </nav>
  );
}
