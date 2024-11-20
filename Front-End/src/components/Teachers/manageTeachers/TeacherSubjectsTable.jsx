/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { successActionLogic } from "../../shared/logic/logic.js";
import { useMemo, useRef, useState } from "react";
import { ButtonsContainerStyle } from "../../shared/style/styleTag.js";
import { SUBJECTMANAGECOLUMN } from "../columns/SubjectManageColumn.js";
import { useEffect } from "react";
import DataServices from "../../../Data/dynamic/DataServices.js";
import Notification from "../../Global/Notification.jsx";
import DeleteModal from "../../Modal/DeleteModal.jsx";
import useTeacherSubjects from "../../../hooks/useTeacherSubjects.jsx";
import Table from "../../shared/Table.jsx";

export default function TeacherSubjectsTable({teacherId,setSuccessDeleteFromSubject,successDeleteFromSubject}) {

    const salaryInput = useRef(null)    
    const [_,setReRender] = useState(0)
    // Notification states
    const [successUpdataSalary,setSuccessUpdataSalary] = useState(false)
    const [successDeleteSubject,setSuccessDeleteSubject] = useState(false)
    const [errorDeleteSubject,setErrorDeleteSubject] = useState(false)
    const [deletModal,setDeleteModal] = useState(false)
    // data states
    const [subjects] = useTeacherSubjects(teacherId,successDeleteFromSubject,successUpdataSalary) ;
    const [salary,setSalary] = useState('')
    const [updateBtn,setUpdataBtn] = useState(null) ;
    const [currentSubject,setCurrentSubject] = useState({
      id : '',
      title : ""
    })

    const columns = useMemo(() => [
        ...SUBJECTMANAGECOLUMN,
        {   
            Header: 'Salary' ,
            accessor: 'salary',
            Cell : ({row}) => {
              return  updateBtn == row.id ? <input type='text' style={{ border: 'none' , outline: 'none' , borderBottom : '1px solid #066599' , textAlign: 'center', backgroundColor: 'transparent' }}
              value={salary} onChange={(e) => setSalary(e.target.value)} ref={salaryInput}/> : row.original.salary
            }
        },
        {
            Header : 'Actions' ,
            id : 'selection' ,
            Cell : ({row}) => {
              return ( 
                <div style={{ display: "flex", alignItems: "center", justifyContent: 'flex-end' , paddingRight: '20px' }}>
                    <i className="bi bi-trash" onClick={()=>{handleDeleteClicked(row.original)}} style={{ color: "gray", cursor: "pointer" ,fontSize: '16px' ,marginRight: '2em',color: 'red' }}></i>
                    {
                      updateBtn == row.id ?
                        <ButtonsContainerStyle>
                          <button onClick={()=>handleApplyClicked(row.original)} style={{padding: '2px 8px' , fontSize: '11px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: '#009744' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>Apply</button>
                          <button onClick={()=>{setUpdataBtn(null)}} style={{padding: '2px 8px' , fontSize: '11px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: 'red' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>Cancel</button>
                        </ButtonsContainerStyle>
                      : <i className="bi bi-sliders2" style={{ color: "gray", cursor: "pointer" ,fontSize: '16px' , color: 'gray' }} onClick={()=> {handleUpdataBtnClicked(row)}}></i>
                    }
                </div>
            )}
        }
    ],[updateBtn,salary])

    // to keep focus on the input field
    useEffect(()=>{setReRender(1)},[salary])

    function handleApplyClicked(details) {
      DataServices.UpdataSubjectSalary(teacherId,details.subject.subjectId,salary).then(res=> {
        setUpdataBtn(-1)
        successActionLogic(setSuccessUpdataSalary)
      })
    }

    function handleDeleteClicked(teacherSubject) {

      setDeleteModal(true) ;
      const obj = {
        id: teacherSubject.teacherSubjectId ,
        title: teacherSubject.subject.subject
      }
      setCurrentSubject(obj)
    }

    function handleUpdataBtnClicked(row) {
      setSalary(row.original.salary)
      setUpdataBtn(row.id)
    }

    salaryInput.current?.focus();

    return (
      <>
        {
          deletModal && 
          <DeleteModal element={currentSubject.title} type={'TeacherSubject'} id={currentSubject.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteFromSubject} setUnSuccessDelete={setErrorDeleteSubject} />
        }
        <Notification title={'Updata Subject Salary'} type={'success'} state ={successUpdataSalary} setState={setSuccessUpdataSalary}/>
        <Notification title={'Delete subject'} type={'success'} state ={successDeleteSubject} setState={setSuccessDeleteSubject}/>
        <Notification title={'This subject is taught in one class'} type={'error'} state ={errorDeleteSubject} setState={setErrorDeleteSubject}/>
        { 
          subjects.length == 0 ? <p style={{ color: "red", fontWeight: "400", fontSize: "16px", }} > There are no subjects yet ...</p> : 
          <Table data={subjects || []} column={columns} showMainHeader={false} styleObj = {{padding: '6px' , fontSize : '15px' , sameColor : false}} unableId={true}/>
        }
      </>
    )
}






