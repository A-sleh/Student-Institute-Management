import { useEffect, useMemo, useState } from "react";
import Title from "../../Global/Title";
import { TableHeaderControal, TeacherHeader } from "./TeacherNewSubject";
import DataServices from "../../../Data/dynamic/DataServices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRowSelect, useTable } from "react-table";
import { theadThStyle } from "../../Global/globalStyle";
import Notification from "../../Global/Notification";

export default function TeacherNewClass() {

    const teacherId = useParams().id ;  
    const classId = useLocation()?.state?.ClassId || undefined;

    const gotoPreviousPage = useNavigate();
    const [currentSubjectClass,setCurrentSubjectClass] = useState({}) ;
    const [compareGrade,setCompareGrade] = useState(false)
    const [teacherClassAlreadySeleted,setTeacherClassAlreadySeleted] = useState(false)
    const [selectedTeacherClass,setSelectedTeacherClass] = useState([])
    const [selectedSubject,setSelectedSubject] = useState({})
    const [selectedClass,setSelectedClass] = useState({})
    const [teacherDetails,setTeacherDetails] = useState({}) ;
    const [teacherSubjects,setTeacherSubjects] = useState([]);
    const [successAddTeacherToClass,setSuccessAddTeacherToClass] = useState(false) 
    const [classes,setClasses] = useState([]) 

    useEffect(() => {
        DataServices.TeacherInformaion(teacherId).then( teahcerInfo => {
            setTeacherDetails(teahcerInfo)
        })
        DataServices.ShowAllTeacherSubjects(teacherId).then( subjects => {
            setTeacherSubjects(subjects)
        })
        DataServices.showCalsses().then( Classes => {
            setClasses(Classes) ;
            classSubjectsStatus(Classes).then( classSubject => {
                setCurrentSubjectClass(classSubject)
            })
            
        })
    } ,[])
    

    async function classSubjectsStatus(Classes) {
        return new Promise((resolve) => {
            let classSubject = {} ;
            Classes.map( async (Class ,index )=> {
                const subjects = await DataServices.ShowAllCurrentSubjectsInTheClass(Class.classId)

                if( subjects.status ) return
                const classId = Class.classId
                classSubject[classId] = {}
                
                subjects.map( subject => {
                    const key = subject.Subject 
                    classSubject[classId][key] = true 
                })
                if(index == ( Classes.length - 2 )){
                    resolve(classSubject)
                }
            })
        })
    }

    function checkIfTheTeacherClassIsSeleted() {
        let selectedBefore = 0
        selectedTeacherClass.map( (teacherClass) => {
            const {classId,teacherSubjectId} = teacherClass
            selectedBefore |= ( selectedClass.classId == classId && teacherSubjectId == selectedSubject.teacherSubjectId )
        })
        return selectedBefore
    }

    function handleAddClicked() {
        if(selectedClass.grade != selectedSubject.subject.grade) {
            setCompareGrade(true) ;
            setTimeout(() => {
                setCompareGrade(false)
            } , 3000 )
            return ;
        }
        
        if(checkIfTheTeacherClassIsSeleted()) {
            setTeacherClassAlreadySeleted(true) ;
            setTimeout(() => {
                setTeacherClassAlreadySeleted(false)
            } , 3000 )
            return ;
        }
        const {classId,grade,title,gender} = selectedClass ;
        const {teacherSubjectId,subject} = selectedSubject ;
        const Subject_1 = subject.subject
        const status = currentSubjectClass[selectedClass.classId][Subject_1]

        
        setSelectedTeacherClass(
            
            [...selectedTeacherClass,{
                id: selectedTeacherClass.length == 0 ? 1 : selectedTeacherClass[selectedTeacherClass.length - 1].id + 1 , // if the user delete some one and re add it the id will repeate so i use the lastest subject id  added  to aviod this case
                classId: classId, 
                classGrade : grade,
                classTitle : title ,
                classGender : gender,
                teacherSubjectId : teacherSubjectId , 
                subject: Subject_1 ,
                subjectGrade : selectedSubject.subject.grade,
                status :  status == true
            }]
        )
    }

    async function addTeacherToClasses() {
        return new Promise( resolve => {
            selectedTeacherClass.map( (teacherClass , index) => {
                const {teacherSubjectId,classId} = teacherClass
                DataServices.AddTeacherToClass(teacherSubjectId,classId)
                if(index == selectedTeacherClass.length - 1 ) {
                    resolve('done')
                }
            })
        })
    }

    const handleConfirmClicked = () => {
        addTeacherToClasses().then( _ => {
            setSelectedTeacherClass([]) ; 
            setSuccessAddTeacherToClass(true)
            setTimeout(() => {
                setSuccessAddTeacherToClass(false) ;
            } , 2000 )
        })
    }


    return (
        <>
            
            <Notification title={'class grade must be equal the subject grade'} type={'error'} state ={compareGrade} setState={setCompareGrade} />
            <Notification title={'have been seleted already'} type={'error'} state ={teacherClassAlreadySeleted} setState={setTeacherClassAlreadySeleted} />
            <Notification title={'Teacher was added to all selected classes'} type={'success'} state ={successAddTeacherToClass} setState={setSuccessAddTeacherToClass} />
            <Title title={window.location.pathname} />
            <TeacherHeader teacherDetails={teacherDetails}/>
            <div style={{display: 'flex' , gap: '10px' , flexWrap : 'wrap'}}>
                <div style={{flex: '4 1 3em'}}>
                    <SubjectsTable subjects={teacherSubjects} setSelectedSubject={setSelectedSubject} selectedSubject={selectedSubject}/>
                    <ClassesTable classes={classes} setSelectedClass={setSelectedClass} selectedClass={selectedClass}/>
                </div>
                <div style={{flex : '1 2 5em' }}>
                    <TeacherClassSelected selectedTeacherClass={selectedTeacherClass} setSelectedTeacherClass={setSelectedTeacherClass} handleConfirmClicked={handleConfirmClicked}/>
                </div>
            </div>
            <ControlButtons gotoPreviousPage={gotoPreviousPage} handleAddClicked={handleAddClicked}/>
        </>
    )
}


