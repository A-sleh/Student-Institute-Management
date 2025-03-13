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


export default function ClassStudents() {

    // page language
    const {currentLange} = useSelector( state => state.language)
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
    const [students] = useGetStudentsInCurrentClass({classId,classTitle},)
    
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
          successActionLogic(setSuccessAddAbsence)
          goBack(-1)
        })
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
          return <input type="checkbox"  checked={checked} onChange={(e)=>onChange(e)} />
        },
      },

    ],[])

    return (
        <>
            <Title  title={window.location.pathname} />
            <Notification title={currentLange == ARABIC ? 'تم إضافة تفقد للطلاب': 'Add Absecnce to students'} type={"success"} state={successAddAbsence} setState={setSuccessAddAbsence} />
            <Notification title={currentLange == ARABIC ? 'يجب تحديد التاريخ مع بعض الطلاب' : 'Select the data ,and some of students'} type={"error"} state={errorAddAbsence} setState={setErrorAddAbsence} />
            <Table column={COLULMS} data={students || []}  setSelectedRows={setSelectedFlatRows}>
                <InputStyle type={'date'} value={missedDaysDate} onChange={(e) =>setMissedDaysDate(e.target.value) }/>
            </Table>
            <ButtonsContainerStyle>
                <SubmitBtnStyle onClick={()=> handleAddClicked()}>{currentLange == ARABIC ? 'تأكيد': "Apply" }</SubmitBtnStyle>
                <GoBackBtnStyle onClick={() => goBack(-1)}>{currentLange == ARABIC ? 'عوده': "Back" }</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </>
    )
}