/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useGlobalFilter, useRowSelect, useSortBy, useTable } from "react-table";
import {  TableContainerStyle, TableStyle } from "./style/tableTagsStyle";
import { useNavigate } from "react-router-dom";
import SearchSubHeader from "./SearchSubHeader";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ARABIC } from "../../Redux/actions/type";


export default function Table( props ) {
    
    const {currentLange} = useSelector( state => state.language)

    const { data , column , children , setSelectedRows = ()=>{} , idKeyParams = false , url = 'unAble', showMainHeader = true , rowClickedFn } = props
    const { unableId = false ,specialState = '' , hiddenHeader = false, preventAction = false, selectionRows, styleObj = { padding: '15px' , fontSize : '14px' , sameColor : false}} = props
    const gotoPage = useNavigate() ;
    
    const { getTableProps, getTableBodyProps, headerGroups,prepareRow, rows, state, setGlobalFilter,selectedFlatRows} = useTable({
        data: data,
        columns: column,
    }, useGlobalFilter, useSortBy ,useRowSelect);

    useMemo(() => setSelectedRows(selectedFlatRows) ,[selectedFlatRows])

    const { globalFilter } = state;


    function handleRowClicked(row) {

        // if the row will do some action when it clicked instead  of go to another page
        if( rowClickedFn != undefined ) {
            rowClickedFn(row[idKeyParams],row)
            return 
        }
        if( url == 'unAble') return 
        if(idKeyParams) gotoPage(`${url}/${row[idKeyParams]}`,{state: encodeURIComponent(JSON.stringify({...row,specialState}))})
        else gotoPage(`${url}`,{state: encodeURIComponent(JSON.stringify(row))})
    }

    function renderHeader() {
        if(showMainHeader) {
            return <SearchSubHeader filter={globalFilter} setFilter={setGlobalFilter} >
                        {children}
                    </SearchSubHeader>
        }else {
            return  <div style={{direction: currentLange == ARABIC ? 'rtl' : 'ltr'}}>{children}</div>
        }
    }

    return (
        <div style={{width: '100%',direction: currentLange == ARABIC ? 'ltr' : 'ltr'}}>  
            { renderHeader() }
            <TableContainerStyle >
                <TableStyle language={currentLange} {...getTableProps()} $styleObj={styleObj} className={ preventAction ? 'class-full': ''}>
                    {   hiddenHeader ?  <></> :                     
                        <thead>
                            {headerGroups.map((headerGroup, index) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                                    {unableId &&  <th></th>}
                                    {headerGroup.headers.map((column, index) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())} key={index} >
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
                                            {column.render("Header")[currentLange]}
                                        </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                    }
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, index) => {
                            prepareRow(row);
                            return (
                            <tr {...row.getRowProps()} key={index} onClick={()=>handleRowClicked(row.original)} style={ rowClickedFn != undefined ? {cursor:'pointer', backgroundColor: selectionRows[row.original[idKeyParams]] == true ? "#0565991f" :  'white'}: {} }>
                                { unableId && <td style={{ color: '#034568', border: 'none' , backgroundColor: '#05659945',fontWeight: 'bold' }}>{parseInt(row.id) + 1}</td>}
                                {row.cells.map((cell, index) => (
                                <td {...cell.getCellProps()} key={index}  style={{direction: 'ltr'}}>
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