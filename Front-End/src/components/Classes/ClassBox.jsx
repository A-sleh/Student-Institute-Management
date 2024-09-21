import { useEffect, useMemo, useRef, useState } from "react"
import { ClassColumns } from "./TableTools/ClassColumns";
import DataServices from "../../Data/dynamic/DataServices";
import { useTable } from "react-table";
import Notification from "../Global/Notification";
import { useNavigate } from "react-router-dom";

export default function  ClassBox({currentClass,numberOfSelectedStudents,selectedStudents}) {

    const capacityInput = useRef(null)
    const gotoManageClassPage = useNavigate() ;
    const [classes,setClasses] = useState([]) ; 
    const [successUpdate,setSuccessUpate] = useState(false) ;
    const [classWarning,setClassWarning] = useState(false);
    const [successMoveStudents,setSuccessMoveStudents] = useState(false) ;
    const [validation,setValidation] = useState(false) 
    const [resize,setResize] = useState(false)
    const [capacity,setCapacity] = useState('')
    
    useEffect(() => {
        DataServices.showCalsses().then((Classes) => {
            setClasses( Classes.filter((Class) => {
                return Class.classId != currentClass ;
            }))
        })
    } , [successUpdate] )


    const columns = useMemo(()=> [
        ...ClassColumns , 
        {
          Header: 'capacity',
          accessor: 'capacity',
          Cell : ({row}) => {
            return resize != row.original.classId ? row.original.capacity : <input type='text'  min='1' in  ref={capacityInput} value={capacity} onChange={(e) => handleInputChange(e.target.value)} style={{padding: '0 4px' ,backgroundColor: 'transparent',width: '3em', fontSize: '15px' , outline: 'none' , border: 'none' , textAlign: 'center' ,borderBottom: '1px solid #066599' , borderRadius: '2px' }}/>
          }
        },
        {
            id: "selection",
            Header: 'Actions' ,
            Cell : ({row}) => {
                return (
                    <>
                        { resize != row.original.classId ? <button onClick={()=>{handleSelectClassClicked(row.original,numberOfSelectedStudents)}} style={{padding: '0px 5px' , fontSize: '12px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: '#066599' , borderRadius: '2px' , cursor: 'pointer'}}>Select</button> : ''}
                        <button onClick={() =>{
                            resize == row.original.classId ? handleApplyClicked(row.original) : handleResizeClicked(row.original.classId,row.original.capacity)  
                        }} style={{padding: '0px 5px' , fontSize: '12px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: '#009744' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>{resize == row.original.classId ? 'Apply' : 'Resize Capacity'}</button>
                        {row.original.classId == resize ? <button onClick={()=>{handleCancelClicked()}} style={{padding: '0px 5px' , fontSize: '12px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: 'red' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>Cancel</button> : ''}
                    </>
                )
            }
        }
    ],[numberOfSelectedStudents,resize,capacity])

    

    const {
        headerGroups,
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
    } = useTable(
    {
        columns: columns,
        data: classes,
    }
    );
    
    function changeStudentClassId(toClass) {
        return new Promise((resolve)=> {
            selectedStudents.map((student) => {
                const newStudentDetails = {...student , class: { classId : toClass } }
                DataServices.UpdateStudent(newStudentDetails)
            })
            resolve()
        })
    }

    function handleInputChange(value) {
        setCapacity(value) ; 
    }
    
    function handleCancelClicked() {
        setResize(false)
        setValidation(false)
    }

    function handleResizeClicked(classId,capacity) {
        setCapacity(`${capacity}`)
        setResize(classId)
    } 
    
    function handleApplyClicked(Class) {

        const vaildInput = /[^0-9]/.test(capacity)
        setValidation(vaildInput);
        
        if(!vaildInput) {
            const newClass = {...Class , capacity : +capacity}
            DataServices.UpdateClass(newClass).then((_) => {
                setSuccessUpate(true) ; 
                setResize(false)
                setTimeout(() => {
                    setSuccessUpate(false) ; 
                }, 2000 )
            });
        }
        
    }

    function handleSelectClassClicked(Class,numberOfSelectedStudents) {
        
        const classStudentsNumber = Class.students.length - (Class.students[0] == null )

        if( Class.capacity < ( numberOfSelectedStudents + classStudentsNumber) ) {
            setClassWarning(true)
            setTimeout(()=> {
                setClassWarning(false);
            }, 2000 )
            return ;
        }

        changeStudentClassId(Class.classId).then(() => {
            setSuccessMoveStudents(true) ; 
            setTimeout(()=> {
                setSuccessMoveStudents(false) ; 
                gotoManageClassPage('/ManageClasses' , {replace: true})
            } , 2000 )
        })
    }   

    capacityInput.current?.focus();

    return (
        <>
            <Notification title={'Students cannot be transferred to this class'} type={'error'} state ={classWarning} setState={setClassWarning} />
            <Notification title={'Been transfer students successfully'} type={'success'} state ={successMoveStudents} setState={setSuccessMoveStudents} />
            <Notification title={'Update class capacity'} type={'success'} state ={successUpdate} setState={setSuccessUpate} />
            <div style={{display: 'flex' , gap: '10px' , flexWrap: 'wrap'}}>
                <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px" , width: '100%'}}>
                    <table {...getTableProps()} className="table" style={{backgroundColor: 'white' }}>
                        <thead className="thead">
                            {headerGroups.map((headerGroup, index) => (
                                <tr
                                {...headerGroup.getHeaderGroupProps()}
                                key={index}
                                className="thead-row"
                                >
                                {headerGroup.headers.map((column, index) => (
                                    <th {...column.getHeaderProps()} key={index}>
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
                        <tbody {...getTableBodyProps()} className="tbody">
                            {rows.map((row, index) => {
                                prepareRow(row);
                                return (
                                <tr
                                    {...row.getRowProps()}
                                    key={index}
                                    style={{ padding: "5px" }}
                                >
                                    {row.cells.map((cell, index) => (
                                    <td {...cell.getCellProps()} key={index} style={{padding: '5px'}}>
                                        {cell.render("Cell")}
                                    </td>
                                    ))}
                                </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>    
                {(resize !=false && validation )&& <span style={{marginTop: '4px',fontSize: '13px', color: 'red'}}>Class Capacity must be positive, and with out letters ...</span>}
            </div>  
        </>
    )
}