function SubjectsTable({subjects,setSelectedSubject,selectedSubject}) {

    const columns = useMemo(() => [
        {
            Header: 'Subject' ,
            accessor : 'subject.subject'
        },
        {   
            Header: 'Maximum Mark' ,
            accessor : 'subject.maximumMark'
        },
        {   
            Header: 'Grade' ,
            accessor : 'subject.grade'
        },
        {
            Header: 'Select' ,
            id: 'action' ,
            Cell : ({row}) => {
                return <input checked={selectedSubject.teacherSubjectId == row.original.teacherSubjectId} onChange={ () => {setSelectedSubject(row.original)}} type="radio"   />
            }
        }
    ],[selectedSubject])

    const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    selectedFlatRows,
    } = useTable(
    {
        columns: columns,
        data: subjects,
    },
    useRowSelect
    );
    
    return (
        <div style={{ backgroundColor: "#dddddd70",padding: "10px",borderRadius: "5px",}} >
            <h3 style={{ margin: "10px 0" }}>Teacher subjects </h3>
            <table {...getTableProps()}>
                <thead className="thead">
                    {headerGroups.map((headerGroup, index) => (
                        <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={index}
                        className="thead-row"
                        >
                        {headerGroup.headers.map((column, index) => (
                            <th {...column.getHeaderProps()} key={index} style={theadThStyle}>
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
                <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                    <tr {...row.getRowProps()} key={index} style={{backgroundColor: 'white'}}>
                        {row.cells.map((cell, index) => (
                        <td {...cell.getCellProps()} key={index} style={{padding: '5px' , border: 'none'}} >
                            {cell.render("Cell")}
                        </td>
                        ))}
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )

}

function ClassesTable({classes,setSelectedClass,selectedClass}) {

    const [filter,setFilter] = useState('all')
    const [hiddenUsedSubject,setHiddenUsedSubject] = useState(false)
    
    const columns = useMemo(() => [
        {
            Header: 'Title' ,
            accessor : 'title'
        },
        {   
            Header: 'Capacity' ,
            accessor : 'capacity'
        },
        {   
            Header: 'Grade' ,
            accessor : 'grade'
        },
        {   
            Header: 'Gender' ,
            accessor : 'gender'
        },
        {
            Header: 'Select' ,
            id: 'action' ,
            Cell : ({row}) => {
                return <input checked={selectedClass.classId == row.original.classId} onChange={(_) => {handleRadioClicked(row.original)}} type="radio" />
            }
        }
    ],[selectedClass])

    const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    rows,
    prepareRow,
    selectedFlatRows,
    } = useTable(
    {
        columns: columns,
        data: classes   ,
    },
    useRowSelect
    );


    function handleRadioClicked(value){
        setSelectedClass(value)
    }

    return(
        <div style={{ backgroundColor: "#dddddd70",padding: "10px",borderRadius: "5px",margin: '5px 0'}} >
            <h3 style={{ margin: "5px 0" }}>All Classes </h3>
            <TableHeaderControal setFilter={setFilter} filter={filter} setHiddenUsedSubject={setHiddenUsedSubject} hiddenUsedSubject={hiddenUsedSubject}  hiddenThis={false}/>
            <table {...getTableProps()}>
                <thead className="thead">
                    {headerGroups.map((headerGroup, index) => (
                        <tr
                        {...headerGroup.getHeaderGroupProps()}
                        key={index}
                        className="thead-row"
                        >
                        {headerGroup.headers.map((column, index) => (
                            <th {...column.getHeaderProps()} key={index} style={theadThStyle}>
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
                <tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row);
                    if( filter == 'ninth' && row.original.grade != filter ) return 
                    if( filter == 'bachelor' && row.original.grade != filter ) return 
                    return (
                        <tr {...row.getRowProps()} key={index} style={{backgroundColor: 'white'}}>
                            {row.cells.map((cell, index) => (
                            <td {...cell.getCellProps()} key={index} style={{padding: '5px' , border: 'none'}} >
                                {cell.render("Cell")}
                            </td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    )

}

function TeacherClassSelected({selectedTeacherClass,setSelectedTeacherClass,handleConfirmClicked}) {

    const handleDeleteClicked = (id) => {
        setSelectedTeacherClass(
            selectedTeacherClass.filter( teacherClass => {
                return teacherClass.id != id    
            })
        )

    }

    return (
        <div style={{ backgroundColor: "#dddddd70",padding: "10px",borderRadius: "5px", height: '100%' , display: 'flex' , flexDirection: 'column' , justifyContent: 'space-between'}} >
            <div>
                <h3 style={{ margin: "5px 0" }}>Teacher Class Seleted</h3>
                <div style={{display: 'flex' , flexWrap: 'wrap' , flexDirection: 'column', gap: '5px'}}>
                    {
                        selectedTeacherClass.map( (teacherClass,index) => {
                            const {id,subject,subjectGrade,classTitle,status} = teacherClass ;
                            return <div style={{  borderLeftWidth: '3px' , borderLeftStyle: 'solid' , borderLeftColor: status ? 'red': '#00ff00' ,padding: '5px 10px' , backgroundColor: 'white' , borderRadius: '5px' , display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
                                        <div><b>{index + 1}:</b> <span style={{fontSize: '0.9em'}}>{subject}-{subjectGrade}-{classTitle}</span></div>
                                        <i onClick={()=>{handleDeleteClicked(id)}}className="bi bi-x-lg" style={{color: 'red' , cursor: 'pointer' , fontWeight: 'bold',fontSize: '0.9em'}}></i>
                                    </div>
                        })
                    }
                </div>
            </div>
            <div>
                <button onClick={handleConfirmClicked} style={{marginRight: '5px',padding: '2px 12px' ,cursor: 'pointer' , border: 'none' , color : 'white' , borderRadius: '4px' , backgroundColor : '#066599' , fontSize: '12px'}}>Confirm</button>
                <button onClick={()=>{setSelectedTeacherClass([])}} style={{padding: '2px 12px' ,cursor: 'pointer' , border: 'none' , color : 'white' , borderRadius: '4px' , backgroundColor : 'red' , fontSize: '12px'}}>Clear All</button>
            </div>
        </div>  
    )
}

function ControlButtons({gotoPreviousPage,handleAddClicked}) {

    return (
        <div style={{margin: '10px 0'}}>
            <button onClick={()=>handleAddClicked()} style={{marginRight: '10px',padding: '4px 20px' ,cursor: 'pointer' , border: 'none' , color : 'white' , borderRadius: '4px' , backgroundColor : '#066599'}}>Add</button>
            <button onClick={()=>{gotoPreviousPage('/ManageTeacher',{replace: true})}} style={{padding: '4px 20px' ,cursor: 'pointer' , border: 'none' , color : 'white' , borderRadius: '4px' , backgroundColor : 'red'}}>Go Back</button>
        </div>
    )
}