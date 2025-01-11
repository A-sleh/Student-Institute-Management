import { FormMainContainer, FormRowStyle, FormStyle, FormSubRowStyle, InputStyle, LabelStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import { useState } from "react";
import Notification from "../../Global/Notification";
import ErrorMessage from "../../shared/ErrorMessage";
import DataServices from "../../../Data/dynamic/DataServices";
import { successActionLogic } from "../../shared/logic/logic";
import { NewGradeFormTEXT } from "../../../Data/static/Grade/NewGradeFormTEXT"; 
import { useSelector } from "react-redux";

export default function NewGradeForm() {

    const {currentLange} = useSelector( state => state.language)
    const {title , gradeTitle ,createBtn ,successCreateGradeMES ,validationMessages } = NewGradeFormTEXT[currentLange]
    const {gradeTitleVal} = validationMessages


    const initailInput = {grade : ''}
    const [successCreate,setSuccessCreate] = useState(false)
    const [input,setInput] = useState(initailInput) 
    const [validInputs,setValidInputs] = useState(false)

    function areValidInputs() {

        setValidInputs(input.grade == '')
        return input.grade != ''
    }

    function handleSubmitClicked(e) {
        e.preventDefault() 

        if(areValidInputs()) {
            DataServices.CreateNewGrade(input).then( _ => {
                setInput(initailInput)
                successActionLogic(setSuccessCreate)
            })
        }

    }
    
    return(
        <>
            <Notification title={successCreateGradeMES} type={"success"} state={successCreate} setState={setSuccessCreate} />
            <FormMainContainer>
                <FormStyle onSubmit={(e)=>handleSubmitClicked(e)}>
                    <h3>{title}</h3>
                    <FormRowStyle>  
                        <FormSubRowStyle width={'100%'}>
                            <LabelStyle color={'#056699'}>{gradeTitle}</LabelStyle>
                            <InputStyle type="text" className={validInputs ? "error" : ""} value={input.grade} onChange={(e) =>setInput({grade : e.target.value})}/>
                            <ErrorMessage showMessage={validInputs} message={gradeTitleVal}/>
                        </FormSubRowStyle>
                    </FormRowStyle>
                    <SubmitBtnStyle> {createBtn}</SubmitBtnStyle>
                </FormStyle>
            </FormMainContainer>
        </>
    )
}