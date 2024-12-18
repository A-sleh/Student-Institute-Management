import { FormMainContainer, FormRowStyle, FormStyle, FormSubRowStyle, InputStyle, LabelStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import { useState } from "react";
import Notification from "../../Global/Notification";
import ErrorMessage from "../../shared/ErrorMessage";
import DataServices from "../../../Data/dynamic/DataServices";
import { successActionLogic } from "../../shared/logic/logic";

export default function NewGradeForm() {

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
            <Notification title={"create new grade"} type={"success"} state={successCreate} setState={setSuccessCreate} />
            <FormMainContainer>
                <FormStyle onSubmit={(e)=>handleSubmitClicked(e)}>
                    <h3>New Grade</h3>
                    <FormRowStyle>  
                        <FormSubRowStyle width={'100%'}>
                            <LabelStyle color={'#056699'}>Grade Title</LabelStyle>
                            <InputStyle type="text" className={validInputs ? "error" : ""} value={input.grade} onChange={(e) =>setInput({grade : e.target.value})}/>
                            <ErrorMessage showMessage={validInputs} message={"this field is required"}/>
                        </FormSubRowStyle>
                    </FormRowStyle>
                    <SubmitBtnStyle> Create</SubmitBtnStyle>
                </FormStyle>
            </FormMainContainer>
        </>
    )
}