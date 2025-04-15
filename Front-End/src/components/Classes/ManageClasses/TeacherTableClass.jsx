/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { GoBackBtnStyle } from "../../shared/style/styleTag";
import { TEACHERCOLUMN } from "./../TableTools/TeacherColumn";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../shared/Table";
import useClassTeacher from "../../../hooks/class_hooks/useClassTeacher";
import { useDispatch, useSelector } from "react-redux";
import { ManageClassesTEXT } from "../../../Data/static/classes/ManageClass/ManageClassesTEXT";
import { CLASS_SECTION } from "../../../Redux/actions/type";

export default function TeacherTableCurrentClass({classId}) {

  const {currentLange} = useSelector( state => state.language)
  const {removeBtn , noTeachersWOR  } = ManageClassesTEXT[currentLange]

  const [teachers] = useClassTeacher(classId)
  const determainParentClass = useDispatch()
  const gotoPage = useNavigate()

  const columns = useMemo(() => [
      ...TEACHERCOLUMN,
      {
        Header : {
          arabic: 'مواد الأستاذ' ,
          english: 'Subjecets' 
        },
        accessor: "teacherSubject",
        Cell : ({value}) => {
          return (
            <div style={{ display: 'flex' ,gap: '3px' , justifyContent: 'center'}}>
              {
                value.map( (subject,index) => <span key={index} style={{fontSize: '13px',padding: '2px 5px' , borderRadius: '2px' , color: 'white' , backgroundColor: '#056699'}}>{subject.subject.subject}</span>)
              }                  
            </div>
          )
        }
      }
  ],[]);

  const handleRemoveTeachersClicked = () => {
    determainParentClass({
      type: CLASS_SECTION ,
      payload: classId
    })
    gotoPage(`/RemoveTeachersFromClass/${classId}`)
  }

  return(
    <>
      {
          teachers?.length == 0 ? <span style={{ color: "red", fontWeight: "600", fontSize: "16px" }}>{noTeachersWOR}</span> :
          <>
            <Table column={columns}  data={teachers} showMainHeader={false} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}} />
            <GoBackBtnStyle onClick={()=>handleRemoveTeachersClicked()}>{removeBtn}</GoBackBtnStyle>
          </>
      }
    </>
  )
}