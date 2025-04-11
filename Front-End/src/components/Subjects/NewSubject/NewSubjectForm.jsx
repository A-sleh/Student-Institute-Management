import { FormMainContainer, FormRowStyle, FormSelectdStyle, FormStyle, FormSubRowStyle, InputStyle, LabelStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import { useState } from "react";
import ErrorMessage from "../../shared/ErrorMessage";
import DataServices from "../../../Data/dynamic/DataServices";
import Notification from "../../Global/Notification";
import { successActionLogic } from "../../shared/logic/logic";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import { NewSubjectFormText } from "../../../Data/static/Subject/NewSubjectFormTEXT";
import { useSelector } from "react-redux";

const initailSubjectState = {
    subject: "",
    grade : {
        grade: '' ,
        gradeId: ''
    },
    maximumMark: 0
};

export default function NewSubjectForm() {

    // page text content 
    const {currentLange} = useSelector( state => state.language)
    const {title,subjectTitle ,subjectMark ,subjectGrade ,createBtn,validationMessages,successCreateSubjectMES} = NewSubjectFormText[currentLange]
    const {subjectVal ,maxMarkVal ,gradeVal} = validationMessages

 
    const [subjectForm,setSubjectForm] = useState(initailSubjectState)
    const [successCreateSubject,setSuccessCreateSubject] = useState(false)
    const [grades] = useGetAllGrade()
    const [validation,setValidation] = useState({
        subject: false,
        grade : false,
        maximumMark: false
    })

    async function handleInputChange(value,key) {

        let copyData = new Map()

        copyData = {...subjectForm} 
        copyData[key] = value 
    
        setSubjectForm(copyData)
    
    }
    
    function validateInput() {
        const { subject , grade : mainGrade , maximumMark , subjectType } = subjectForm
        const { grade , gradeId } = mainGrade

        setValidation({
            subject: subject == "",
            grade : grade == '',
            maximumMark: maximumMark < 1 || /[^0-9]/.test(maximumMark),
            subjectType: grade == 'bachelor' &&  subjectType == ''
        }) 
        
        return subject == '' || grade == '' || maximumMark < 1 || /[^0-9]/.test(maximumMark) || (grade == 'bachelor' &&  subjectType == '')
    }

    function ManipulateOnObject() {

        let mainpulateOBJ = { initailSubjectState } 
        delete mainpulateOBJ['grade'] 
        mainpulateOBJ = {...initailSubjectState.grade ,...mainpulateOBJ }
    }


    function handleSubmitClicked(e) {
        e.preventDefault() ;

        if(!validateInput()) {
            DataServices.CreateSubject(subjectForm).then( _ => {

                setSubjectForm(ManipulateOnObject())
                successActionLogic(setSuccessCreateSubject)
            })
        }
    }
    
    return (
        <>  
            <Notification title={successCreateSubjectMES} type={"success"} state={successCreateSubject} setState={setSuccessCreateSubject} />
            <FormMainContainer>
                <FormStyle onSubmit={(e)=>handleSubmitClicked(e)}>
                    <h3>{title}</h3>
                    <FormRowStyle>  
                        <FormSubRowStyle>
                            <LabelStyle color={'#056699'}>{subjectTitle}</LabelStyle>
                            <InputStyle className={validation.subject ? "error" : ""} type="text" value={subjectForm.subject} onChange={(e) =>handleInputChange(e.target.value,'subject')}/>
                            <ErrorMessage showMessage={validation.subject} message={subjectVal}/>
                        </FormSubRowStyle>

                        <FormSubRowStyle>
                            <LabelStyle color={'#056699'}>{subjectMark}</LabelStyle>
                            <InputStyle type="number" className={validation.maximumMark ? "error" : ""} value={subjectForm.maximumMark} onChange={(e) =>handleInputChange(e.target.value,'maximumMark')}/>
                            <ErrorMessage showMessage={validation.maximumMark} message={maxMarkVal}/>
                        </FormSubRowStyle>

                    </FormRowStyle>
                    <FormSubRowStyle width={'100%'}>
                        <LabelStyle color={'#056699'}>{subjectGrade}</LabelStyle>
                        <FormSelectdStyle value={encodeURIComponent(JSON.stringify(subjectForm.grade))} className={validation.grade ? "error" : ""} onChange={(e) =>handleInputChange(JSON.parse(decodeURIComponent(e.target.value)),'grade')}>
                            <option value={""}></option>
                            { grades.map((grade,index) => { return <option key={index} value={encodeURIComponent(JSON.stringify(grade))}>{grade.grade}</option> }) }
                        </FormSelectdStyle>
                        <ErrorMessage showMessage={validation.grade} message={gradeVal}/>
                    </FormSubRowStyle>
                    <SubmitBtnStyle > {createBtn}</SubmitBtnStyle>
                </FormStyle>
            </FormMainContainer>
        </>
    )
}