/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { ButtonsContainerStyle, FormCheckBoxContainerStyle, FormMainContainer, FormRowStyle, FormSelectdStyle, FormStyle, FormSubRowStyle, GoBackBtnStyle, InputStyle, LabelStyle, SubmitBtnStyle } from "../../shared/style/styleTag.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../Global/Title.jsx";
import DataServices from "../../../Data/dynamic/DataServices.js";
import Notification from "../../Global/Notification.jsx";
import ShowInputCard from "../../shared/ShowInputCard.jsx";
import ErrorMessage from "../../shared/ErrorMessage.jsx";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade.jsx";
import useClasses from "../../../hooks/class_hooks/useClasses.jsx";
import { NewStudentTEXT } from "../../../Data/static/Students/NewStudent/NewStudentTEXT.js";
import { useSelector } from "react-redux";

export default function StudentForm({title,requestType,studentInformation}) {

  const {currentLange} = useSelector( state => state.language)
  const {subTitle ,studentName ,lastName ,fatherName ,grade ,phone ,missedDay ,billRequired,updateBtn,goBackBtn,
    gender ,classTitle ,maleGender ,femaleGender ,addBtn ,successAddStudentMES ,successUpdateStudentMES,validationMessages
  } = NewStudentTEXT[currentLange]

  const {nameVal ,lastNameVal ,fatherNameVal ,phoneNumberVal ,requierBillVal} = validationMessages

  const previousPage = useNavigate();
  const [grades] = useGetAllGrade()
  const [successAdd, setSuccessAdd] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [validation, setValidation] = useState({
    name: false,
    lastName: false,
    fatherName: false,
    phone: false,
    missedDays: false,
    billRequired: false,
  });

  const [studentDetails, setStudentDetails] = useState(studentInformation);
  const [ClassType, setClassType] = useState(studentInformation.class.gender);
  const [classes] = useClasses(studentDetails.class.grade)
  const filteringClasses = classes.filter((currentClass) => {
    return ClassType.toLowerCase() == currentClass?.gender.toLowerCase()
  });
  
  function handleCheckBoxGender(value) {

      setClassType(value);

      // I reSet The state in order to the empty option
      setStudentDetails({ ...studentDetails, class: {...studentDetails.class,classId: 0, gender: value } });

  }

  function validationInputsFeilds() {
    const { name,lastName, fatherName, phone, missedDays, billRequired} = studentDetails;

    const nextStateValid = {
      name: name === "",
      lastName: lastName === "",
      fatherName: fatherName === "",
      phone: phone === "" || phone.length != 10 || /[^0-9]/.test(phone),
      missedDays: missedDays < 0,
      billRequired: billRequired <= 0,
    };

    setValidation(nextStateValid);

    return (
      name === "" ||
      lastName === "" ||
      fatherName === "" ||
      phone === "" ||
      phone.length != 10 ||
      missedDays < 0 ||
      billRequired <= 0 ||
      /[^0-9]/.test(phone)
    );
  }

  function handleSubmitClicked(event) {

    event.preventDefault();
    
    const flag = validationInputsFeilds();

    if (!flag) {
      try {
        if (requestType === "POST") {
          DataServices.AddNewStudent(studentDetails);
          setStudentDetails(studentInformation); // reset The Input Field
          setTimeout(() => {
            setSuccessAdd(false);
          }, 2000);
          setSuccessAdd(true);
        } else {
          DataServices.UpdateStudent(studentDetails);
          setSuccessUpdate(true);
          setTimeout(() => {
            setSuccessAdd(false);
            previousPage(-1);
          }, 2000);
        }
      } catch (error) {
        // needed to fix the error
      }
  }
  }
  
  function handleInputChange(value,key) {

    let copyData = new Map()
    copyData = {...studentDetails} 
    copyData[key] = value 

    setStudentDetails(copyData)

  }



  return (
    <>
      <Notification title={successAddStudentMES} type={"success"} state={successAdd} setState={setSuccessAdd} />
      <Notification title={successUpdateStudentMES} type={"success"} state={successUpdate} setState={setSuccessUpdate} />

      <Title title={title} />
      <FormMainContainer>

          <FormStyle onSubmit={(e)=>handleSubmitClicked(e)}>
            <h3>{subTitle}</h3>

            <FormRowStyle>
              
              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>{studentName}</LabelStyle>
                <InputStyle className={validation.name ? "error" : ""} type="text" value={studentDetails.name} onChange={(e) =>handleInputChange(e.target.value,'name')}/>
                <ErrorMessage showMessage={validation.name} message={nameVal}/>
              </FormSubRowStyle>

              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>{lastName}</LabelStyle>
                <InputStyle type="text" className={validation.lastName ? "error" : ""} value={studentDetails.lastName} onChange={(e) =>handleInputChange(e.target.value,'lastName')}/>
                <ErrorMessage showMessage={validation.lastName} message={lastNameVal}/>
              </FormSubRowStyle>

            </FormRowStyle>

            <FormRowStyle>

              <FormSubRowStyle >
                <LabelStyle color={'#056699'}>{fatherName}</LabelStyle>
                <InputStyle type="text" className={validation.fatherName ? "error" : ""} value={studentDetails.fatherName} onChange={(e) =>handleInputChange(e.target.value,'fatherName')} />
                <ErrorMessage showMessage={validation.fatherName} message={fatherNameVal}/>
              </FormSubRowStyle>

              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>{grade}</LabelStyle>
                <FormSelectdStyle value={studentDetails.class.grade} className={validation.grade ? "error" : ""} onChange={(e) =>handleInputChange({...studentDetails.class,grade:e.target.value},'class')}>
                    <option value={""}></option>
                    { grades.map((grade,index) => { return <option key={index} value={grade.grade}>{grade.grade}</option> }) }
                </FormSelectdStyle>
              </FormSubRowStyle>

            </FormRowStyle>

            <FormRowStyle>

              <FormSubRowStyle width={'100%'}>
                <LabelStyle color={'#056699'}>{phone}</LabelStyle>
                <InputStyle type="text" value={studentDetails.phone} className={validation.phone ? "error" : ""} onChange={(e) =>handleInputChange(e.target.value,'phone')} />
                <ErrorMessage showMessage={validation.phone} message={phoneNumberVal}/>
              </FormSubRowStyle>

            </FormRowStyle>

            <FormRowStyle>

              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>{billRequired}</LabelStyle>
                <InputStyle type="number" className={validation.billRequired ? "error" : ""} value={studentDetails.billRequired} onChange={(e) =>handleInputChange(e.target.value,'billRequired')} />
                <ErrorMessage showMessage={validation.billRequired} message={requierBillVal}/>
              </FormSubRowStyle>

              <FormCheckBoxContainerStyle color={'transparent'}>

                <section>
                  <LabelStyle color={'#056699'}>{gender}</LabelStyle>
                  <div>
                    <div>
                      <input type="checkbox" id="Male" checked={ClassType == 'male'} onChange={(e) => handleCheckBoxGender('male')} />
                      <label htmlFor="Male" style={{marginRight: '4px'}}>{maleGender}</label>
                    </div>
                    <div>
                      <input type="checkbox" id="Famale" checked={ClassType=='female'} onChange={(e) => handleCheckBoxGender('female')} />
                      <label htmlFor="Famale" style={{marginRight: '4px'}}>{femaleGender}</label>
                    </div>
                  </div>
                </section>

              </FormCheckBoxContainerStyle>

            </FormRowStyle>

            <FormSubRowStyle width={'100%'}>
              <LabelStyle color={'#056699'}>{classTitle}</LabelStyle>
              <FormSelectdStyle value={studentDetails?.class?.classId} onChange={(value) =>handleInputChange({...studentDetails?.class ,classId: value.target.value},'class')}>
                <option value={0}></option>
                {filteringClasses.map((currentClass, index) => (
                  <option value={currentClass.classId} key={index} style={{ padding: "20px" }}>
                    {currentClass.title}
                  </option>
                ))}
              </FormSelectdStyle>
            </FormSubRowStyle>

            <ButtonsContainerStyle>
              <SubmitBtnStyle >
                {requestType === "POST" ? addBtn : updateBtn}
              </SubmitBtnStyle>
              {
                requestType != "POST" && 
                <GoBackBtnStyle onClick={()=>{previousPage('/StudentsDetails',{replace: true})}}>{goBackBtn}</GoBackBtnStyle>
              }
            </ButtonsContainerStyle>

          </FormStyle>

          <ShowInputCard iconPath={"bi bi-person-circle icon"} >
            <main>
              <h3>{studentName} : <span> {studentDetails.name} {studentDetails.lastName}</span></h3>
              <h3>{fatherName} :  <span> {studentDetails.fatherName} </span></h3>
              <h3>{phone} : <span> {studentDetails.phone} </span></h3>
              <h3>{billRequired} : <span> {studentDetails.billRequired} </span></h3>
              <h3>{missedDay} : <span> {studentDetails.missedDays} </span></h3>
            </main>
          </ShowInputCard>

      </FormMainContainer>
    </>
  );
}
