import { useLocation, useNavigate, useParams } from "react-router-dom"
import { TESTCOLUMNS } from "../ShowAllTest/testColumns";
import { useSortBy, useTable } from "react-table/dist/react-table.development";
import { useEffect, useMemo, useState } from "react";
import DataServices from "../../../../Data/dynamic/DataServices";
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects";
import { FormInputFieldStyle } from "../EmentsStyle";
import Notification from "../../../Global/Notification";

export default function TestClassCurrent() {

    const classId = useParams().classId; // i will use this id to get all tests for the current class ,But the endpoint needed to build
    const grade = useLocation().state.grade
    const classTitle = useLocation().state.classTitle
    const componentType = useLocation().state.type
    const gotoPage = useNavigate()
    const [tests,setTset] = useState([])
    const [dateSearch,setDateSearch] = useState('')
    const column = useMemo(()=>TESTCOLUMNS,[])
    const [filterBySubject,setFilterBySubject] = useState('All')
    const [testType,setTestType] = useState('All') ;
    const [subjects,setSubjects] = useState([]) ;
    const [testState,setTestState] = useState(false)
    const [markNotCorrectionYet,setMarkNotCorrectionYet] = useState(false)

    useEffect(() => {
        DataServices.ShowAllSubject().then( subjects => {
            setSubjects(subjects.filter( subject => {
                return grade.toLocaleLowerCase() == subject.grade.toLocaleLowerCase()
            }))
        })
    } ,[])


    useEffect(() => {
        DataServices.ShowCurrentClassTests(classId).then( tests => {
            setTset(tests.filter(test => {
                if ((dateSearch != '' && ( new Date(dateSearch) - new Date(test.date)) < 0 )) return false
                return ((testState && test.correctionDate == null) || (!testState && test.correctionDate != null))&&(testType == 'All' || testType.toLowerCase() == test.testType.toLocaleLowerCase() ) && (filterBySubject == 'All' || filterBySubject.toLocaleLowerCase() == test.subject.subject.toLowerCase())
            }))
        })
    } ,[testType,filterBySubject,dateSearch,testState])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
    {
        data: tests,
        columns: column,
    },
    useSortBy,
    );

    function handleClassRowClicked(test) {
        
        const {testType,date,subject,testId,correctionDate} = test
        if( componentType == 'show' && correctionDate == null ) {
            setMarkNotCorrectionYet(true)
            setTimeout(() => {
                setMarkNotCorrectionYet(false)
            }, 2000 )
        }
        else gotoPage(`/Test/StudentMarkForm/${testId}`,{state:{classId:classId,testType:testType,subject:subject.subject,date:date,grade:grade,classTitle:classTitle,componentType:componentType}});
    }


    return (   
        <>     
            <Notification title={'The mark not correction yet'} type={'error'} state ={markNotCorrectionYet} setState={setMarkNotCorrectionYet} />
            <HeaderFilterTable  testType={testType} filterBySubject={filterBySubject} setTestType={setTestType} setFilterBySubject={setFilterBySubject} subjects={subjects}  dateSearch={dateSearch}setDateSearch={setDateSearch}/>
            <h3 style={{backgroundColor: '#066599',padding: '20px 10px 0 10px' , textAlign: 'left' , color: 'white' , fontSize: '1.3em',fontWeight: '400'}}>
                {grade} / {classTitle} / Tests
                <span style={{float: 'right'}}>
                    <button style={{backgroundColor: 'transparent' , border: 'none' , outline: 'none' , color: 'white',cursor: 'pointer', fontWeight: testState ? '300': '500' , marginLeft: '15px' , fontSize: '18px'}} onClick={()=>setTestState(false)}>Show correction test</button>
                    <button style={{backgroundColor: 'transparent' , border: 'none' , outline: 'none' , color: 'white',cursor: 'pointer', fontWeight: testState ?  '500': '300' , marginLeft: '15px' , fontSize: '18px'}} onClick={()=>setTestState(true)}>Show uncorrection test</button>
                </span>
            </h3>
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
                <table {...getTableProps()} >    
                <thead style={{position: 'relative' , top: '-10px' }}>
                    {headerGroups.map((headerGroup, index) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                        {headerGroup.headers.map((column, index) => (
                        <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                            key={index}
                            style={{...thStyle,border: 'none' , padding: '15px' }}
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
                    {rows.map((row, index) => {
                        prepareRow(row);
                        
                        return (
                            <tr className="hovering-row" {...row.getRowProps()}  style={{cursor: 'pointer'}} key={index} onClick={()=> handleClassRowClicked(row.original)}>
                            {row.cells.map((cell, index) => (
                                <td {...cell.getCellProps()} key={index} style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>
                                {cell.render("Cell")}
                                </td>
                            ))}
                            </tr>
                        );
                    })}
                </tbody>
                </table>
            </div>
            <button onClick={()=>{gotoPage(-1)} } style={{padding: '4px 20px',cursor: 'pointer' , color: 'white' , backgroundColor: 'red' , border: 'none' , outline: 'none' , borderRadius: '2px' , margin: '10px 0'}}>Back</button>
        </>
    )
}
function HeaderFilterTable(props) {

    const {testType,setTestType,filterBySubject,setFilterBySubject,subjects,dateSearch,setDateSearch} = props

    return(
        <div style={{display: 'flex',gap:'10px' ,backgroundColor: '#ddd' , padding: '4px 10px' , borderRadius: '4px' , marginBottom: '10px' }}>
            <div style={{width: '100%'}}>
                <h1 style={{fontSize: '18px' , marginRight: '10px'}}>Test start from date</h1>
                <FormInputFieldStyle type="date" value={dateSearch} onChange={(e)=>{setDateSearch(e.target.value)}} style={{width: '100%',backgroundColor: 'white'}}/>

            </div>
            <div style={{width: '100%'}}>
                <h1 style={{fontSize: '18px' , marginRight: '10px'}}>Test Type</h1>
                <select value={testType} onChange={(e)=>{setTestType(e.target.value)}} style={{width: '100%',padding : '4px 10px' ,border: 'none' , outline: 'none' , fontSize: '18px' , marginBottom: '10px'}}>
                    <option value="All" style={{fontSize: '15px' }}>All</option>
                    <option value="FINAL" style={{fontSize: '15px' }}>FINAL</option>
                    <option value="REVISION" style={{fontSize: '15px' }}>REVISION</option>
                    <option value="EXAM" style={{fontSize: '15px' }}>EXAM</option>
                    <option value="QUIZ" style={{fontSize: '15px' }}>QUIZ</option>
                </select>
            </div>
            <div style={{width: '100%'}}>
                <h1 style={{fontSize: '18px' , marginRight: '10px'}}>Subject</h1>
                <select value={filterBySubject} onChange={(e)=>{setFilterBySubject(e.target.value)}} style={{width: '100%',padding : '4px 10px' ,border: 'none' , outline: 'none' , fontSize: '18px' , marginBottom: '10px'}}>
                    <option value="All" style={{fontSize: '15px' }}>All</option>
                    {
                        subjects.map( subject => {
                            return <option value={subject.subject} style={{fontSize: '15px', display: 'flex'  }}> <span> {subject.subject}</span> <span style={{alignSelf: 'flex-start'}}> / {subject.grade}</span> </option>
                        })
                    }
                </select>   
            </div>
        </div>
    )
}