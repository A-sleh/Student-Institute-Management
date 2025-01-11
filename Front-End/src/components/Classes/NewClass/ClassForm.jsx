/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/
import { ButtonsContainerStyle, FormMainContainer, FormRowStyle, FormSelectdStyle, FormStyle, FormSubRowStyle, GoBackBtnStyle, InputStyle, LabelStyle, SubmitBtnStyle } from '../../shared/style/styleTag'
import { successActionLogic } from '../../shared/logic/logic';
import { useState } from "react";
import DataServices from "../../../Data/dynamic/DataServices";
import ErrorMessage from "../../shared/ErrorMessage";
import ShowInputCard from "../../shared/ShowInputCard";
import useGetAllGrade from '../../../hooks/Grade_hooks/useGetAllGrade';
import { useSelector } from 'react-redux';
import { NewClassTEXT } from '../../../Data/static/classes/NewClass/NewClassTEXT';


export default function ClassForm(props) {

  const { initialSatate, setSuccessAction, type } = props
  const {currentLange} = useSelector( state => state.language)
  const { title , classTitle , classCapacity ,classGrade ,classGender ,submitBtn ,updateBtn ,cancelBtn ,validationMessages } = NewClassTEXT[currentLange]
  const {classTitleVal ,classCapacityVal ,gradeVal ,genderVal} = validationMessages

  const [validation, setValidation] = useState({ title: false, capacity: false, grade: false, gender: false, })
  const [classDetails, setClassDetails] = useState(initialSatate)
  const [grades] = useGetAllGrade()

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

    setClassDetails(initialSatate)
    successActionLogic(setSuccessAction)
    if( type === 'PUT' ) {
      props?.setUpdataBtnClicked(false)
    }
  }

  function handleInputsChange(value,key,key1) {

    let copyData = new Map()
    copyData = {...classDetails} 
    
    if(key1 != undefined) {
      copyData[key1] = value.split(' ')[0] 
      copyData[key] = value.split(' ')[1]
    }else  copyData[key] = value 

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
    <FormMainContainer>

      <FormStyle onSubmit={(e) => hanldeSubmitClicked(e)}>
        <div>
          <h3>{title}</h3>

          <FormRowStyle >
            <FormSubRowStyle>
              <LabelStyle color={'#056699'}>{classTitle}</LabelStyle>
              <InputStyle className={validation.title ? "error" : ""} type="text" value={classDetails.title} onChange={(e) =>handleInputsChange(e.target.value,'title')}/>
              <ErrorMessage message={classTitleVal} showMessage={validation.title}/>
            </FormSubRowStyle>
            
            <FormSubRowStyle>
              <LabelStyle color={'#056699'}>{classCapacity} </LabelStyle>
              <InputStyle type="text" className={validation.capacity ? "error" : ""} value={classDetails.capacity} onChange={(e) =>handleInputsChange(e.target.value,'capacity')}/>
              <ErrorMessage message={classCapacityVal} showMessage={validation.capacity}/>
            </FormSubRowStyle>

          </FormRowStyle >

          <FormSubRowStyle width={'100%'}>
            <LabelStyle color={'#056699'}>{classGrade}</LabelStyle>
            <FormSelectdStyle value={classDetails.gradeId+' '+classDetails.grade} className={validation.grade ? "error" : ""} onChange={(e) =>handleInputsChange(e.target.value,'grade','gradeId')}>
              <option value={""}></option>
              {
                grades.map((grade,index) => {
                  return <option key={index} value={grade.gradeId+' '+grade.grade}>{grade.grade}</option>
                })
              }
            </FormSelectdStyle>
            <ErrorMessage message={gradeVal} showMessage={validation.grade}/>
          </FormSubRowStyle>

          <FormSubRowStyle width={'100%'}>
            <LabelStyle color={'#056699'}>{classGender}</LabelStyle>
            <FormSelectdStyle value={classDetails.gender} className={validation.gender ? "error" : ""} onChange={(e) =>handleInputsChange(e.target.value,'gender')}>
              <option value={""}></option>
              <option value={"male"}>male</option>
              <option value={"female"}>female</option>
            </FormSelectdStyle>
            <ErrorMessage message={genderVal} showMessage={validation.gender}/>
          </FormSubRowStyle>
        </div>
        <ButtonsContainerStyle >
          <SubmitBtnStyle >
            {type ==='POST' ?  submitBtn : updateBtn }
          </SubmitBtnStyle>
          { type !== 'POST' && 
            <GoBackBtnStyle onClick={()=>{props.setUpdataBtnClicked(false)}}>{cancelBtn}</GoBackBtnStyle> 
          }
        </ButtonsContainerStyle>

      </FormStyle>
      {
        type != 'PUT' && 
          <ShowInputCard iconPath={"bi bi-info-circle icon"} >
          <main>
            <h3>{classTitle} : <span> {classDetails.title} </span> </h3>
            <h3>{classGrade} : <span> {classDetails.grade} </span></h3>
            <h3>{classGender} : <span> {classDetails.gender} </span></h3>
            <h3>{classCapacity} :  <span> {classDetails.capacity} </span></h3>
          </main>
        </ShowInputCard>
      }
    </FormMainContainer>
  );
}
