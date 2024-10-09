import { useEffect, useRef, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices";
import { FormInputContainerStyle, FormInputFieldStyle, FormRowStyle, FormSelectdStyle, LabelInputStyle } from "../EmentsStyle";
import Notification from "../../../Global/Notification";


export default function CreateTestForm({form,setForm,initailState}) {
    
    const [testType,setTestType] = useState('bachelor')
    const [subjects,setSubjects] = useState([]) ; 
    const [successCreateTest,setSuccessCreateTest] = useState(false)
    const [validation,setValidation] = useState({
        subject : false ,
        testType : false ,
        date : false ,
    })
    
    useEffect(() => {
        DataServices.ShowAllSubject().then( subjects => {
            setSubjects(
                subjects.filter( subject => {
                    return subject.grade == testType ;
                })
            )
        })
    },[testType])

    function handleToggleGrade() {
        setTestType(c => c == 'ninth' ? 'bachelor' : 'ninth' ) ;
        setForm({...form,subject:{subjectId : '' }})
    }

    function validInputs() {
        const { date , testType , subject } = form

        setValidation({
            subject : subject.subjectId == '' ,
            testType : testType == '' ,
            date : date == '' ,
        })
        return date == '' || testType == '' || subject.subjectId == ''
    }


    function handleSubmitClicked(e) {
        e.preventDefault() ;

        if(!validInputs()) {
            DataServices.CreateNewTest(form).then( _ => {
                setForm(initailState)
                setSuccessCreateTest(true)
                setTimeout(() => {
                    setSuccessCreateTest(false)
                } , 2000 )
            })
        }
    }

    return(
    <>
        <Notification title={'create test'} type={'success'} state ={successCreateTest} setState={setSuccessCreateTest}/>
        <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , borderRadius: '5px', flex: '1'}}>
            <h3 style={{fontSize: '1.3em' , color: '#0e0b0b' , marginBottom: '10px'}}>Test Details</h3>
            <form style={{display: 'flex' , flexDirection: 'column'}} onSubmit={(e)=>{handleSubmitClicked(e)}}>
                    <FormRowStyle>
                        <FormInputContainerStyle >
                            <LabelInputStyle>Grade</LabelInputStyle>
                            <div style={{display:'flex' , alignItems:'center' , backgroundColor: 'white' , padding: '10px' , borderRadius: '3px'}}>
                                <input type="radio"  id="bachelor" checked={testType == 'bachelor'}onChange={handleToggleGrade} style={{boxShadow: 'none', cursor:'pointer'}}/>
                                <LabelInputStyle htmlFor="bachelor" style={{ marginLeft: '5px', cursor:'pointer'}}>Bachelor</LabelInputStyle>
                                <input type="radio"  id="ninth" checked={testType == 'ninth'} onChange={handleToggleGrade} style={{boxShadow: 'none' , marginLeft: '30px', cursor:'pointer'}}/>
                                <LabelInputStyle htmlFor="ninth" style={{ marginLeft: '5px', cursor:'pointer'}}>Ninth</LabelInputStyle>
                            </div>
                        </FormInputContainerStyle>
                    </FormRowStyle>

                    <FormRowStyle>
                        <FormInputContainerStyle>
                            <LabelInputStyle>Subjects</LabelInputStyle>
                            <div style={{display: 'flex',position: 'relative' , gap: '5px' , flexWrap: 'wrap' , backgroundColor: 'white' , padding: '15px'}}>
                                {
                                    subjects.map( (subject,index) => {
                                        return <SubjectTageShow subject={subject} setForm={setForm} selectedSubject={form.subject.subjectId}  delay={index*100}/>
                                    })
                                }
                            </div>
                            { validation.subject && <span style={{marginTop: '4px' , fontSize: '1em' , color: 'red' , transition: '.3s'}}>You must chose  subject</span>}
                        </FormInputContainerStyle>
                    </FormRowStyle>

                    <FormRowStyle>

                        <FormInputContainerStyle>
                            <LabelInputStyle>Date</LabelInputStyle>
                            <FormInputFieldStyle type="date" className={validation.date ? 'error': ''} value={form.date} onChange={(e) => setForm({...form,date: e.target.value})}/>
                            { validation.date && <span style={{marginTop: '4px' , fontSize: '1em' , color: 'red' , transition: '.3s'}}>You must determain the test date</span>}
                        </FormInputContainerStyle>

                        <FormInputContainerStyle style={{marginLeft: '10px'}}>
                            <LabelInputStyle >Test Type</LabelInputStyle>
                            <FormSelectdStyle className={validation.testType ? 'error': ''} value={form.testType} onChange={(e)=>{setForm({...form,testType: e.target.value})}}>
                                <option value=""></option>
                                <option value="QUIZ">QUIZ</option>
                                <option value="EXAM">EXAM</option>
                                <option value="REVISION">REVISION</option>
                                <option value="FINAL">FINAL</option>
                            </FormSelectdStyle>
                            { validation.testType && <span style={{marginTop: '4px' , fontSize: '1em' , color: 'red' , transition: '.3s'}}>You must select test type</span>}
                        </FormInputContainerStyle>

                    </FormRowStyle>
                    <input type="submit" value="Create" style={{width: 'fit-content' , margin: '10px 0'}}/>
            </form>
        </div>
    </>
    )
}


function SubjectTageShow({subject,setForm,selectedSubject,delay}) {

    const [showTage,setShowTage] = useState(false);
    const handleSubjectClicked = (subjectId) => {
        setForm( lastForm => ({...lastForm , subject : {subjectId:subjectId , subject: subject.subject , grade : subject.grade}}))
    }

    useEffect(() => {
        setTimeout(() => {
            setShowTage(true)
        } , delay)
    },[])


    return <span onClick={()=>handleSubjectClicked(subject.subjectId)} style={{cursor: 'pointer' , padding: '5px 15px' , borderRadius: '3px' , fontWeight: '500',opacity: showTage ? '1' : '0' , backgroundColor: selectedSubject == subject.subjectId ? '#066599' : '#f3f1f1d7' , color : selectedSubject == subject.subjectId ? 'white' : 'black' ,transition: '.4s' }}>{subject.subject}</span>

}