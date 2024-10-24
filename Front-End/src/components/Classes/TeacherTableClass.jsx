import { useTable , useRowSelect} from "react-table/dist/react-table.development";
import { TEACHERCOLUMN } from "./TableTools/TeacherColumn";
import { useEffect, useMemo, useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import { theadThStyle } from "../Global/globalStyle";
import Notification from "../Global/Notification";

export default function TeacherTableCurrentClass({classId}) {


    const [teachers,setTeachers] = useState([])
    const [wornning, setWornning] = useState(false);
    
    useEffect(() =>{
        DataServices.ShowTeacherInSideClass(classId).then(teachers => {
          const teachersDetailsMaping = teachers.map( teacher => {
            const {lastName,name,phone,teacherSubjects} = teacher
            return {
              full_name : name + ' ' +lastName ,
              phone , 
              teacherSubjects: teacherSubjects || [] ,
            }
          })
          setTeachers(teachersDetailsMaping)
        })
    } ,[])

    const columns = useMemo(
        () => [
          ...TEACHERCOLUMN,
          {
            Header : 'Subjecets' ,
            accessor: "teacherSubjects",
            Cell : ({value}) => {
              return (
                <div style={{ display: 'flex' ,gap: '3px' , justifyContent: 'center'}}>
                  {
                    value.map( subject => {
                      return <span style={{fontSize: '13px',padding: '2px 5px' , borderRadius: '2px' , color: 'white' , backgroundColor: '#056699'}}>{subject.subject.subject}</span>
                    })
                  }                  
                </div>
              )
            }
          }
        ],
        []
    );

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
          data: teachers,
        },
        useRowSelect 
      );
  

    return(
      <>
        <Notification
          title={"Please ,Selcet Any Teacher"}
          type={"error"}
          state={wornning}
          setState={setWornning}
        />
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "10px",
        }}
        >
            <div
            style={{ padding: "10px", width: "100%" }}
            >
              <table {...getTableProps()}>
                  <thead className="thead">
                          {headerGroups.map((headerGroup, index) => (
                              <tr
                              {...headerGroup.getHeaderGroupProps()}
                              key={index}
                              className="thead-row"
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
                  <tbody {...getTableBodyProps()} style={{ backgroundColor: "white"}}>
                  {rows.map((row, index) => {
                      prepareRow(row);
                      return (
                      <tr {...row.getRowProps()} key={index}>
                          {row.cells.map((cell, index) => (
                          <td {...cell.getCellProps()} key={index} style={{width: "25%"}}>
                              {cell.render("Cell")}
                          </td>
                          ))}
                      </tr>
                      );
                  })}
                  </tbody>
              </table>
            </div>
            <div className="btns-control">
              <button  style={{padding: '3px 18px' , backgroundColor: 'red' , color: 'white' , fontSize: '13px',borderRadius: '3px',cursor: 'pointer' , border: 'none' , outline: 'none'}}>Remove</button>
            </div>
        </div>
      </>
    )
}