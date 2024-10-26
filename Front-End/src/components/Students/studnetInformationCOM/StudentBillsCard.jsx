import { useEffect, useMemo, useState } from "react";
import { usePagination, useTable } from "react-table";
import addSpaceBetweenDigit, { theadThStyle } from "../../Global/globalStyle";
import { format } from "date-fns";  
import DataServices from "../../../Data/dynamic/DataServices";


export default function StudentBillsCard({studentId}) {

    const [studentBills,setStudentBills] = useState([])
    const columns = useMemo(() => {
        return [
            {
                Header : 'Bill Number' ,
                accessor : 'billNo'
            },
            {    
                Header : 'Amount' ,
                accessor : 'amount' ,
                Cell : ({value}) => {
                    return addSpaceBetweenDigit(value)
                }
            },
            {   
                Header : 'Date' , 
                accessor : 'date' ,
                Cell : ({value}) => {
                    return format(new Date(value) , 'yyyy / MM / dd') 
                }
            },
            {    
                Header : 'Note' ,
                accessor : 'note'
            }
        ]
    },[])


    useEffect(() => {
        DataServices.ShowStudentBillsDetails(studentId).then( bills => {
            setStudentBills(bills)
        })
    } , [])
    
    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        state,
        nextPage,
        previousPage,
        pageCount
    } = useTable(
    {
        columns: columns,
        data: studentBills,
    },usePagination);

    const { pageIndex } = state
    state.pageSize = 4 // set the rows table with five row
    
    return(
        <div style={{width: '100%' , display: 'flex' , flexDirection: 'column' , position: 'relative' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Student Bills</span>
            <div style={{ padding: '15px 8px 0 8px' , borderRadius: '0 0 5px 5px' , background: '#f3f1f1d7' ,flex: '1'}}>
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
                            <td {...cell.getCellProps()} key={index} style={{borderLeft: 'none',padding: '7px', fontSize: '13px' , fontWeight: 'bold' }} className="resize-width">
                            {cell.render("Cell")}
                            </td>
                        ))}
                        </tr>
                    );
                    })}
                </tbody>
                </table>
                <div style={{display: 'flex' , margin: '10px 0' ,position: 'absolute' , bottom: '0' , left: '50%' , transform: 'translateX(-50%)'}}>
                    <button onClick={previousPage} style={{fontSize: '18px', border: 'none' , cursor: 'pointer' , color: '#066599', backgroundColor: 'transparent'}}>
                        <i className="bi bi-caret-left-fill"></i>
                    </button>
                    <span style={{fontSize: '1em' , fontWeight: 'bold'}}>{pageIndex + 1} of {pageCount}</span>
                    <button onClick={nextPage} style={{ fontSize: '18px',border: 'none' , cursor: 'pointer' , color: '#066599' , backgroundColor: 'transparent'}}>
                        <i className="bi bi-caret-right-fill"></i>
                    </button>
                </div>
            </div>  
        </div>
    )
}