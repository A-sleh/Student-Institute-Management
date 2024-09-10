import { useEffect, useMemo, useRef, useState } from "react";
import { useTable , useRowSelect, useAsyncDebounce} from 'react-table'
import DataServices from "../../../Data/dynamic/DataServices.js";
import Notification from "../../Global/Notification.jsx";

export default function TeacherSubjectsTable({teacherId}) {

    const salaryInput = useRef(null)    
    const [subjects,setSubjects] = useState([]) ;
    const [updateBtn,setUpdataBtn] = useState(null) ;
    const [successUpdataSalary,setSuccessUpdataSalary] = useState(false)
    const [errorDeleteSubject,setErrorDeleteSubject] = useState(false)
    const [successDeleteSubject,setSuccessDeleteSubject] = useState(false)
    const [salary,setSalary] = useState('')
    
    useEffect(() => {
        DataServices.ShowAllTeacherSubjects(teacherId).then( subjects => {
            setSubjects(subjects)
        })
    } ,[successUpdataSalary])

    const columns = useMemo(() => [
        {
            accessor : 'subject.subject'
        },
        {    
            accessor : 'subject.maximumMark'
        },
        {    
            accessor : 'subject.grade'
        },
        {    
            accessor: 'salary',
            Cell : ({row}) => {
             return  updateBtn == row.original.subject.subjectId ? <input type='text' style={{
                padding: '2px 6px' ,
                border: 'none' ,
                outline: 'none' ,
                borderBottom : '1px solid #066599' ,
                width: '10em' ,
                margin: '0',
                textAlign: 'center',
                backgroundColor: 'transparent'
             }} value={salary} onChange={(e) => {handleSalaryChange(e.target.value)}} ref={salaryInput}/> : row.original.salary
            }
        },
        {
            id : 'selection' ,
            Cell : ({row}) => {
                return ( 
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'flex-end' ,
                        paddingRight: '20px'
                    }}>
                        <i className="bi bi-trash" onClick={()=>{handleDeleteClicked(row.original.teacherSubjectId)}} style={{ color: "gray", cursor: "pointer" ,fontSize: '16px' ,marginRight: '2em',color: 'red' }}></i>
                        {
                          updateBtn == row.original.subject.subjectId ?
                            <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center' , gap: '5px'}}>
                              <button onClick={()=>handleApplyClicked(row.original)} style={{padding: '0px 5px' , fontSize: '12px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: '#009744' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>Apply</button>
                              <button onClick={()=>{setUpdataBtn(null)}} style={{padding: '0px 5px' , fontSize: '12px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: 'red' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>Cancel</button>
                            </div>
                          : <i className="bi bi-sliders2" style={{ color: "gray", cursor: "pointer" ,fontSize: '16px' , color: 'gray' }} onClick={()=> {handleUpdataBtnClicked(row.original)}}></i>
                        }
                    </div>
            )}
        }
    ],[updateBtn,salary])


    const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    selectedFlatRows,
    } = useTable(
    {
        columns: columns,
        data: subjects,
    },
    useRowSelect
    );

    function handleApplyClicked(details) {

       DataServices.UpdataSubjectSalary(teacherId,details.subject.subjectId,salary).then(res=> {
        setSuccessUpdataSalary(true)
        setUpdataBtn(false)
        setTimeout(()=>{
          setSuccessUpdataSalary(false)
        },2000)
       })
    }

    function handleDeleteClicked(teacherSubjectId) {
      DataServices.DeleteTeacherSubject(teacherSubjectId).then(response => {
        if(response.status > 299 ) {
          setErrorDeleteSubject(true) ;
          setTimeout(() => {
            setErrorDeleteSubject(false)
          } ,3000)
        }else {

        }
      })
    }

    function handleUpdataBtnClicked(subject) {
      setSalary(subject.salary)
      setUpdataBtn(subject.subject.subjectId)
    }

    function handleSalaryChange(value) {
      setSalary(value)
    }

    salaryInput.current?.focus();

    return (
      <>
        <Notification title={'Updata Subject Salary'} type={'success'} state ={successUpdataSalary} setState={setSuccessUpdataSalary}/>
        <Notification title={'Delete subject'} type={'success'} state ={successDeleteSubject} setState={setSuccessDeleteSubject}/>
        <Notification title={'This subject is taught in one class'} type={'error'} state ={errorDeleteSubject} setState={setErrorDeleteSubject}/>
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "10px",
        }}
      >
        <div
          style={{  backgroundColor: "white", width: "100%" }}
        >
          <table {...getTableProps()}>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={index} >
                    {row.cells.map((cell, index) => (
                      <td {...cell.getCellProps()} key={index} style={{padding: '5px' , border: 'none'}} className="resize-width">
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        </div>
      </>
    )
}






