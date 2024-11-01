
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import {  TableContainerStyle, TableStyle } from "./style/tableTagsStyle";
import TableHeader from "./TableHeader";
import { useNavigate } from "react-router-dom";


export default function Table({data,column,children,idKeyParams = '',url = 'unAble'}) {

    const gotoPage = useNavigate() ;
    const { getTableProps, getTableBodyProps, headerGroups,prepareRow, rows, state, setGlobalFilter} = useTable({
        data: data,
        columns: column,
    }, useGlobalFilter, useSortBy);

    const { globalFilter } = state;

    function handleRowClicked(row) {
        if( url == 'unAble') return 
        gotoPage(`${url}/${row[idKeyParams]}`)
    }

    return (
        <>
            <TableHeader filter={globalFilter} setFilter={setGlobalFilter} >
                {children}
            </TableHeader>
            <TableContainerStyle >
                <TableStyle {...getTableProps()}>
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
                            <tr {...row.getRowProps()} key={index} onClick={()=>handleRowClicked(row.original)} >
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
        </>
    )
}