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
import useTeacherSubjects from "../../../hooks/teacher_hooks/useTeacherSubjects.jsx";
import Table from "../../shared/Table.jsx";
import { TeacherNewSubjectTEXT } from "../../../Data/static/teachers/ManageTeacher/TeacherNewSubjectTEXT.js";
import { useSelector } from "react-redux";


export default function TeacherSubjectsTable({teacherId,setSuccessDeleteFromSubject,successDeleteFromSubject}) {

    const {currentLange} = useSelector( state => state.language)
    const {isAdmin} = useSelector( state => state.admin)
    const {cancelBtn ,applyBtn,noSubjectsWOR,successUpdateSubjectMES,successDeleteSubjectMES ,errorDeleteSubjectMES} = TeacherNewSubjectTEXT[currentLange]


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
            Header: {
              english: 'Salary'  ,
              arabic: 'المبلغ المتفق عليه'
            },
            accessor: 'salary',
            Cell : ({row}) => {
              return  updateBtn == row.id ? <input type='text' style={{ border: 'none' , outline: 'none' , borderBottom : '1px solid #066599' , textAlign: 'center', backgroundColor: 'transparent' }}
              value={salary} onChange={(e) => setSalary(e.target.value)} ref={salaryInput}/> : row.original.salary
            }
        },
        {
            Header : {
              english: 'Setting' ,
              arabic: 'إعدادات'
            },
            id : 'selection' ,
            Cell : ({row}) => {
              if(!isAdmin) return '...'
              return ( 
                <div style={{ display: "flex", alignItems: "center", justifyContent: 'center' , paddingRight: '20px' }}>
                    <i className="bi bi-trash" onClick={()=>{handleDeleteClicked(row.original)}} style={{marginLeft: '8px', color: "gray", cursor: "pointer" ,fontSize: '16px' ,marginRight: '2em',color: 'red' }}></i>
                    {
                      updateBtn == row.id ?
                        <ButtonsContainerStyle>
                          <button onClick={()=>handleApplyClicked(row.original)} style={{padding: '2px 8px' , fontSize: '11px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: '#009744' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>{applyBtn}</button>
                          <button onClick={()=>{setUpdataBtn(null)}} style={{padding: '2px 8px' , fontSize: '11px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: 'red' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>{cancelBtn}</button>
                        </ButtonsContainerStyle>
                      : <i className="bi bi-sliders2" style={{ color: "gray", cursor: "pointer" ,fontSize: '16px' , color: 'gray' }} onClick={()=> {handleUpdataBtnClicked(row)}}></i>
                    }
                </div>
            )}
        }
    ],[updateBtn,salary,currentLange])

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
        <Notification title={successUpdateSubjectMES} type={'success'} state ={successUpdataSalary} setState={setSuccessUpdataSalary}/>
        <Notification title={successDeleteSubjectMES} type={'success'} state ={successDeleteSubject} setState={setSuccessDeleteSubject}/>
        <Notification title={errorDeleteSubjectMES} type={'error'} state ={errorDeleteSubject} setState={setErrorDeleteSubject}/>
        { 
          subjects.length == 0 ? <span style={{ color: "red", fontWeight: "400", fontSize: "16px", }} > {noSubjectsWOR}</span> : 
          <Table data={subjects || []} column={columns} showMainHeader={false} styleObj = {{padding: '6px' , fontSize : '15px' , sameColor : false}} unableId={true}/>
        }
      </>
    )
}






