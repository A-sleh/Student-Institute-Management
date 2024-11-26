/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { ButtonsContainerStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../shared/style/styleTag.js"
import { errorActionLogic, successActionLogic } from "../../shared/logic/logic.js"
import { useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { COLUMNS } from "./../TableTools/Columns.js"
import DataServices from "../../../Data/dynamic/DataServices.js"
import Notification from "../../Global/Notification.jsx"
import Table from "../../shared/Table.jsx"

export default function StudentTable({students,setSuccessRemoveStudent,classID}) {

  const [changeStudent, setChangeStudent] = useState(false);
  const [selectedFlatRows,setSelectedFlatRows] = useState([])
  const gotoMoveingStudentsPage = useNavigate() ;
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
  )

  const studentDetails = useMemo(()=> students != undefined ? students.map((student) => {
          if(student == null ) return 
          const { name, lastName } = student;
          return {
            ...student,
            full_name: name + " " + lastName,
          };
        })
      : ''
  ,[students?.length]);

  function TheClassHasNotStudents() {
    return students == undefined || students[0] == null 
  }

  function NotSelectedRows() {
    return selectedFlatRows.length == 0 
  }

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
          resolve('done');
        }
      });
    });
  }

  function handleRemoveClicked() {
    if (NotSelectedRows()) {
      errorActionLogic(setChangeStudent)
      return;
    }

    removeStudentsFromClass().then(() => {
      successActionLogic(setSuccessRemoveStudent)
    });
  }

  function handleMoveToClicked() {

    if (NotSelectedRows()) {
      errorActionLogic(setChangeStudent)
      return;
    }

    const studentsSelectd =  selectedFlatRows.map(student => {
      return student.original ;
    })

    gotoMoveingStudentsPage(`/MoveStudentsToAnotherClass/${classID}`,{ replace: true , state: studentsSelectd });
  }

  return (
    <>
      <Notification title={"Please ,Selcet Any Student"} type={"error"} state={changeStudent} setState={setChangeStudent}/>
      {
        TheClassHasNotStudents()  ? <p style={{ color: "red", fontWeight: "400", fontSize: "16px" }}>There are no students yet ...</p> :
        <>
          <Table column={columns} data={studentDetails || []} setSelectedRows={setSelectedFlatRows} showMainHeader={false} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}} />
          <ButtonsContainerStyle>
              <SubmitBtnStyle onClick={handleRemoveClicked}>Remove</SubmitBtnStyle>
              <GoBackBtnStyle onClick={handleMoveToClicked}>Move to</GoBackBtnStyle>
          </ButtonsContainerStyle>
        </>
      }
    </>
  );
}
