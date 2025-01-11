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
    
    const [selectedFlatRows,setSelectedFlatRows] = useState([])
    const [students] = useGetStudentsInCurrentClass({classId,classTitle},)
    

    const COLULMS = useMemo(() => [
      ...classStudents ,{
        Header : {
          arabic: 'تحديد'  ,
          english: 'Select'
        } ,
        id: "selection",
        Cell: ({ row }) => (
          <input type="checkbox" {...row.getToggleRowSelectedProps()} />
        ),
      },

    ],[])

    return (
        <>
            <Title  title={window.location.pathname} />
            <Table column={COLULMS} data={students || []}  setSelectedRows={setSelectedFlatRows}>
                <InputStyle type={'date'} value={missedDaysDate} onChange={(e) =>setMissedDaysDate(e.target.value) }/>
            </Table>
            <ButtonsContainerStyle>
                <SubmitBtnStyle>{currentLange == ARABIC ? 'تأكيد': "Apply" }</SubmitBtnStyle>
                <GoBackBtnStyle onClick={() => goBack(-1)}>{currentLange == ARABIC ? 'عوده': "Back" }</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </>
    )
}