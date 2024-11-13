import { FormMainContainer, FormRowStyle, FormSelectdStyle, FormStyle, FormSubRowStyle, InputStyle, LabelStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import { useState } from "react";
import ErrorMessage from "../../shared/ErrorMessage";
import DataServices from "../../../Data/dynamic/DataServices";
import Notification from "../../Global/Notification";
import { successActionLogic } from "../../shared/logic/logic";

const initailSubjectState = {
    subject: "",
    grade : '',
    maximumMark: 0,
    subjectType: ''
};

export default function NewSubjectForm() {

    const [subjectForm,setSubjectForm] = useState(initailSubjectState)
    const [successCreateSubject,setSuccessCreateSubject] = useState(false)
    const [validation,setValidation] = useState({
        subject: false,
        grade : false,
        maximumMark: false,
        subjectType: false
    })

    function handleInputChange(value,key) {

        let copyData = new Map()
        copyData = {...subjectForm} 
        copyData[key] = value 
    
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
                    <h3>New subject</h3>
                    <FormRowStyle>  
                        <FormSubRowStyle>
                            <LabelStyle color={'#056699'}>Subject title</LabelStyle>
                            <InputStyle className={validation.subject ? "error" : ""} type="text" value={subjectForm.subject} onChange={(e) =>handleInputChange(e.target.value,'subject')}/>
                            <ErrorMessage showMessage={validation.subject} message={"Pleas enter subject title"}/>
                        </FormSubRowStyle>

                        <FormSubRowStyle>
                            <LabelStyle color={'#056699'}>Subject mark</LabelStyle>
                            <InputStyle type="number" className={validation.maximumMark ? "error" : ""} value={subjectForm.maximumMark} onChange={(e) =>handleInputChange(e.target.value,'maximumMark')}/>
                            <ErrorMessage showMessage={validation.maximumMark} message={"this field is required, and the mark must be positive"}/>
                        </FormSubRowStyle>

                    </FormRowStyle>
                    <FormRowStyle >
                        <FormSubRowStyle width={'100%'}>
                            <LabelStyle color={'#056699'}>Subject grade</LabelStyle>
                            <FormSelectdStyle value={subjectForm.grade} className={validation.grade ? "error" : ""} onChange={(e) => handleInputChange(e.target.value,'grade')}>
                                <option value=""></option>
                                <option value="ninth">Ninth</option>
                                <option value="bachelor">Bachelor</option>
                            </FormSelectdStyle>
                            <ErrorMessage showMessage={validation.grade} message={"Pleas selcet subject grade"}/>
                        </FormSubRowStyle>
                    </FormRowStyle>
                    {
                        subjectForm.grade == 'bachelor' && 
                        <FormRowStyle >      
                            <FormSubRowStyle width={'100%'}>
                                <LabelStyle color={'#056699'}>Subject type</LabelStyle>
                                <InputStyle className={validation.subjectType ? "error" : ""} type="text" value={subjectForm.subjectType} onChange={(e) =>handleInputChange(e.target.value,'subjectType')}/>
                                <ErrorMessage showMessage={validation.subjectType} message={"you must specify subject type"}/>
                            </FormSubRowStyle>
                        </FormRowStyle>
                    }
                    <SubmitBtnStyle > Create</SubmitBtnStyle>
                </FormStyle>
            </FormMainContainer>
        </>
    )
}