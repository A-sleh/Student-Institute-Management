import { useEffect, useMemo, useState } from "react";
import { useTable , useRowSelect} from 'react-table'
import DataServices from "../../../Data/dynamic/DataServices.js";
import DeleteModal from "../../Modal/DeleteModal.jsx";
import { theadThStyle } from "../../Global/globalStyle.js";

export default function TeacherClassesTable({teacherId,setSuccessDeleteFromClass,successDeleteFromClass}) {

    const [classes,setClasses] = useState([]) ;
    const [deletModal,setDeleteModal] = useState(false)
    const [currentClass,setCurrentClass] = useState({
      id : {
        teacherSubjectId : '' ,
        classId : ''
      },
      title : ""
    })
    
    
    
    useEffect(() => {
        DataServices.ShowTeacherClass(teacherId).then( subjects => {
            let  classesMaping= [] ;
            subjects.map((subjects) => {

              if(subjects.classes[0] == null ) 
                return
              
              const { subject } = subjects.subject ;
              const classMaping = subjects.classes.map( Class => {
                return {...Class , subject : subject , teacherSubjectId : subjects.teacherSubjectId }
              })
              classesMaping = [...classesMaping,...classMaping ];
            })
            setClasses(classesMaping)
        })
    } ,[successDeleteFromClass])



    const columns = useMemo(() => [
        {
            Header : 'Title' ,
            accessor : 'title'
        },
        {    
            Header : 'Gender' ,
            accessor : 'gender'
        },
        {   
            Header : 'Grade' , 
            accessor : 'grade'
        },
        {    
            Header : 'Subject' ,
            accessor : 'subject'
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
                    }}>
                        <i className="bi bi-trash" onClick={()=>{handleDeleteClicked(row.original)}} style={{ color: "gray", cursor: "pointer" ,fontSize: '16px' ,marginRight: '2em',color: 'red' }}></i>
                    </div>
            )}
        }
    ],[])


    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    } = useTable(
    {
        columns: columns,
        data: classes,
    },
    useRowSelect
    );


    function handleDeleteClicked(details) {
      setDeleteModal(true)
      const obj = {
        id: {
          teacherSubjectId : details.teacherSubjectId ,
          classId : details.classId
        },
        title: details.title
      }
      setCurrentClass(obj)
    }

    return (
      <>
        {
          deletModal && 
          <DeleteModal element={currentClass.title} type={'TeacherFromClass'} id={currentClass.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteFromClass} />
        }
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "10px",
        }}
      >
        <div
          style={{width: "100%" }}
        >
          <table {...getTableProps()}>
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






