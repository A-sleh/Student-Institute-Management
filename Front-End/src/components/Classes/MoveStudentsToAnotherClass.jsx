import { useLocation, useNavigate, useParams } from "react-router-dom";
import {COLUMNS} from './TableTools/Columns.js'
import Title from "../Global/Title";
import { useTable } from "react-table";
import { useMemo, useState } from "react";
import ClassBox from "./ClassBox.jsx";


export default function MoveStudentsToAnotherClass() {

const [selectedStudents , setSelectedStudents] = useState(useLocation().state)
const gotoManageClasses = useNavigate();
const currentClass = useParams().classId ;

const ALLSTUDENTCOLUMNS = useMemo(
    () => [
        ...COLUMNS,
        {
            id: "selection",
            Header: "select",
            Cell : ({row}) => {
                return <i className="fa-regular fa-trash-can delete remove-student-btn" onClick={()=>handleRemoveStudentClicked(row.original.studentId)}></i>
            }
        },
    ],
    [selectedStudents]
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
        data: selectedStudents,
    }
    );

    function handleRemoveStudentClicked(studentID) {
        const newSelectedStudents = selectedStudents.filter( student => {
            return (student.studentId != studentID ); 
        })
        setSelectedStudents(newSelectedStudents) ;
    }

return (
    <>
        <Title title={window.location.pathname }/>
        <div style={{ backgroundColor: "#dddddd70",padding: "10px",borderRadius: "5px",}} >
            <h3 style={{ margin: "5px 0" }}>Selected Studnets </h3>
            <table {...getTableProps()} className="table" style={{backgroundColor: 'white' }}>
                <tbody {...getTableBodyProps()} className="tbody">
            {rows.map((row, index) => {
                prepareRow(row);
                return (
                <tr
                    {...row.getRowProps()}
                    key={index}
                    style={{ padding: "5px" }}
                >
                    {row.cells.map((cell, index) => (
                    <td {...cell.getCellProps()} key={index} style={{padding: '5px'}}>
                        {cell.render("Cell")}
                    </td>
                    ))}
                </tr>
                );
            })}
                </tbody>
            </table>
        </div>
        <div style={{ backgroundColor: "#dddddd70",padding: "10px",borderRadius: "5px", margin: '20px 0'}} >
            <h3 style={{ margin: "5px 0" }}>Choose a class that you want to transfer students to him</h3>
            <ClassBox currentClass={currentClass} numberOfSelectedStudents={selectedStudents?.length} selectedStudents={selectedStudents} />
        </div>
        <button style={{padding : '4px 10px' , backgroundColor: 'red' , color: 'white' , border: 'none' , outline: 'none' , borderRadius: '4px' , cursor: 'pointer'}} onClick={()=>{
            gotoManageClasses('/ManageClasses',{replace: true})
        }}>Go Back</button>
    </>
)
}
