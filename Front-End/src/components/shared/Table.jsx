
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useGlobalFilter, useSortBy, useTable } from "react-table";
import {  TableContainerStyle, TableStyle } from "./style/tableTagsStyle";
import { useNavigate } from "react-router-dom";
import SearchSubHeader from "./SearchSubHeader";


export default function Table( props ) {

    const { data , column , children , idKeyParams = false , url = 'unAble', showMainHeader = true , rowClickedFn } = props
    const { selectionRows, styleObj = { padding: '15px' , fonstSize : '14px' }} = props
    const gotoPage = useNavigate() ;
    
    const { getTableProps, getTableBodyProps, headerGroups,prepareRow, rows, state, setGlobalFilter} = useTable({
        data: data,
        columns: column,
    }, useGlobalFilter, useSortBy);

    const { globalFilter } = state;


    function handleRowClicked(row) {

        // if the row will do some action when it clicked instead  of go to another page
        if( rowClickedFn != undefined ) {
            rowClickedFn(row[idKeyParams])
            return 
        }
        if( url == 'unAble') return 
        if(idKeyParams) gotoPage(`${url}/${row[idKeyParams]}`)
        else gotoPage(`${url}`)
    }

    function renderHeader() {
        if(showMainHeader) {
            return <SearchSubHeader filter={globalFilter} setFilter={setGlobalFilter} >
                        {children}
                    </SearchSubHeader>
        }else {
            return  children
        }
    }

    return (
        <div style={{width: '100%'}}>  
            { renderHeader() }
            <TableContainerStyle >
                <TableStyle {...getTableProps()} styleObj={styleObj}>
                    <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                            <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            key={index}
                            >
                            {column.isSorted ? (
                                <span style={{ fontSize: "12px" }}>
                                {!column.isSortedDesc ? (
                                    <i className="bi bi-arrow-up"></i>
                                ) : (
                                    <i className="bi bi-arrow-down"></i>
                                )}{" "}
                                </span>
                            ) : (
                                <i
                                className="bi bi-arrow-up"
                                style={{ opacity: "0" }}
                                ></i>
                            )}
                            <span>
                                {column.render("Header")}
                            </span>
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, index) => {
                            prepareRow(row);
                            return (
                            <tr {...row.getRowProps()} key={index} onClick={()=>handleRowClicked(row.original)} style={ rowClickedFn != undefined ? {cursor:'pointer', backgroundColor: selectionRows[row.original[idKeyParams]] == true ? "#0565991f" :  'white'}: {} }>
                                {row.cells.map((cell, index) => (
                                <td {...cell.getCellProps()} key={index}  >
                                    {cell.render("Cell")}
                                </td>
                                ))}
                            </tr>
                            );
                        })}
                    </tbody>
                </TableStyle>
            </TableContainerStyle>
        </div>
    )
}