import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams} from 'react-router-dom'
import Title from "../../Global/Title";
import DataServices from "../../../Data/dynamic/DataServices";
import { useAsyncDebounce, useRowSelect, useTable } from "react-table";
import Notification from "../../Global/Notification";


export default function TeacherNewSubject() {

    const gotoPreviousPage = useNavigate();
    const teacherId = useParams().id;
    const [allsubjects,setAllsubjects] = useState([]) ;
    const [teacherDetails,setTeacherDetails] = useState({}) ;
    const [filter,setFilter] = useState('all')
    const [hiddenUsedSubject,setHiddenUsedSubject] = useState(false)
    const [successAdd,setSuccessAdd] = useState(false)
    const [emptySeletedRows,setEmptySeletedRows] = useState(false) ;
    const [salaryValidation,setSalaryValidation] = useState(false)
    const [selectedSubjects,setSelectedSubjects] = useState([])
    
    useEffect( ()=> {
        const useedSub = {}
        DataServices.TeacherInformaion(teacherId).then( teacherInfo => {
            teacherInfo.teacherSubjects.map(subject => {
                useedSub[subject.subject.subjectId] = true ;
            }) 
            setTeacherDetails(teacherInfo)
            DataServices.ShowAllSubject().then( subjects => {
                const subjectsMaping = subjects.map( subject => {
                    return {... subject , isUsed : useedSub[subject.subjectId] == true ? true : false }
                }) 
                setAllsubjects(subjectsMaping)
            })
        })
    } ,[successAdd])


    const columns = useMemo(() => [
        ...COLUMN() ,
        {
            Header : 'Status' ,
            id: 'Action' ,
            Cell : ({row}) => {
                return (
                    row.original.isUsed ?
                    <span style={{padding: '2px 15px' , fontSize : '11px' , fontWeight: '600', color: 'red' , borderRadius: '4px' , backgroundColor: '#ff000057'}}>Used</span>
                    :
                    <input type='checkbox' style={{cursor: 'pointer'}} {...row.getToggleRowSelectedProps()} />
                )
            }
        }
    ],[successAdd])
    
    
    const {
        getTableProps,
        headerGroups ,
        getTableBodyProps,
        rows,
        prepareRow,
        selectedFlatRows,
    } = useTable(
        {
            columns: columns,
            data: allsubjects,
        },
        useRowSelect
    );

    useEffect(()=> {
        setSelectedSubjects(selectedFlatRows)
    },[selectedFlatRows])
    

    async function addSubjectsToTeacher(subjectsSelected) {
        return new Promise( async resolve => {
            await subjectsSelected.map( subject => {
                const subjectId = subject.original.subjectId 
                const obj = {
                    subject : {
                        subjectId: subjectId ,
                    },
                    salary : subject.salary
                }
                DataServices.AddNewSubjectsForTeacher({teacher:{teacherId:+teacherId},...obj})
            })
            resolve('done')
        })
    }

    function handleAddClicked() {
        if(selectedFlatRows.length == 0 ) {
            setEmptySeletedRows(true) 
            setTimeout(() =>{ 
                setEmptySeletedRows(false)
            } , 2000 )
            return             
        }
        let checkSalary = 0 ;
        selectedSubjects.map( subject => {
            checkSalary |= (subject?.salary == '' || subject.unValid || subject.salary == undefined ) ;
        })

        if( checkSalary ) {
            setSalaryValidation(true) 
            setTimeout(() =>{ 
                setSalaryValidation(false)
            } , 3000 )
            return  
        }

        addSubjectsToTeacher(selectedSubjects).then(_ => {
            setSuccessAdd(true)
            setTimeout(() => {
                setSuccessAdd(false)
            } ,2000 )
        })
    }

    function handlChangeInput(value,id) {

        const newSelected = selectedSubjects.map( (row,index) => {
            return row.id == id ? {...row, salary : value , unValid : ( value < 1 || /[^0-9]/.test(value))} : row
        })
        setSelectedSubjects(newSelected)
    }

    return (
        <>
        
            <Notification title={'Add Subjects'} type={'success'} state ={successAdd} setState={setSuccessAdd} />
            <Notification title={'You must select one subject at lest'} type={'error'} state ={emptySeletedRows} setState={setEmptySeletedRows} />
            <Notification title={'You must enter the salary for all sujbects selected, and with out letters'} type={'error'} state ={salaryValidation} setState={setSalaryValidation} />
            <Title title={window.location.pathname}/>
            <TeacherHeader teacherDetails={teacherDetails}/>
            <div  style={{ backgroundColor: "#dddddd70", padding: "10px 10px 20px 10px",borderRadius: "5px",margin: '10px 0'}}>
                <h3 style={{margin: '5px 0 10px 0'}}>Choose the subjects you want to add it </h3>
                <TableHeaderControal setFilter={setFilter} filter={filter} setHiddenUsedSubject={setHiddenUsedSubject} hiddenUsedSubject={hiddenUsedSubject} hiddenThis={true}/>
                <table {...getTableProps()} >
                    <thead>
                        {headerGroups.map((headerGroup, index) => (
                            <tr
                            {...headerGroup.getHeaderGroupProps()}
                            key={index}
                            className="thead-row"
                            >
                            {headerGroup.headers.map((column, index) => (
                                <th {...column.getHeaderProps()} key={index} style={{padding: '8px 0' , fontSize: '15px' , backgroundColor : 'white', fontWeight: '600'  , color: '#066599'}}>
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
                    
                    <tbody {...getTableBodyProps()} style={{position: 'relative' , top: '10px'}}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        if( filter == 'ninth' && row.original.grade != filter ) return 
                        if( filter == 'bachelor' && row.original.grade != filter ) return 
                        if( hiddenUsedSubject && row.original.isUsed ) return
                        return (          
                            <tr {...row.getRowProps()} key={index} style={{backgroundColor: index % 2 ? 'white' : '#dddddd70' }}>
                                {row.cells.map((cell, index) => (
                                <td {...cell.getCellProps()} key={index} style={{padding: '8px' , border: 'none' , fontSize: '14px' ,  fontWeight: '500'}} >
                                    {cell.render("Cell")}
                                </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <div style={{ backgroundColor: "#dddddd70", padding: "10px 10px 20px 10px",borderRadius: "5px",margin: '10px 0'}}>
                <h4 style={{margin: '5px 0 10px 0', }}> <span style={{color : 'red' }}>*</span> Subject selected, Just set the salary </h4>
                <div style={{display: 'flex' , gap: '10px', backgroundColor : 'white' , padding: '10px' , flexWrap: 'wrap'}}> 
                    { 
                        selectedSubjects.map(subject => {
                            return {...subject , salary : subject?.salary || '' , unValid : subject?.unValid || false };
                        }).map( (subject,index) => {
                            return (
                                <div key={index} style={{}}>
                                    <span style={{fontSize: '15px' , fontWeight: '600'}}>{+subject.id + 1 }: </span>
                                    <span>{ subject.original.subject} </span>
                                    <span><span style={{fontWeight: '600'}}>/</span> {subject.original.grade}</span>
                                    <input type="text" value={subject.salary} onChange={(e)=>handlChangeInput(e.target.value,subject.id)}  style={{border: 'none' , outline: 'none', marginLeft: '10px' , padding: '0px 15px' ,width: '8rem' , color: subject.unValid ? 'red' : 'black' , caretColor: 'black'}} placeholder="Salary..."/>
                                </div>
                            )
                        })
                    }
                </div>
                
            </div>
            <div >
                <button onClick={()=>{handleAddClicked()}} style={{marginRight: '10px',padding: '4px 20px' ,cursor: 'pointer' , border: 'none' , color : 'white' , borderRadius: '4px' , backgroundColor : '#066599'}}>Add</button>
                <button onClick={()=>{gotoPreviousPage('/ManageTeacher',{replace: true})}} style={{padding: '4px 20px' ,cursor: 'pointer' , border: 'none' , color : 'white' , borderRadius: '4px' , backgroundColor : 'red'}}>Go Back</button>
            </div>
        </>
    )
}



export function TeacherHeader({teacherDetails}) {
    const { name , lastName ,  phone , teacherSubjects } = teacherDetails ;
    return (
        <div style={{ width: '100%' , padding: '10px 15px' , color: 'white' , backgroundColor: '#066599' , borderRadius: '0 5px' , display: 'flex' , alignItems: 'center' , justifyContent: 'space-around' , margin: '20px 0'}}>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>First Name <span style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{name} </span></h4>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>Last Name <span  style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{lastName}</span></h4>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>Phone <span  style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{phone}</span></h4>
            <h4 style={{fontSize: '18px' , fontWeight: '600'}}>Subjects Number <span  style={{fontSize : '16px' ,fontWeight: '400' , marginLeft: '4px'}}>{teacherSubjects?.length}</span></h4>
        </div>
    )
}

function COLUMN() {
    return [
        {   
            Header: 'Id' ,
            Cell : ({row}) => {
                return +row.id + 1 ;
            }
        },
        {
            Header : 'Subject' ,
            accessor : 'subject'
        },
        {    
            Header : 'Grade' ,
            accessor : 'grade'
        },
        {    
            Header : 'Maximum Mark' ,
            accessor : 'maximumMark'
        }
    ]
}

export function TableHeaderControal(props) {
    const {setFilter,filter,setHiddenUsedSubject,hiddenUsedSubject} = props
    return (
        <div style={{ width: '100%' , padding: '6px 15px' , color: 'white' , backgroundColor: '#066599' , borderRadius: '5px 5px 0 0' , display: 'flex' , alignItems: 'center' , justifyContent: 'space-between' }}>
            <div style={{display: 'flex' , gap: '20px' , alignItems: 'center' }}>
                <h4 style={{fontWeight: '500' , letterSpacing: '1px' , fontSize: '18px'}}>Filtering by</h4>
                <ul style={{}}>
                    <span onClick={() => {setFilter('all')}} style={{fontSize: '16px',marginRight: '10px' , cursor: 'pointer' , fontWeight: filter == 'all' ? '600': '300' }}>All</span>
                    <span onClick={() => {setFilter('ninth')}} style={{fontSize: '16px',marginRight: '10px' , cursor: 'pointer' , fontWeight: filter == 'ninth'? '600': '300' }}>Ninth</span>
                    <span onClick={() => {setFilter('bachelor')}} style={{fontSize: '16px',marginRight: '10px' , cursor: 'pointer' , fontWeight: filter == 'bachelor' ? '600': '300'}}>Bachelor</span>
                </ul>
            </div>
            {
                props.hiddenThis &&
                <div onClick={()=> {setHiddenUsedSubject(c => !c)}} style={{fontSize: '16px',cursor: 'pointer' , fontWeight: hiddenUsedSubject ? '600': '300' }}>
                    Hide the subjects used
                </div>
            }
        </div>
    )
}