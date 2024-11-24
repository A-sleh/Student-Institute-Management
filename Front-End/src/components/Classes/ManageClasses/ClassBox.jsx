/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { useEffect, useMemo, useRef, useState } from "react"
import { errorActionLogic, successActionLogic } from "../../shared/logic/logic"
import { ClassColumns } from "../TableTools/ClassColumns"
import { useNavigate } from "react-router-dom"
import DataServices from "../../../Data/dynamic/DataServices"
import Notification from "../../Global/Notification"
import Table from "../../shared/Table";

export default function  ClassBox({currentClass,numberOfSelectedStudents,selectedStudents}) {

    // Notification states
    const [successUpdate,setSuccessUpate] = useState(false) ;
    const [classWarning,setClassWarning] = useState(false);
    const [successMoveStudents,setSuccessMoveStudents] = useState(false) ;
    // Data State
    const [classes,setClasses] = useState([]) ; 
    const [capacity,setCapacity] = useState(0)
    // Logic states
    const capacityInput = useRef(null)
    const [validation,setValidation] = useState(false) 
    const [resize,setResize] = useState(false)
    const gotoManageClassPage = useNavigate() ;
    const [_,setReRender] = useState(0)
    
    useEffect(() => {
        DataServices.showCalsses().then((Classes) => {
            setClasses( Classes.filter((Class) => {
                return Class.classId != currentClass ;
            }))
        })
    } , [successUpdate] )

    // to keep focus on the input field
    useEffect(()=>{setReRender(1)},[capacity])

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
                        { 
                            resize != row.original.classId ? 
                            <button onClick={()=>{handleSelectClassClicked(row.original,numberOfSelectedStudents)}} style={{padding: '0px 5px' , fontSize: '12px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: '#066599' , borderRadius: '2px' , cursor: 'pointer'}}>Select</button> : ''
                        }
                        <button onClick={() =>{
                            resize == row.original.classId ? handleApplyResizeClicked(row.original) : handleResizeClicked(row.original.classId,row.original.capacity)  
                        }} style={{padding: '0px 5px' , fontSize: '12px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: '#009744' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>{resize == row.original.classId ? 'Apply' : 'Resize Capacity'}</button>
                        {
                            row.original.classId == resize ? <button onClick={()=>{handleCancelClicked()}} style={{padding: '0px 5px' , fontSize: '12px' , outline: 'none' , border: 'none' , color : 'white' , backgroundColor: 'red' ,marginLeft: '5px', borderRadius: '2px' , cursor: 'pointer'}}>Cancel</button> : ''
                        }
                    </>
                )
            }
        }
    ],[numberOfSelectedStudents,resize,capacity])

    function handleInputChange(value) {
        setCapacity(value) 
    }
    
    function handleCancelClicked() {
        setResize(false)
        setValidation(false)
    }

    function handleResizeClicked(classId,capacity) {
        setCapacity(`${capacity}`)
        setResize(classId)
    } 
    
    function handleApplyResizeClicked(Class) {

        const vaildInput = /[^0-9]/.test(capacity)
        if(vaildInput) {
            errorActionLogic(setValidation)
            return
        }
        
        if(!vaildInput) {
            const newClass = {...Class , capacity : +capacity}
            DataServices.UpdateClass(newClass).then((_) => {
                successActionLogic(setSuccessUpate)
                setResize(false)
            });
        }
        
    }

    function changeStudentClassId(toClass) {
        return new Promise(async(resolve)=> {
            await selectedStudents.map((student) => {
                const newStudentDetails = {...student , class: { classId : toClass } }
                DataServices.UpdateStudent(newStudentDetails)
            })
            resolve('done')
        })
    }

    function handleSelectClassClicked(Class,numberOfSelectedStudents) {
        
        const classStudentsNumber = Class.students.length - (Class.students[0] == null )

        if( Class.capacity < ( numberOfSelectedStudents + classStudentsNumber) ) {
            errorActionLogic(setClassWarning)
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
            <Notification title={'The capacity must be positive'} type={'error'} state ={resize !=false && validation} setState={setValidation} />
            <Notification title={'Been transfer students successfully'} type={'success'} state ={successMoveStudents} setState={setSuccessMoveStudents} />
            <Notification title={'Update class capacity'} type={'success'} state ={successUpdate} setState={setSuccessUpate} />
            <Table data={classes} column={columns} showMainHeader={false} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}} />
        </>
    )
}