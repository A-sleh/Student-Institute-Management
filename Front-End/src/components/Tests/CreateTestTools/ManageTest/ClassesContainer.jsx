import { useEffect, useMemo, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import { useRowSelect, useTable } from "react-table/dist/react-table.development"
import { CLASSESCOLUMNS } from "./ClasesTableColumn"
import { theadThStyle } from "../../../Global/globalStyle"
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"
import { HeaderControal } from "../../../Bills/TeacherPaysCom/ShowBillTeacherDetails"

export default function ClassesContainer({classesTableRef,grade,setRequestData,requestData}) {

    const [classes,setClasses] = useState([])
    const [search,setSearch] = useState('')
    useEffect(() => {
        DataServices.showCalsses().then( classes => {
            setClasses(classes.filter(Class => {
                if(search != '' && !Class.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return
                return Class.grade.toLocaleLowerCase() == grade.toLocaleLowerCase()
            })) 
        })
    } ,[grade,search])

    const columns = useMemo(
        () => [
          ...CLASSESCOLUMNS,
          {
            Header : 'Selete' ,
            id: "selection",
            Cell: ({ row }) => {
                const {classId} = row.original
                function handleClicked() {
                    const {classesIds} = requestData
                    let found = true // if we don't use this id we will added it after filtering
                    let ids = classesIds.filter( (id,index) => {
                        if(id != classId) {
                            return true
                        }else {
                            found = false
                            return false 
                        }
                    })
                    if(found) {
                        ids.push(classId)
                    }
                    setRequestData({
                        ...requestData ,
                        classesIds : ids
                    })
                }
                return <input type="checkbox" {...row.getToggleRowSelectedProps()} onClick={()=>{handleClicked()}}/>
            },
          },
        ],
        [requestData]
      );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        toggleAllRowsSelected
    } = useTable(
    {
        columns: columns,
        data: classes,
    },
        useRowSelect
    );

    

    return (
        <div style={{width: '500px'}}>
            <button ref={classesTableRef} style={{display: 'none'}} onClick={()=>toggleAllRowsSelected(false)}></button>
            <h3 style={{lineHeight: '20px' , marginTop: '15px'}}>Classes</h3>
            <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px' , padding: '20px 10px',paddingTop: '1px' , margin: '5px 0' }}>
                <div style={{marginBottom: '15px'}}>
                    <HeaderControal searcByName={search} setSearcByName={setSearch} />
                </div>
                <table {...getTableProps()}>
                    <thead className="thead" style={{position: 'relative' , top: '-10px'}}>
                        {headerGroups.map((headerGroup, index) => (
                            <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={index}
                            className="thead-row"
                            >
                            {headerGroup.headers.map((column, index) => (
                                <th {...column.getHeaderProps()} key={index} style={{...thStyle,border: 'none' , padding: '15px' }}>
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
                        <tr {...row.getRowProps()} key={index} >
                        {row.cells.map((cell, index) => (
                            <td {...cell.getCellProps()} key={index} style={{padding: '10px' , margin: '5px 0' , border: 'none' , fontSize: '15px'}}>
                            {cell.render("Cell")}
                            </td>
                        ))}
                        </tr>
                    );
                    })}
                </tbody>
                </table>
            </div>
        </div>
    )
}