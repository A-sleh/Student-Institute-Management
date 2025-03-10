
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import {  TableContainerStyle, TableStyle } from "./style/tableTagsStyle";
import TableControalSection from "./TableControalSection";
import SearchSubHeader from "./SearchSubHeader";
import TableControalSection2 from "./TableControalSection_2";
import { useSelector } from "react-redux";


export default function TablePaginated(props) {
    
    const {currentLange} = useSelector( state => state.language)
    const { data , column , children , idKeyParams = false , url = 'unAble', showMainHeader = true , rowClickedFn } = props
    const { unableId = false, currPage = 0 , totalPages = 0 , setNextPageState , rowNumber = 10 ,selectionRows,smallControalSection = false , styleObj = { padding: '15px' , fontSize : '14px' , sameColor : false}} = props
    
    const { getTableProps, getTableBodyProps, headerGroups, nextPage, previousPage, canNextPage, canPreviousPage, gotoPage, page, rows, prepareRow, state, setGlobalFilter, pageCount } = useTable({
        data: data,
        columns: column,
    }, useGlobalFilter, useSortBy, usePagination );

    const { globalFilter, pageIndex } = state;
    state.pageSize = rowNumber // set the rows table with five row
    
    function handleRowClicked(row) {

        // if the row will do some action when it clicked instead  of go to another page
        if( rowClickedFn != undefined ) {
            rowClickedFn(row[idKeyParams])
            return 
        }
        if( url == 'unAble') return 
        if(idKeyParams) gotoPage(`${url}/${row[idKeyParams]}`,{state: encodeURIComponent(JSON.stringify(row))})
        else gotoPage(`${url}`,{state: encodeURIComponent(JSON.stringify(row))})
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
        <div style={{width: '100%' ,flex: '1',display: 'flex' ,direction: 'ltr', flexDirection: 'column'}}>  
            { renderHeader() }
            <TableContainerStyle style={{margin: '0' , paddingBottom: '40px'}}>
                <TableStyle  language={currentLange} {...getTableProps()} styleObj={styleObj}>
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
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, index) => {
                            prepareRow(row);
                            return (
                            <tr {...row.getRowProps()} key={index} onClick={()=>handleRowClicked(row.original)} style={ rowClickedFn != undefined ? {cursor:'pointer', backgroundColor: selectionRows[row.original[idKeyParams]] == true ? "#0565991f" :  'white'}: {} }>
                                { unableId && <td style={{ color: '#034568', border: 'none' , backgroundColor: '#05659945',fontWeight: 'bold' }}>{parseInt(row.id) + 1}</td>}
                                {row.cells.map((cell, index) => (
                                <td {...cell.getCellProps()} key={index} style={{direction: 'ltr'}}>
                                    {cell.render("Cell")}
                                </td>
                                ))}
                            </tr>
                            );
                        })}
                    </tbody>
                </TableStyle>
                { smallControalSection && <TableControalSection2 previousPage={previousPage} nextPage={nextPage} currPage={currPage} totalPages={pageCount} pageIndex={pageIndex} setNextPageState={setNextPageState} /> }
            </TableContainerStyle>
            {
                !smallControalSection &&<TableControalSection previousPage={previousPage} nextPage={nextPage} currPage={currPage} totalPages={totalPages} canPreviousPage={canPreviousPage} setNextPageState={setNextPageState} canNextPage={canNextPage} pageIndex={pageIndex} gotoPage={gotoPage} />
            }
        </div>
    )
}