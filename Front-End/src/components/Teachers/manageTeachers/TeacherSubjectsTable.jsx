import { useEffect, useMemo, useRef, useState } from "react";
import { useTable , useRowSelect, useAsyncDebounce} from 'react-table'
import DataServices from "../../../Data/dynamic/DataServices.js";
import Notification from "../../Global/Notification.jsx";
import DeleteModal from "../../Modal/DeleteModal.jsx";
import { theadThStyle } from "../../Global/globalStyle.js";

export default function TeacherSubjectsTable({teacherId,setSuccessDeleteFromSubject,successDeleteFromSubject}) {

    const salaryInput = useRef(null)    
    const [subjects,setSubjects] = useState([]) ;
    const [updateBtn,setUpdataBtn] = useState(null) ;
    const [successUpdataSalary,setSuccessUpdataSalary] = useState(false)
    const [errorDeleteSubject,setErrorDeleteSubject] = useState(false)
    const [successDeleteSubject,setSuccessDeleteSubject] = useState(false)
    const [salary,setSalary] = useState('')
    const [deletModal,setDeleteModal] = useState(false)
    const [currentSubject,setCurrentSubject] = useState({
      id : '',
      title : ""
    })
    
    useEffect(() => {
        DataServices.ShowAllTeacherSubjects(teacherId).then( subjects => {
            setSubjects(subjects)
        })
    } ,[successUpdataSalary,successDeleteFromSubject])

    const columns = useMemo(() => [
        {
            Header: 'Subject' ,
            accessor : 'subject.subject'
        },
        {   
            Header: 'Maximum Mark' ,
            accessor : 'subject.maximumMark'
        },
        {   
            Header: 'Grade' ,
            accessor : 'subject.grade'
        },
        {   
            Header: 'Salary' ,
            accessor: 'salary',
            Cell : ({row}) => {
             return  updateBtn == row.id ? <input type='text' style={{
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
            Header : 'Actions' ,
            id : 'selection' ,
            Cell : ({row}) => {

                return ( 
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: 'flex-end' ,
                        paddingRight: '20px'
                    }}>
                        <i className="bi bi-trash" onClick={()=>{handleDeleteClicked(row.original)}} style={{ color: "gray", cursor: "pointer" ,fontSize: '16px' ,marginRight: '2em',color: 'red' }}></i>
                        {
                          updateBtn == row.id ?
                            <div style={{display: 'flex' , justifyContent: 'center' , alignItems: 'center' }}>
                              <button onClick={()=>handleApplyClicked(row.original)} style={{padding: '2px 8px' , fontSize: '11px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: '#009744' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>Apply</button>
                              <button onClick={()=>{setUpdataBtn(null)}} style={{padding: '2px 8px' , fontSize: '11px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: 'red' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>Cancel</button>
                            </div>
                          : <i className="bi bi-sliders2" style={{ color: "gray", cursor: "pointer" ,fontSize: '16px' , color: 'gray' }} onClick={()=> {handleUpdataBtnClicked(row)}}></i>
                        }
                    </div>
            )}
        }
    ],[updateBtn,salary])


    const {
    getTableProps,
    headerGroups,
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
        setUpdataBtn(-1)
        setTimeout(()=>{
          setSuccessUpdataSalary(false)
        },2000)
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

    function handleSalaryChange(value) {
      setSalary(value)
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
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "10px",
        }}
      >
        <div
          style={{ width: "100%" }}
        >
          <table {...getTableProps() }>
            <thead >
              {headerGroups.map((headerGroup, index) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={index}
                >
                  {headerGroup.headers.map((column, index) => (
                    <th {...column.getHeaderProps()} key={index} style={theadThStyle}>
                      <span
                        style={{ marginLeft: "5px" }}
                        className="thead-cell"
                      >
                        {column.render("Header")}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} style={{backgroundColor: "white"}}>
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






