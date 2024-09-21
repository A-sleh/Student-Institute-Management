import { useEffect, useMemo, useState } from "react";
import { tBStyle, thStyle } from "./TeacherSubjects"
import DataServices from "../../../Data/dynamic/DataServices";
import { theadThStyle } from "../../Global/globalStyle";
import { usePagination, useRowSelect, useTable } from "react-table";

export default function TeacherClasses({teacherId}) {

    const [teacherSubjects , setTeacherSubjects] = useState([]) ;
    const [classes,setClasses] = useState([]) ;
    const [current,setCurrent] = useState(0);

    const columns = useMemo(() => {
        return [
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
            }
        ]
    },[])


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
    } , [])
    
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        page,
        state,
        nextPage,
        previousPage,
        pageCount
    } = useTable(
    {
        columns: columns,
        data: classes,
    },usePagination);

    const { pageIndex } = state
    state.pageSize = 5 // set the rows table with five row
    
    return(
        <div style={{width: '100%' , alignSelf: 'stretch' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Its Classes</span>
            <div style={{ padding: '15px 8px 0 8px' , borderRadius: '0 0 5px 5px' , background: '#f3f1f1d7' ,flexShrink: '1'}}>
                <table {...getTableProps()}>
                <thead >
                    {headerGroups.map((headerGroup, index) => (
                    <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={index}
                    >
                        {headerGroup.headers.map((column, index) => (
                        <th {...column.getHeaderProps()} key={index} style={theadThStyle} >
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
                    {page.map((row, index) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} key={index} >
                        {row.cells.map((cell, index) => (
                            <td {...cell.getCellProps()} key={index} style={{borderLeft: 'none',padding: '2px', fontSize: '13px' , fontWeight: 'bold' }} className="resize-width">
                            {cell.render("Cell")}
                            </td>
                        ))}
                        </tr>
                    );
                    })}
                </tbody>
                </table>
                <div style={{display: 'flex' , justifyContent: 'center' , margin: '10px 0'}}>
                    <button onClick={previousPage} style={{fontSize: '18px', border: 'none' , cursor: 'pointer' , color: '#066599'}}>
                        <i className="bi bi-caret-left-fill"></i>
                    </button>
                    <span style={{fontSize: '1em' , fontWeight: 'bold'}}>{pageIndex + 1} of {pageCount}</span>
                    <button onClick={nextPage} style={{ fontSize: '18px',border: 'none' , cursor: 'pointer' , color: '#066599'}}>
                        <i className="bi bi-caret-right-fill"></i>
                    </button>
                </div>
            </div>  
        </div>
    )
}