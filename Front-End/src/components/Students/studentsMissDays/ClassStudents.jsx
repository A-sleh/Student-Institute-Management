import { useMemo, useState } from "react";
import Title from "../../Global/Title";
import Table from "../../shared/Table";
import { classStudents } from "../column/classStudents";
import { useLocation, useNavigate } from "react-router-dom";
import useGetStudentsInCurrentClass from "../../../hooks/class_hooks/useGetStudentsInCurrentClass";
import { ButtonsContainerStyle, GoBackBtnStyle, InputStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import { useSelector } from "react-redux";
import {format} from 'date-fns'
import { ARABIC } from "../../../Redux/actions/type";
import DataServices from "../../../Data/dynamic/DataServices";
import { errorActionLogic, successActionLogic } from "../../shared/logic/logic";
import Notification from "../../Global/Notification";
import { studentMissDaysTEXT } from "../../../Data/static/Students/studentsMissDays/studentMissDaysTEXT";
import useGetStudentAbsence from "../../../hooks/student_hooks/useGetStudentAbsence";


export default function ClassStudents() {

    // page language
    const {currentLange} = useSelector( state => state.language)
    const {errorInAddAbcenceToStudentMES,successAddAbcenceToStudentMES,confirmBtn,backBtn,currentStudentHasBeenTakenThierMissDayTEXT} = studentMissDaysTEXT[currentLange]
    // Get data from url
    const classDetailsEncode = useLocation().state
    const classDetailsDecode = JSON.parse(decodeURIComponent(classDetailsEncode))
    const {classId,title : classTitle} = classDetailsDecode
    // students and selected students
    const goBack = useNavigate()
    const [missedDaysDate,setMissedDaysDate] = useState(format(new Date() , 'yyyy-MM-dd'))
    // notification messages
    const [successAddAbsence,setSuccessAddAbsence] = useState(false)
    const [errorAddAbsence,setErrorAddAbsence] = useState(false)
    
    const [selectedFlatRows,setSelectedFlatRows] = useState([])
    const [students] = useGetStudentsInCurrentClass({classId,classTitle})

    // demo data to simulate the idea
    const [studentWhoGetThierMissDay] = useGetStudentAbsence(classId,missedDaysDate)
    
    const unValidInputs = () => {
      return missedDaysDate == ''|| selectedFlatRows.length == 0 ;
    }
    
    const handleAddClicked = () => {
        const studentIds = selectedFlatRows.map( row => {
          return row.original.studentId;
        })

        if(unValidInputs()) {
          errorActionLogic(setErrorAddAbsence)
          return
        }

        DataServices.StudentsAbsence(studentIds,missedDaysDate).then( res => {
          if(res.status < 300 ) {
            successActionLogic(setSuccessAddAbsence)
            setTimeout(() => goBack(-1),2000)
            return 
          }
          errorActionLogic(setErrorAddAbsence)
        })
    }

    function studentsMissDayWasTaken(studentId) {      
      return  studentWhoGetThierMissDay.indexOf(studentId) != -1
    }

    const COLULMS = useMemo(() => [
      ...classStudents ,{
        Header : {
          arabic: 'تحديد'  ,
          english: 'Select'
        } ,
        id: "selection",
        Cell: ({ row }) => {
          const {checked,onChange} = row.getToggleRowSelectedProps() 
          const studentId = row.original.studentId
          return  studentsMissDayWasTaken(studentId) ? <span style={{color: '#ff0000'}}>{currentStudentHasBeenTakenThierMissDayTEXT}</span>
                  :<input type="checkbox"  checked={checked} onChange={(e)=>onChange(e)} style={{cursor: 'pointer'}} />
        },
      },

    ],[currentLange,studentWhoGetThierMissDay,missedDaysDate])

    return (
        <>
            <Title  title={window.location.pathname} />
            <Notification title={successAddAbcenceToStudentMES} type={"success"} state={successAddAbsence} setState={setSuccessAddAbsence} />
            <Notification title={errorInAddAbcenceToStudentMES} type={"error"} state={errorAddAbsence} setState={setErrorAddAbsence} />
            <Table column={COLULMS} data={students || []}  setSelectedRows={setSelectedFlatRows}>
                <InputStyle type={'date'} value={missedDaysDate} onChange={(e) =>setMissedDaysDate(e.target.value) }/>
            </Table>
            <ButtonsContainerStyle>
                <SubmitBtnStyle onClick={()=> handleAddClicked()}>{confirmBtn }</SubmitBtnStyle>
                <GoBackBtnStyle onClick={() => goBack(-1)}>{backBtn }</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </>
    )
}