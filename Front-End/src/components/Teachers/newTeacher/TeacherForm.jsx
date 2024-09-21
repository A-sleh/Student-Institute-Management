

import { useState } from "react";
import DataServices from "../../../Data/dynamic/DataServices";
import TeacherCard from "./TeacherCard";
import { useNavigate } from "react-router-dom";




export default function TeacherForm(props) {
  const { initialSatate , type ,setSuccessAction} = props;
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

  return (
    <>
      <div
        style={{
          marginTop: "2em",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <form
          className="class-form"
          onSubmit={(e) => {
            e.preventDefault();

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
          }}
        >
          <h3 className="sub-title">Theacher Information</h3>

          <div className="row">
            <div className="input">
              <label>First Name</label>
              <input
                className={validation.name ? "error" : ""}
                type="text"
                value={teacherDetails.name}
                onChange={(e) =>
                  setTeacherDetails({
                    ...teacherDetails,
                    name: e.target.value,
                  })
                }
              />
              {validation.name && <span>Pleas Enter The The First Name of Teacher</span>}
            </div>
            <div className="input">
              <label>Last Name</label>
              <input
                type="text"
                className={validation.lastName ? "error" : ""}
                value={teacherDetails.lastName}
                onChange={(e) =>
                  setTeacherDetails({
                    ...teacherDetails,
                    lastName: e.target.value,
                  })
                }
              />
              {validation.lastName && (
                <span>Pleas Enter The The Last Name of Teacher</span>
              )}
            </div>
          </div>

          
          <div className="row" >
            <div className="input" style={{width: '100%' ,marginLeft: '0'}}>
            <label>Phoe Number</label>
            <input type="text"
              value={teacherDetails.phone}
              className={validation.phone ? "error" : ""}
              onChange={(value) =>
                setTeacherDetails({
                  ...teacherDetails,
                  phone: value.target.value,
                })
              }
            />
            {validation.phone && <span>The number must be positive ,And don't containt letters</span>}
          </div>
          </div>


          <input type="submit" value={type ==='POST' ?  'Submit' : 'Update'} />
        { type === 'PUT' && <span className="update-class-btn" style={{ fontSize: '14px'}} onClick={()=>{handleBackClicked()}} >Back</span> }
        </form>
        <TeacherCard teacherDetails={teacherDetails} />
      </div>
    </>
  );
}
