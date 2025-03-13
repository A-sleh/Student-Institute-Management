/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { ButtonsContainerStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../shared/style/styleTag.js"
import { errorActionLogic, successActionLogic } from "../../shared/logic/logic.js"
import { useNavigate } from "react-router-dom"
import React, { useMemo, useState } from "react"
import { COLUMNS } from "./../TableTools/Columns.js"
import DataServices from "../../../Data/dynamic/DataServices.js"
import Notification from "../../Global/Notification.jsx"
import Table from "../../shared/Table.jsx"
import { ManageClassesTEXT } from "../../../Data/static/classes/ManageClass/ManageClassesTEXT.js"
import { useSelector } from "react-redux"

export default function StudentTable({students,setSuccessRemoveStudent,classID}) {

  const {currentLange} = useSelector( state => state.language)
  const {removeBtn ,errorInMoveStudentsMES, noStudentsWOR ,moveToBtn } = ManageClassesTEXT[currentLange]

  const [changeStudent, setChangeStudent] = useState(false);
  const [selectedFlatRows,setSelectedFlatRows] = useState([])
  const gotoMoveingStudentsPage = useNavigate() ;
  const columns = useMemo(
    () => [
      ...COLUMNS,
      {
        Header : {
          arabic: 'تحديد'  ,
          english: 'Select'
        } ,
        id: "selection",
        Cell: ({ row }) => {
          const {checked,onChange} = row.getToggleRowSelectedProps() 
          return <input type="checkbox"  checked={checked} onChange={(e)=>onChange(e)} />
        },
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
      <Notification title={errorInMoveStudentsMES} type={"error"} state={changeStudent} setState={setChangeStudent}/>
      {
        TheClassHasNotStudents()  ? <span style={{ color: "red", fontWeight: "400", fontSize: "16px" }}>{noStudentsWOR}</span> :
        <>
          <Table column={columns} data={studentDetails || []} setSelectedRows={setSelectedFlatRows} showMainHeader={false} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}} />
          <ButtonsContainerStyle>
              <SubmitBtnStyle onClick={handleRemoveClicked}>{removeBtn}</SubmitBtnStyle>
              <GoBackBtnStyle onClick={handleMoveToClicked}>{moveToBtn}</GoBackBtnStyle>
          </ButtonsContainerStyle>
        </>
      }
    </>
  );
}


