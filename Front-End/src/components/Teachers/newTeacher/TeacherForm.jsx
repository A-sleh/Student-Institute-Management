
/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { ButtonsContainerStyle, FormMainContainer, FormRowStyle, FormStyle, FormSubRowStyle, GoBackBtnStyle, InputStyle, LabelStyle, SubmitBtnStyle } from "../../shared/styleTag";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataServices from "../../../Data/dynamic/DataServices";
import ErrorMessage from "../../shared/ErrorMessage";
import ShowInputCard from "../../shared/ShowInputCard";

export default function TeacherForm({ initialSatate , requestType ,setSuccessAction}) {

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

    if( type === 'POST' ) { // To Reest input feild if we use form to create new teacher
      setTeacherDetails(initialSatate);
    }

    setSuccessAction(true);
    setTimeout(() => {
      setSuccessAction(false);
    }, 2000);
    if( type === 'PUT' ) {
      if(props.setUpdataBtnClicked == undefined ) {  // if i come from manage teacher page
        gotoPreviousPage('/TeachersDetails',{replace: true})
      }
      else props.setUpdataBtnClicked(false) // if i come from teacher details
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
      switch (type) {
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
          // UnValid Input
          break;
      }
    }
  }

  return (
    <>
      <FormMainContainer>

        <FormStyle onSubmit={(e) => hanldeSubmitClicked(e)}>
          <h3>Theacher Information</h3>

          <FormRowStyle >

            <FormSubRowStyle >
              <LabelStyle color={'#056699'}>First Name</LabelStyle>
              <InputStyle className={validation.name ? "error" : ""} type="text" value={teacherDetails.name} onChange={(e) =>handleInputsChange(e.target.value,'name')}/>
              <ErrorMessage message={'Pleas Enter The The First Name of Teacher'} showMessage={validation.name}/>
            </FormSubRowStyle >

            <FormSubRowStyle >
              <LabelStyle color={'#056699'}>Last Name</LabelStyle>
              <InputStyle type="text" className={validation.lastName ? "error" : ""} value={teacherDetails.lastName} onChange={(e) =>handleInputsChange(e.target.value,'lastName')}/>
              <ErrorMessage message={'Pleas Enter The The Last Name of Teacher'} showMessage={validation.lastName}/>
            </FormSubRowStyle >

          </FormRowStyle >

          
          <FormRowStyle >
            <FormSubRowStyle style={{width: '100%' ,marginLeft: '0'}}>
              <LabelStyle color={'#056699'}>Phoe Number</LabelStyle>
              <InputStyle type="text" value={teacherDetails.phone} className={validation.phone ? "error" : ""} onChange={(e) =>handleInputsChange(e.target.value,'phone')}/>
              <ErrorMessage message={'The number must be positive ,And don\'t containt letters'} showMessage={validation.phone}/>
            </FormSubRowStyle>
          </FormRowStyle>

          <ButtonsContainerStyle >
            <SubmitBtnStyle>
              {requestType ==='POST' ?  'Submit' : 'Update'}
            </SubmitBtnStyle>
              { requestType !== 'POST' && 
                <GoBackBtnStyle onClick={()=>{handleBackClicked()}} >Back</GoBackBtnStyle> 
              }
          </ButtonsContainerStyle>

        </FormStyle>

        <ShowInputCard iconPath={"bi bi-person-circle icon"} >
          <main>
            <h3>First Name : <span> {teacherDetails.name}</span> </h3>
            <h3>Last Name  :  <span> {teacherDetails.lastName} </span></h3>
            <h3>phone : <span> {teacherDetails.phone} </span></h3>
          </main>
        </ShowInputCard>

      </FormMainContainer>
    </>
  );
}
