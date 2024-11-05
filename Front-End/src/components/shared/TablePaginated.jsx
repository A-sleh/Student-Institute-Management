
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import {  TableContainerStyle, TableStyle } from "./style/tableTagsStyle";
import TableControalSection from "./TableControalSection";
import SearchSubHeader from "./SearchSubHeader";


export default function TablePaginated(props) {

    const { data ,column,children,idKeyParams = false ,url = 'unAble',showMainHeader = true , rowClickedFn} = props
    let { styleObj = { padding: '15px' , fonstSize : '14px' }  } = props


    const { getTableProps, getTableBodyProps, headerGroups, nextPage, previousPage, canNextPage, canPreviousPage, gotoPage, page, rows, prepareRow, state, setGlobalFilter, pageCount } = useTable({
        data: data,
        columns: column,
    }, useGlobalFilter, useSortBy, usePagination );

    const { globalFilter, pageIndex } = state;

    return (
        <>
            <SearchSubHeader filter={globalFilter} setFilter={setGlobalFilter} >
                {children}
            </SearchSubHeader>

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
                        {page.map((row, index) => {
                            prepareRow(row);
                            return (
                            <tr {...row.getRowProps()} key={index} >
                                {row.cells.map((cell, index) => (
                                <td {...cell.getCellProps()} key={index} >
                                    {cell.render("Cell")}
                                </td>
                                ))}
                            </tr>
                            );
                        })}
                    </tbody>
                </TableStyle>
            </TableContainerStyle>

            <TableControalSection pageCount={pageCount} previousPage={previousPage} nextPage={nextPage} canPreviousPage={canPreviousPage} canNextPage={canNextPage} pageIndex={pageIndex} gotoPage={gotoPage} />

        </>
    )
}