import { useMemo } from "react";
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";


export default function TableSporStyle({data,column,paddingCells,paginationTable = null ,headerSearch = false}) {

    const hiddenTheControal = paginationTable != null

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        gotoPage,
        page,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
        pageCount,
    } = useTable(
    {
        data: data,
        columns: column,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
    );

    return (
        <>
            {
                headerSearch && 
                <TableHeader
                filter={globalFilter}
                setFilter={setGlobalFilter}
                studentNumber={rows.length}
                type={'student'}
                />
            }
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
                <table {...getTableProps()}>
                    <thead style={{position: 'relative' , top: '-10px'}}>
                    {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                            <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            style={{...thStyle,border: 'none' , padding: '15px' }}
                            key={index}
                            >
                            {column.isSorted ? (
                                <span style={{ fontSize: "12px" }}>
                                {" "}
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
                            <span style={{ marginLeft: "5px" }}>
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
                        <tr {...row.getRowProps()} key={index} className="hovering-row">
                            {row.cells.map((cell, index) => (
                            <td {...cell.getCellProps()} key={index} style={{padding: '15px'  , margin: '5px 0' , border: 'none' }}>
                                {cell.render("Cell")}
                            </td>
                            ))}
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            {
                hiddenTheControal &&
                <TableControalSection
                pageCount={pageCount}
                previousPage={previousPage}
                nextPage={nextPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageIndex={pageIndex}
                gotoPage={gotoPage}
                />
            }
        </>
    )
}