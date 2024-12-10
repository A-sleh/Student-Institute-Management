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

export default function TeacherTableCurrentClass({classId}) {

    const [teachers] = useClassTeacher(classId)
    const gotoPage = useNavigate()

    const columns = useMemo(() => [
        ...TEACHERCOLUMN,
        {
          Header : 'Subjecets' ,
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
  
    return(
      <>
        {
            teachers?.length == 0 ? <span style={{ color: "red", fontWeight: "400", fontSize: "16px" }}> There are no teachers in this class yet ... </span> :
            <>
              <Table column={columns}  data={teachers} showMainHeader={false} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}} />
              <GoBackBtnStyle onClick={()=>gotoPage(`/RemoveTeachersFromClass/${classId}`)}>Remove</GoBackBtnStyle>
            </>
        }
      </>
    )
}