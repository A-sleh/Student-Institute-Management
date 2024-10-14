import { useEffect, useRef, useState } from "react";
import { HeaderControlOnTestClasses } from "../ShowAllTest/ShowAllTest";
import ClassesContainer from "./ClassesContainer";
import TestsContainer from "./TestsContainer";
import DataServices from "../../../../Data/dynamic/DataServices";
import Notification from "../../../Global/Notification";


export default function ManageTest() {

    const classesTableRef = useRef(null)
    const [grade,setGrade] = useState('bachelor');
    const [testType,setTestType] = useState('All') ;
    const [filterBySubject,setFilterBySubject] = useState('All')
    const [subjects,setSubjects] = useState([]) ;
    const [successLinkTests,setSuccessLinkTests] = useState(false);
    const [wornning,setWornning] = useState(false)
    const [requestData,setRequestData] = useState({
        classesIds: [] ,
        testId: ''
    })

    useEffect(() => {
        DataServices.ShowAllSubject().then( subjects => {
            setSubjects(subjects.filter( subject => {
                return grade == 'All' || grade.toLocaleLowerCase() == subject.grade.toLocaleLowerCase()
            }))
        })
    } ,[grade])


    async function linkClassesWithTest() {
        return new Promise( resolve => {
            
            const {testId,classesIds} = requestData
            if(classesIds?.length == 0 || testId == '') resolve(400)
            classesIds.map( (classId,index) => {
                DataServices.ClassTestLink(classId,testId)

                if(index == classesIds?.length - 1 ) {
                    resolve('done')
                }
            })
        })
    }

    function handleConfirmclicked() {
        linkClassesWithTest().then( res => {
            if(res > 299 ) {
                setWornning(true);
                setTimeout(() => {
                    setWornning(false)
                } ,2000 )
            }else {
                setRequestData({
                    classesIds: [] ,
                    testId: ''
                })
                classesTableRef?.current?.click();
                setSuccessLinkTests(true);
                setTimeout(() => {
                    setSuccessLinkTests(false )
                } ,2000 )
            }
        })
    }

    return( 
        <>
            <Notification title={'linked test with classes'} type={'success'} state ={successLinkTests} setState={setSuccessLinkTests}/>
            <Notification title={'You must select at least one class and test'} type={'error'} state ={wornning} setState={setWornning}/>
            <HeaderControlOnTestClasses grade={grade} testType={testType} filterBySubject={filterBySubject} setGrade={setGrade}setTestType={setTestType}setFilterBySubject={setFilterBySubject}subjects={subjects} type={'manage'} />
            <div style={{display: 'flex', gap: '10px'}}>
                <TestsContainer testType={testType} filterBySubject={filterBySubject} grade={grade} setRequestData={setRequestData} requestData={requestData}/>
                <div>
                    <ClassesContainer classesTableRef={classesTableRef} successLinkTests={successLinkTests} testType={testType} filterBySubject={filterBySubject} grade={grade} setRequestData={setRequestData} requestData={requestData}/>
                    <button style={{padding: '4px 15px' , cursor: 'pointer' , backgroundColor: '#066599' , border: 'none' , outline: 'none' ,fontWeight: '500' , borderRadius: '4px' , color : 'white' , margin: '10px 0'}} onClick={()=>{handleConfirmclicked()}}>Confirm</button>
                </div>
            </div>
        </>
    )
}