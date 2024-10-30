/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { ButtonsContainerStyle, FormMainContainer, FormRowStyle, FormSelectdStyle, FormStyle, FormSubRowStyle, GoBackBtnStyle, InputStyle, LabelStyle, SubmitBtnStyle } from "../shared/styleTag";
import { useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import ErrorMessage from "../shared/ErrorMessage";
import ShowInputCard from "../shared/ShowInputCard";


export default function ClassForm({ initialSatate, setSuccessAction, type }) {
  
  const [classDetails, setClassDetails] = useState(initialSatate);
  const [validation, setValidation] = useState({
    title: false,
    capacity: false,
    grade: false,
    gender: false,
  });

  function validationInputsFeilds() {
    const { title, capacity, grade, gender } = classDetails;
    setValidation({
      title: title === "",
      capacity: capacity <= 0,
      grade: grade === "",
      gender: gender === "",
    });
    return title === "" || capacity <= 0 || grade === "" || gender === "";
  }

  function handleSuccessRequest() {
    setClassDetails(initialSatate);
    setSuccessAction(true);
    
    setTimeout(() => {
      setSuccessAction(false);
    }, 2000);
    if( type === 'PUT' ) {
      props.setUpdataBtnClicked(false)
    }
  }

  function handleInputsChange(value,key) {

    let copyData = new Map()
    copyData = {...classDetails} 
    copyData[key] = value 

    setClassDetails(copyData)
  }

  function hanldeSubmitClicked(event) {
    event.preventDefault();

    const flag = validationInputsFeilds();

    if (!flag) {
      switch (type) {
        case "POST":
          DataServices.CreateNewClass(classDetails).then((_) => {
            handleSuccessRequest();
          });
          break;
        case "PUT":
          DataServices.UpdateClass(classDetails).then((_) => {
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
          <h3>Class Information</h3>

          <FormRowStyle >
            <FormSubRowStyle>
              <LabelStyle color={'#056699'}>Class Title</LabelStyle>
              <InputStyle className={validation.title ? "error" : ""} type="text" value={classDetails.title} onChange={(e) =>handleInputsChange(e.target.value,'title')}/>
              <ErrorMessage message={'Pleas Enter The Class Title'} showMessage={validation.title}/>
            </FormSubRowStyle>
            
            <FormSubRowStyle>
              <LabelStyle color={'#056699'}>Class Capacity </LabelStyle>
              <InputStyle type="text" className={validation.capacity ? "error" : ""} value={classDetails.capacity} onChange={(e) =>handleInputsChange(e.target.value,'capacity')}/>
              <ErrorMessage message={'The Capacity Must Be Positive'} showMessage={validation.capacity}/>
            </FormSubRowStyle>

          </FormRowStyle >

          <FormSubRowStyle width={'100%'}>
            <LabelStyle color={'#056699'}>Grade</LabelStyle>
            <FormSelectdStyle value={classDetails.grade} className={validation.grade ? "error" : ""} onChange={(e) =>handleInputsChange(e.target.value,'grade')}>
              <option value={""}></option>
              <option value={"bachelor"}>bachelor</option>
              <option value={"ninth"}>ninth</option>
            </FormSelectdStyle>
          </FormSubRowStyle>

          <FormSubRowStyle width={'100%'}>
            <LabelStyle color={'#056699'}>Gender</LabelStyle>
            <FormSelectdStyle value={classDetails.gender} className={validation.gender ? "error" : ""} onChange={(e) =>handleInputsChange(e.target.value,'gender')}>
              <option value={""}></option>
              <option value={"male"}>male</option>
              <option value={"female"}>female</option>
            </FormSelectdStyle>
          </FormSubRowStyle>

          <ButtonsContainerStyle >
            <SubmitBtnStyle >
              {type ==='POST' ?  'Submit' : 'Update'}
            </SubmitBtnStyle>
            { type !== 'POST' && 
              <GoBackBtnStyle onClick={()=>{props.setUpdataBtnClicked(false)}} >Back</GoBackBtnStyle> 
            }
          </ButtonsContainerStyle>

        </FormStyle>

        <ShowInputCard iconPath={"bi bi-info-circle icon"} >
          <main>
            <h3>Class Title : <span> {classDetails.title} </span> </h3>
            <h3>Grade : <span> {classDetails.grade} </span></h3>
            <h3>Gender : <span> {classDetails.gender} </span></h3>
            <h3>Class Capacity :  <span> {classDetails.capacity} </span></h3>
          </main>
        </ShowInputCard>

      </FormMainContainer>
    </>
  );
}
