/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { FormMainContainer, FormRowStyle, FormSelectdStyle, FormStyle, FormSubRowStyle, InputStyle, LabelStyle, SubmitBtnStyle, TextAreaInputStyle } from "../../../shared/style/styleTag";
import { useEffect, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices";
import Notification from "../../../Global/Notification";
import ErrorMessage from "../../../shared/ErrorMessage";
import SearchBodyList from "../../../shared/SearchBodyList";
import useClasses from "../../../../hooks/useClasses";
import useGetSubjects from "../../../../hooks/useGetSubjects";
import { successActionLogic } from "../../../shared/logic/logic";
import useGetAllGrade from "../../../../hooks/Grade_hooks/useGetAllGrade";


export default function CreateTestForm({form,setForm,initailState,children}) {
    
    const [subjects] = useGetSubjects(form.subject.grade) ; 
    const [searchClass,setSearchClass] = useState('')
    const [selectedClass,setSelectedClass] = useState({title: null})
    const [successCreateTest,setSuccessCreateTest] = useState(false)
    const [grades] = useGetAllGrade()
    const [allClasses] = useClasses(form.subject.grade)
    const [validation,setValidation] = useState({
        subject : false ,
        testType : false ,
        date : false ,
        title: false ,
        Class : false
    })

    // for search feild 
    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => { setTimeout(() => { setFocused(false) },200) }
    
    // services method
    function handleSelectClassClicked(Class) {
        setSelectedClass({
            classId: Class.classId , 
            title : Class.title
        })
        setFocused(false)
    }

    function handleToggleGrade(grade) {
        setSelectedClass({title: null})
        setForm({...form,subject:{subjectId : '',grade:grade.split(' ')[1] , gradeId: grade.split(' ')[0] }})
    }

    function validInputs() {
        const { date , testType , subject ,title } = form

        setValidation({
            subject : subject.subjectId == '' ,
            testType : testType == '' ,
            date : date == '' ,
            Class : selectedClass.title == null,
            title : title == ''

        })
        return date == '' || testType == '' || subject.subjectId == '' || selectedClass.title == null || title == ''
    }

    function handleSubmitClicked(e) {
        e.preventDefault() ;

        if(!validInputs()) {
            DataServices.CreateNewTest(form).then( response => {
                response.json().then( test => {
                    DataServices.ClassTestLink(selectedClass.classId,test.TestId).then( _ => {
                        setForm(initailState)
                        setSearchClass('')
                        setSelectedClass({title: null})
                        successActionLogic(setSuccessCreateTest)
                        setSuccessCreateTest(true)
                    })
                })
            })
        }
    }

    function handleSearchField(value) {
        setSelectedClass({title: null})
        setSearchClass(value) ; 
    }

    return(
        <div>
            <Notification title={'create test'} type={'success'} state ={successCreateTest} setState={setSuccessCreateTest}/>
            <FormMainContainer >
                <FormStyle onSubmit={(e)=>{handleSubmitClicked(e)}}>
                        <h3 >Test Details</h3>

                        <FormRowStyle style={{backgroundColor: 'white' , padding: '10px'}}>
                            <FormSubRowStyle width={'100%'}>
                                <LabelStyle color={'#056699'}>Grade</LabelStyle>
                                <FormSelectdStyle value={form.subject.gradeId +' '+form.subject.grade} className={validation.grade ? "error" : ""} onChange={(e) =>handleToggleGrade(e.target.value)}>
                                    <option value={""}></option>
                                    { grades.map((grade,index) => { return <option key={index} value={grade.gradeId+' '+grade.grade}>{grade.grade}</option> }) }
                                </FormSelectdStyle>
                            </FormSubRowStyle>
                        </FormRowStyle>

                        <FormRowStyle style={{backgroundColor: 'white' , padding: '10px'}}>
                            <FormSubRowStyle width={ '100%' }>
                                <LabelStyle color={'#056699'}>Select the class</LabelStyle>
                                <InputStyle className={validation.Class ? 'error': ''}  type="text" onFocus={onFocus}  onBlur={onBlur}   value={selectedClass.title != null ? selectedClass.title : searchClass} onChange={(e) => handleSearchField(e.target.value)}/>
                                <SearchBodyList searchValue={selectedClass.title != null ? selectedClass.title : searchClass} handleElementClicked={handleSelectClassClicked} data={allClasses} focused={focused}/>
                                <ErrorMessage showMessage={validation.Class} message={"You must selecte the class"}/>
                            </FormSubRowStyle>
                        </FormRowStyle>

                        <FormRowStyle>
                            <FormSubRowStyle width={'100%'}>
                                <LabelStyle color={'#056699'}>Subjects</LabelStyle>
                                <div style={{display: 'flex',position: 'relative' , gap: '5px' , flexWrap: 'wrap' , backgroundColor: 'white' , padding: '13px'}}>
                                    {
                                        subjects.map( (subject,index) => {
                                            return <SubjectTageShow key={index} subject={subject} setForm={setForm} selectedSubject={form.subject.subjectId}  delay={index*100}/>
                                        })
                                    }
                                </div>
                                <ErrorMessage showMessage={validation.subject} message={"You must chose  subject"}/>
                            </FormSubRowStyle>
                        </FormRowStyle>
                        
                        <FormRowStyle>

                            <FormSubRowStyle>
                                <LabelStyle color={'#056699'} >Date </LabelStyle>
                                <InputStyle type="date" className={validation.date ? 'error': ''} value={form.date} onChange={(e) => setForm({...form,date: e.target.value})}/>
                                <ErrorMessage showMessage={validation.date} message={"You must determain the test date"}/>
                            </FormSubRowStyle>

                            <FormSubRowStyle >
                                <LabelStyle color={'#056699'} >Test Type</LabelStyle>
                                <FormSelectdStyle className={validation.testType ? 'error': ''} value={form.testType} onChange={(e)=>{setForm({...form,testType: e.target.value})}}>
                                    <option value=""></option>
                                    <option value="QUIZ">QUIZ</option>
                                    <option value="EXAM">EXAM</option>
                                </FormSelectdStyle>
                                <ErrorMessage showMessage={validation.testType} message={"You must select test type"}/>
                            </FormSubRowStyle>

                        </FormRowStyle>

                        <FormRowStyle>
                            <FormSubRowStyle width={'100%'}>
                                <LabelStyle color={'#056699'} >Test Details</LabelStyle>
                                <TextAreaInputStyle className={validation.title ? 'error': ''} value={form.title} onChange={(e)=>setForm({...form,title: e.target.value})}  />
                                <ErrorMessage showMessage={validation.title} message={"Please enter the details of test"}/>
                            </FormSubRowStyle>
                        </FormRowStyle>

                        <SubmitBtnStyle >Create</SubmitBtnStyle>
                </FormStyle>

                {children}
            </FormMainContainer>
        </div>
    )
}

function SubjectTageShow({subject,setForm,selectedSubject,delay}) {

    const [showTage,setShowTage] = useState(false);
    const handleSubjectClicked = (subjectId) => {
        setForm( lastForm => ({...lastForm , subject : { ...lastForm.subject, subjectId:subjectId , subject: subject.subject }}))
    }

    useEffect(() => { 
        setTimeout(() => { setShowTage(true) } , delay)
    },[])


    return <span onClick={()=>handleSubjectClicked(subject.subjectId)} style={{cursor: 'pointer' , padding: '5px 13px' , borderRadius: '3px' , fontWeight: '500',opacity: showTage ? '1' : '0' , backgroundColor: selectedSubject == subject.subjectId ? '#066599' : '#f3f1f1d7' , color : selectedSubject == subject.subjectId ? 'white' : 'black' ,transition: '.4s' }}>{subject.subject}</span>

}


