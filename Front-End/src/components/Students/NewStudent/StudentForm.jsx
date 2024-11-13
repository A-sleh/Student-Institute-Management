/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { ButtonsContainerStyle, FormCheckBoxContainerStyle, FormMainContainer, FormRowStyle, FormSelectdStyle, FormStyle, FormSubRowStyle, GoBackBtnStyle, InputStyle, LabelStyle, SubmitBtnStyle } from "../../shared/style/styleTag.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../Global/Title.jsx";
import DataServices from "../../../Data/dynamic/DataServices.js";
import Notification from "../../Global/Notification.jsx";
import ShowInputCard from "../../shared/ShowInputCard.jsx";
import ErrorMessage from "../../shared/ErrorMessage.jsx";

export default function StudentForm({title,requestType,studentInformation}) {

  const previousPage = useNavigate();
  const [successAdd, setSuccessAdd] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [classDetails, setCalssDetails] = useState([]);
  const [newClassDetails, setNewClassDetails] = useState([]);
  const [validation, setValidation] = useState({
    name: false,
    lastName: false,
    fatherName: false,
    birthdate: false,
    phone: false,
    missedDays: false,
    billRequired: false,
  });
  const [studentDetails, setStudentDetails] = useState(studentInformation);
  const [ClassType, setClassType] = useState({
    Gender: {
      Male: true,
      Famale: false,
    },
    Grade: {
      Bachelor: true,
      Ninth: false,
    },
  });

  // fetch classes Details From Data Base
  useEffect(() => {
    try {
      DataServices.showCalsses().then((data) => {
        setCalssDetails(data);
      });
    } catch (error) {
      // should fix the error here
    }
  }, []);

  // Filter The Classes Depanded on Gender And Grade IN THE FIRST RENDER
  useEffect(() => {
    FilterClassGnderAndGrade(classDetails);
  }, [classDetails]);


  function FilterClassGnderAndGrade(data, liveState) {
    let Gender, Grade;

    if (data.length == 0) return; // To Avoide If The data Is Empty
    if (liveState != undefined) {
      // The liveState ref to the spanShot state to use the latest value of classType
      Gender = liveState.Gender.Male ? "male" : "female";
      Grade = liveState.Grade.Bachelor ? "bachelor" : "ninth";
    } else {
      Gender = ClassType.Gender.Male ? "male" : "female";
      Grade = ClassType.Grade.Bachelor ? "bachelor" : "ninth";
    }
    const filteringClasses = data.filter((currentClass) => {
      return Gender === currentClass?.gender && Grade === currentClass?.grade;
    });

    setNewClassDetails(filteringClasses);
  }
  
  function handleCheckBoxGender(value) {
    if (value) {
      const nextState = {
        ...ClassType,
        Gender: {
          Male: !ClassType.Gender.Male,
          Famale: !ClassType.Gender.Famale,
        },
      };

      setClassType({
        ...ClassType,
        Gender: {
          Male: !ClassType.Gender.Male,
          Famale: !ClassType.Gender.Famale,
        },
      });
      FilterClassGnderAndGrade(classDetails, nextState);

      // I reSet The state in order to the empty option
      setStudentDetails({ ...studentDetails, class: {...studentDetails.class,classId: 0} });
    }
  }

  function handleCheckBoxGrade(value) {
    if (value) {
      const nextState = {
        ...ClassType,
        Grade: {
          Bachelor: !ClassType.Grade.Bachelor,
          Ninth: !ClassType.Grade.Ninth,
        },
      };

      setClassType({
        ...ClassType,
        Grade: {
          Bachelor: !ClassType.Grade.Bachelor,
          Ninth: !ClassType.Grade.Ninth,
        },
      });

      FilterClassGnderAndGrade(classDetails, nextState);

      // I reSet The state in order to the empty option
      setStudentDetails({ ...studentDetails, classId: 0 });
    }
  }

  function validationInputsFeilds() {
    const {
      name,
      lastName,
      fatherName,
      birthdate,
      phone,
      missedDays,
      billRequired,
    } = studentDetails;

    const nextStateValid = {
      name: name === "",
      lastName: lastName === "",
      fatherName: fatherName === "",
      birthdate: birthdate === "",
      phone: phone === "" || phone.length != 10 || /[^0-9]/.test(phone),
      missedDays: missedDays < 0,
      billRequired: billRequired <= 0,
    };

    setValidation(nextStateValid);

    return (
      name === "" ||
      lastName === "" ||
      fatherName === "" ||
      birthdate === "" ||
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
        alert.log(error);
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
      <Notification title={"Add New Student"} type={"success"} state={successAdd} setState={setSuccessAdd} />
      <Notification title={"Updata Student Information"} type={"success"} state={successUpdate} setState={setSuccessUpdate} />

      <Title title={title} />
      <FormMainContainer>

          <FormStyle onSubmit={(e)=>handleSubmitClicked(e)}>
            <h3>Student Details</h3>

            <FormRowStyle>
              
              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>First Name</LabelStyle>
                <InputStyle className={validation.name ? "error" : ""} type="text" value={studentDetails.name} onChange={(e) =>handleInputChange(e.target.value,'name')}/>
                <ErrorMessage showMessage={validation.name} message={"Pleas Enter The First Name"}/>
              </FormSubRowStyle>

              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>Last Name</LabelStyle>
                <InputStyle type="text" className={validation.lastName ? "error" : ""} value={studentDetails.lastName} onChange={(e) =>handleInputChange(e.target.value,'lastName')}/>
                <ErrorMessage showMessage={validation.lastName} message={"Pleas Enter The Last Name"}/>
              </FormSubRowStyle>

            </FormRowStyle>

            <FormRowStyle>

              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>Father Name</LabelStyle>
                <InputStyle type="text" className={validation.fatherName ? "error" : ""} value={studentDetails.fatherName} onChange={(e) =>handleInputChange(e.target.value,'fatherName')} />
                <ErrorMessage showMessage={validation.fatherName} message={"Pleas Enter The Father Name"}/>
              </FormSubRowStyle>

              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>birthdate</LabelStyle>
                <InputStyle type="date" className={validation.birthdate ? "error" : ""} value={studentDetails.birthdate} onChange={(e) =>handleInputChange(e.target.value,'birthdate')} />
                <ErrorMessage showMessage={validation.birthdate} message={"Pleas Enter The Birth Days"}/>
              </FormSubRowStyle>

            </FormRowStyle>

            <FormRowStyle>

              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>Phone</LabelStyle>
                <InputStyle type="text" value={studentDetails.phone} className={validation.phone ? "error" : ""} onChange={(e) =>handleInputChange(e.target.value,'phone')} />
                <ErrorMessage showMessage={validation.phone} message={"The Number Should Be 10 Digite ,And With Out Letters"}/>
              </FormSubRowStyle>

              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>missed Days</LabelStyle>
                <InputStyle type="number" className={validation.missedDays ? "error" : ""} value={studentDetails.missedDays} onChange={(e) =>handleInputChange(e.target.value,'missedDays')} />
                <ErrorMessage showMessage={validation.missedDays} message={"The Miss Days Must Be Positive"}/>
              </FormSubRowStyle>

            </FormRowStyle>

            <FormRowStyle>

              <FormSubRowStyle>
                <LabelStyle color={'#056699'}>bill Required</LabelStyle>
                <InputStyle type="number" className={validation.billRequired ? "error" : ""} value={studentDetails.billRequired} onChange={(e) =>handleInputChange(e.target.value,'billRequired')} />
                <ErrorMessage showMessage={validation.billRequired} message={"The Bill Must Be Positive"}/>
              </FormSubRowStyle>

              <FormCheckBoxContainerStyle color={'transparent'}>

                <section>
                  <LabelStyle color={'#056699'}>Gender</LabelStyle>
                  <div>
                    <div>
                      <input type="checkbox" id="Male" checked={ClassType.Gender.Male}onChange={(e) => handleCheckBoxGender(e.target.checked)} />
                      <label htmlFor="Male">Male</label>
                    </div>
                    <div>
                      <input type="checkbox" id="Famale" checked={ClassType.Gender.Famale} onChange={(e) => handleCheckBoxGender(e.target.checked)} />
                      <label htmlFor="Famale">Female</label>
                    </div>
                  </div>
                </section>

                <section>

                  <LabelStyle color={'#056699'}>Grade</LabelStyle>
                  <div >
                    <div>
                      <input type="checkbox" id="bachelor" checked={ClassType.Grade.Bachelor} onChange={(e) => handleCheckBoxGrade(e.target.checked)}/>
                      <label htmlFor="bachelor">Bachelor</label>
                    </div>
                    <div>
                      <input type="checkbox" id="ninth" checked={ClassType.Grade.Ninth} onChange={(e) => handleCheckBoxGrade(e.target.checked)} />
                      <label htmlFor="ninth">Ninth</label>
                    </div>
                  </div>
                </section>
              </FormCheckBoxContainerStyle>

            </FormRowStyle>

            <FormSubRowStyle width={'100%'}>
              <LabelStyle color={'#056699'}>Class Name</LabelStyle>
              <FormSelectdStyle value={studentDetails?.class?.classId} onChange={(value) =>handleInputChange({...studentDetails?.class ,classId: value.target.value,},'class')}>
                <option value={0}></option>
                {newClassDetails.map((currentClass, index) => (
                  <option value={currentClass.classId} key={index} style={{ padding: "20px" }}>
                    {currentClass.title}
                  </option>
                ))}
              </FormSelectdStyle>
            </FormSubRowStyle>

            <ButtonsContainerStyle>
              <SubmitBtnStyle >
                {requestType === "POST" ? "Add" : "Update"}
              </SubmitBtnStyle>
              {
                requestType != "POST" && 
                <GoBackBtnStyle onClick={()=>{previousPage('/StudentsDetails',{replace: true})}}>Go Back</GoBackBtnStyle>
              }
            </ButtonsContainerStyle>

          </FormStyle>

          <ShowInputCard iconPath={"bi bi-person-circle icon"} >
            <main>
              <h3>Name : <span> {studentDetails.name} {studentDetails.lastName}</span></h3>
              <h3>Father :  <span> {studentDetails.fatherName} </span></h3>
              <h3>Birth Date : <span> {studentDetails.birthdate} </span></h3>
              <h3>phone : <span> {studentDetails.phone} </span></h3>
              <h3>Bill Required : <span> {studentDetails.billRequired} </span></h3>
              <h3>Missed Days : <span> {studentDetails.missedDays} </span></h3>
            </main>
          </ShowInputCard>

      </FormMainContainer>
    </>
  );
}
