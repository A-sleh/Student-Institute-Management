/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { ButtonsContainerStyle, FormMainContainer, FormRowStyle, FormStyle, FormSubRowStyle, GoBackBtnStyle, InputStyle, LabelStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataServices from "../../../Data/dynamic/DataServices";
import ErrorMessage from "../../shared/ErrorMessage";
import ShowInputCard from "../../shared/ShowInputCard";
import { successActionLogic } from "../../shared/logic/logic";
import { NewTeacherTEXT } from "../../../Data/static/teachers/NewTeacher/NewTeacherTEXT";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_CURRENT_PAGE } from "../../../Redux/actions/type";


export default function TeacherForm(props) {

  const {currentLange} = useSelector( state => state.language)
  const {teacherTitle,backBtn,updateBtn ,name ,lastName ,phoneNumber ,submitBtn ,validationMessages} = NewTeacherTEXT[currentLange]
  const dispatch = useDispatch()

  const {nameVal ,lastNameVal ,phoneNumberVal } = validationMessages
  const { initialSatate , requestType ,setSuccessAction} = props
  const [teacherDetails, setTeacherDetails] = useState(initialSatate);
  const gotoPreviousPage = useNavigate();
  const [validation, setValidation] = useState({
    name: false,
    lastName: false,
    phone: false,
  });

  function validationInputsFeilds() {
    const { name, lastName, phone  } = teacherDetails;
    
    setValidation({
      name: name === "",
      lastName: lastName === '',
      phone: /[^0-9]/.test(phone) || phone === ''
    });
    
    return  ( name === "" || lastName === "" || phone === ""  ||  /[^0-9]/.test(phone));
  }

  function handleSuccessRequest() {

    if( requestType === 'POST' ) { // To Reest input feild if we use form to create new teacher
      setTeacherDetails(initialSatate);
      dispatch({
          type: CHANGE_CURRENT_PAGE ,
          payload: 1 
      });
    }

    successActionLogic(setSuccessAction)
    if( requestType === 'PUT' ) {
      if(props.setUpdataBtnClicked == undefined ) {  // if i come from manage teacher page
        setTimeout(() =>gotoPreviousPage('/TeachersDetails',{replace: true}), 1500 )
      }
      else {
        setTimeout(() => props.setUpdataBtnClicked(false) , 1500 ) // if i come from teacher details
      }
    }
  }

  function handleBackClicked() {
    if( props.setUpdataBtnClicked == undefined ) { // if i come from manage teacher page
      gotoPreviousPage('/TeachersDetails',{replace: true})
    } 
    else props.setUpdataBtnClicked(false) // if i come from teacher details
  }

  function handleInputsChange(value,key) {

    let copyData = new Map()
    copyData = {...teacherDetails} 
    copyData[key] = value 

    setTeacherDetails(copyData)
  }

  function hanldeSubmitClicked(event) {
    event.preventDefault();

    const flag = validationInputsFeilds();
    if (!flag) {
      
      switch (requestType) {
        case "POST":
          DataServices.AddNewTeacher(teacherDetails).then((_) => {
            handleSuccessRequest();
          });
          break;
          case "PUT":
            DataServices.UpdateTeacherInfo(teacherDetails).then((_) => {
              handleSuccessRequest();
            });
            break;
        default:
          break;
      }
    }
  }

  return (
    <>
      <FormMainContainer>

        <FormStyle onSubmit={(e) => hanldeSubmitClicked(e)} >
          <div>
            <h3>{teacherTitle}</h3>

            <FormRowStyle >

              <FormSubRowStyle >
                <LabelStyle color={'#056699'}>{name}</LabelStyle>
                <InputStyle className={validation.name ? "error" : ""} type="text" value={teacherDetails.name} onChange={(e) =>handleInputsChange(e.target.value,'name')}/>
                <ErrorMessage message={nameVal} showMessage={validation.name}/>
              </FormSubRowStyle >

              <FormSubRowStyle >
                <LabelStyle color={'#056699'}>{lastName}</LabelStyle>
                <InputStyle type="text" className={validation.lastName ? "error" : ""} value={teacherDetails.lastName} onChange={(e) =>handleInputsChange(e.target.value,'lastName')}/>
                <ErrorMessage message={lastNameVal} showMessage={validation.lastName}/>
              </FormSubRowStyle >

            </FormRowStyle >

            
            <FormRowStyle >
              <FormSubRowStyle style={{width: '100%' ,marginLeft: '0'}}>
                <LabelStyle color={'#056699'}>{phoneNumber}</LabelStyle>
                <InputStyle type="text" value={teacherDetails.phone} className={validation.phone ? "error" : ""} onChange={(e) =>handleInputsChange(e.target.value,'phone')}/>
                <ErrorMessage message={phoneNumberVal} showMessage={validation.phone}/>
              </FormSubRowStyle>
            </FormRowStyle>
          </div>

          <ButtonsContainerStyle >
            <SubmitBtnStyle>
              {requestType ==='POST' ?  submitBtn : updateBtn}
            </SubmitBtnStyle>
              { requestType !== 'POST' && 
                <GoBackBtnStyle onClick={()=>{handleBackClicked()}} >{backBtn}</GoBackBtnStyle> 
              }
          </ButtonsContainerStyle>

        </FormStyle>

        <ShowInputCard iconPath={"bi bi-person-circle icon"} >
          <main>
            <h3>{name} : <span> {teacherDetails.name}</span> </h3>
            <h3>{lastName}  :  <span> {teacherDetails.lastName} </span></h3>
            <h3>{phoneNumber} : <span> {teacherDetails.phone} </span></h3>
          </main>
        </ShowInputCard>

      </FormMainContainer>
    </>
  );
}
