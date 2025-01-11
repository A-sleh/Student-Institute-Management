/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { ButtonsContainerStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../shared/style/styleTag"
import { STUDENTCOLUMN } from "../TableTools/AllStudentColumns"
import { useMemo, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { INCREAMENTSTUDENTSNUMBER } from "../../../Redux/actions/type"
import { successActionLogic } from "../../shared/logic/logic"
import { useSelector, useDispatch } from "react-redux"; // test case 
import DataServices from "../../../Data/dynamic/DataServices"
import Notification from "../../Global/Notification"
import Table from "../../shared/Table"
import Title from "../../Global/Title"
import ManageStudentStatisticsHeader from "./ManageStudentStatisticsHeader"
import useGetStudentWithOutClass from "../../../hooks/student_hooks/useGetStudentWithOutClass"
import { InsertNewStudentTEXT } from "../../../Data/static/classes/ManageClass/InsertNewStudentTEXT"

export default function InsertNewStudent() {

  const {currentLange} = useSelector( state => state.language)
  const {subTitle ,addBtn ,goBackBtn ,numberOfStudentsWOR ,successAddtudentsMES ,errorInMoveStudentsMES} = InsertNewStudentTEXT[currentLange]

  // shared states
  const {studentNumber} = useSelector( state => state.studentNumber )  
  const dispatch = useDispatch() 
  // Notification States
  const [successAddStudent,setSuccessAddStudent] = useState(false) 
  // Date States
  const classDetails = JSON.parse(decodeURIComponent(useLocation().state))
  const { classId, title, capacity, students } = classDetails
  const currentStudents =   students?.length - ( students != undefined && students[0] == null) 
  const [selectedFlatRows,setSelectedFlatRows] = useState([])
  const [studentDetails] = useGetStudentWithOutClass(successAddStudent)
  // Logic States
  const [canSelectStudent,setCanSelectStudent] = useState((currentStudents != capacity))
  const gotoPage = useNavigate() 
  const boxWasChecked = useRef(0) 

  const ALLSTUDENTCOLUMNS = useMemo(() => [
      ...STUDENTCOLUMN,
      {
        id: "selection",
        Header: {
          arabic: 'تحديد' ,
          english: "select"
        },
        Cell: ({ row }) => {
          return (
            <div onChange={(e) => handleCheckBoxToggle(e.target.checked)}>
              <input type="checkbox" {...row.getToggleRowSelectedProps()}  />
            </div>
          );
        },
      },
    ],
    [successAddStudent]
  )

  function handleCheckBoxToggle(checkbox) {
    boxWasChecked.current += ( checkbox ? +1 : -1 ) ;
  
    if( ( boxWasChecked.current + currentStudents) == capacity ) {
      setCanSelectStudent(false)
    }else {
      setCanSelectStudent(true)
    }
  }

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
      resolve('done') ;
    })
  }

  function handleAddClicked(studentSelected) {
    changeStudentsClass(studentSelected).then(()=> {
      successActionLogic(setSuccessAddStudent)
    })
    dispatch({ // test case 
      type: INCREAMENTSTUDENTSNUMBER ,// test case 
      payload: studentSelected.length// test case 
    })// test case 
  }

  return (
    <>
      <Title title={window.location.pathname + `To Class - ${title}`} />
      <Notification title={successAddtudentsMES} type={'success'} state ={successAddStudent} setState={setSuccessAddStudent} />

      <ManageStudentStatisticsHeader capacity={capacity} selectedFlatRows={selectedFlatRows} currentStudents={studentNumber} allStudentsWithSelected={capacity - ( currentStudents + selectedFlatRows.length)} />

      <h3 style={{ margin: "10px 0" }}>{subTitle} </h3>
      <Table data={studentDetails} column={ALLSTUDENTCOLUMNS} preventAction={!canSelectStudent} showMainHeader={false} setSelectedRows={setSelectedFlatRows} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}} />
        {!canSelectStudent ?  <span style={{ color: "red", fontSize: "0.9em" }}>{numberOfStudentsWOR} </span> : undefined}

      <ButtonsContainerStyle >
        <SubmitBtnStyle onClick={()=>handleAddClicked(selectedFlatRows)} >{addBtn}</SubmitBtnStyle>
        <GoBackBtnStyle onClick={()=>{gotoPage(-1,{replace: true})}} >{goBackBtn}</GoBackBtnStyle>
      </ButtonsContainerStyle>

    </>
  );
}

