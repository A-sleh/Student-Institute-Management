/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GoBackBtnStyle } from "../../shared/style/styleTag.js";
import {COLUMNS} from '../TableTools/Columns.js'
import { useMemo, useState } from "react";
import Title from "../../Global/Title.jsx";
import ClassBox from "./ClassBox.jsx";
import Table from "../../shared/Table.jsx";

export default function MoveStudentsToAnotherClass() {

const [selectedStudents , setSelectedStudents] = useState(useLocation().state)
const gotoManageClasses = useNavigate()
const currentClass = useParams().classId 

const ALLSTUDENTCOLUMNS = useMemo(() => [
    ...COLUMNS,
    {
        id: "selection",
        Header: "select",
        Cell : ({row}) => {
            return <i className="fa-regular fa-trash-can delete remove-student-btn" onClick={()=>handleRemoveStudentClicked(row.original.studentId)}></i>
        }
    },
],[selectedStudents])

function handleRemoveStudentClicked(studentID) {
    const newSelectedStudents = selectedStudents.filter( student => {
        return (student.studentId != studentID ); 
    })
    setSelectedStudents(newSelectedStudents) ;
}

return (
    <>
        <Title title={window.location.pathname }/>
        <h3 style={{ margin: "5px 0" }}>Selected Studnets </h3>
        <Table data={selectedStudents} column={ALLSTUDENTCOLUMNS} showMainHeader={false} hiddenHeader={true} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}} />
        <h3 style={{ margin: "5px 0" }}>Choose a class that you want to transfer students to him</h3>
        <ClassBox currentClass={currentClass} numberOfSelectedStudents={selectedStudents?.length} selectedStudents={selectedStudents} />
        <GoBackBtnStyle onClick={()=>{ gotoManageClasses('/ManageClasses',{replace: true})}}>Go Back</GoBackBtnStyle>
    </>
)
}
