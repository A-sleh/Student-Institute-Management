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
    grade : '',
    gradeId: 0,
    maximumMark: 0,
    subjectType: ''
};

export default function NewSubjectForm() {

    // page text content 
    const {currentLange} = useSelector( state => state.language)
    const {title,subjectTitle ,subjectMark ,subjectGrade,subjectType ,createBtn,validationMessages} = NewSubjectFormText[currentLange]
    const {subjectVal ,maxMarkVal ,subjectTypeVal ,gradeVal} = validationMessages

 
    const [subjectForm,setSubjectForm] = useState(initailSubjectState)
    const [successCreateSubject,setSuccessCreateSubject] = useState(false)
    const [grades] = useGetAllGrade()
    const [validation,setValidation] = useState({
        subject: false,
        grade : false,
        maximumMark: false,
        subjectType: false
    })

    async function handleInputChange(value,key,key1) {

        let copyData = new Map()
        copyData = {...subjectForm} 
        if(key1 != undefined) {
            copyData[key1] =await value.split(' ')[0] 
            copyData[key] = await value.split(' ')[1]
        }else  copyData[key] = value 
    
        setSubjectForm(copyData)
    
    }
    
    function validateInput() {
        const { subject , grade , maximumMark , subjectType } = subjectForm

        setValidation({
            subject: subject == "",
            grade : grade == '',
            maximumMark: maximumMark < 1 || /[^0-9]/.test(maximumMark),
            subjectType: grade == 'bachelor' &&  subjectType == ''
        }) 
        
        return subject == '' || grade == '' || maximumMark < 1 || /[^0-9]/.test(maximumMark) || (grade == 'bachelor' &&  subjectType == '')
    }

    function handleSubmitClicked(e) {
        e.preventDefault() ;

        if(!validateInput()) {
            subjectForm.subject += `.${subjectForm.subjectType}`
            DataServices.CreateSubject(subjectForm).then( _ => {
                setSubjectForm(initailSubjectState)
                successActionLogic(setSuccessCreateSubject)
            })
        }
    }
    
    return (
        <>  
            <Notification title={"create new subject"} type={"success"} state={successCreateSubject} setState={setSuccessCreateSubject} />
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
                        <FormSelectdStyle value={subjectForm.gradeId+' '+subjectForm.grade} className={validation.grade ? "error" : ""} onChange={(e) =>handleInputChange(e.target.value,'grade','gradeId')}>
                            <option value={""}></option>
                            { grades.map((grade,index) => { return <option key={index} value={grade.gradeId+' '+grade.grade}>{grade.grade}</option> }) }
                        </FormSelectdStyle>
                        <ErrorMessage showMessage={validation.grade} message={gradeVal}/>
                    </FormSubRowStyle>
                    {
                        subjectForm.grade == 'bachelor' && 
                        <FormRowStyle >      
                            <FormSubRowStyle width={'100%'}>
                                <LabelStyle color={'#056699'}>{subjectType}</LabelStyle>
                                <InputStyle className={validation.subjectType ? "error" : ""} type="text" value={subjectForm.subjectType} onChange={(e) =>handleInputChange(e.target.value,'subjectType')}/>
                                <ErrorMessage showMessage={validation.subjectType} message={subjectTypeVal}/>
                            </FormSubRowStyle>
                        </FormRowStyle>
                    }
                    <SubmitBtnStyle > {createBtn}</SubmitBtnStyle>
                </FormStyle>
            </FormMainContainer>
        </>
    )
}