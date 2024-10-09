import { useEffect, useMemo, useRef, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import { TESTCOLUMNS } from "./testColumns"
import { useGlobalFilter, usePagination, useSortBy, useTable } from "react-table/dist/react-table.development"
import TableControalSection from "../../../Students/TableStructuer/TableControalSection"
import { useNavigate } from "react-router-dom"


export default function TestTable({type,testType,filterBySubject}) {


    const [tests,setTset] = useState([])
    const gotoClassTestPage = useNavigate()
    const column = useMemo(()=>TESTCOLUMNS,[])

    useEffect(()=> {
        DataServices.ShowAllTests().then( tests => {
            const testFiltering = Object.groupBy(tests,({subject}) => {
                if( type == 'All' ) return type ;  
                return subject.grade == type ?  type : 'otherwise'
            })
            setTset(testFiltering[type].filter( test => {
                return (test.testType.toLocaleLowerCase() == testType.toLocaleLowerCase() || testType == 'All' ) &&  (test.subject.subject.toLocaleLowerCase() == filterBySubject.toLocaleLowerCase() || filterBySubject == 'All' )
            }))
        })
    },[type,testType,filterBySubject])

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
          data: tests,
          columns: column,
        },
        useGlobalFilter,
        useSortBy,
        usePagination
      );
    const { globalFilter, pageIndex } = state;

    return(
        <>
            <table {...getTableProps()} style={{overflow: 'hidden' , borderRadius: '10px'}}>    
                <thead >
                    {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
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
                        const {testType,date,subject,testId} = row.original
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}  style={{cursor: 'pointer'}} key={index} onClick={()=>gotoClassTestPage(`/Test/ClassesTestDetails/${row.original.testId}`,{state: {testType:testType,date:date,subject:subject.subject,grade:subject.grade,testId :testId}})}>
                            {row.cells.map((cell, index) => (
                                <td {...cell.getCellProps()} key={index} style={{padding: '10px' , fontWeight: '600'}}>
                                {cell.render("Cell")}
                                </td>
                            ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <TableControalSection
                pageCount={pageCount}
                previousPage={previousPage}
                nextPage={nextPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageIndex={pageIndex}
                gotoPage={gotoPage}
                />
        </>
    )
}

function TestType({test}) {
    return (
        <tr>
            <td>{test.subject.subject}</td>
            <td>{test.testType}</td>
            <td>{test.date}</td>
            <td>{test.correctionDate}</td>
        </tr>
    )
}