import "./class.css";

import { useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import ClassCard from "./ClassCard";


export default function ClassForm(props) {
  const { initialSatate, setSuccessAction, type } = props;
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
          }}
        >
          <h3 className="sub-title">Class Information</h3>

          <div className="row">
            <div className="input">
              <label>Class Title</label>
              <input
                className={validation.title ? "error" : ""}
                type="text"
                value={classDetails.title}
                onChange={(e) =>
                  setClassDetails({
                    ...classDetails,
                    title: e.target.value,
                  })
                }
              />
              {validation.title && <span>Pleas Enter The Class Title</span>}
            </div>
            <div className="input">
              <label>Class Capacity </label>
              <input
                type="text"
                className={validation.capacity ? "error" : ""}
                value={classDetails.capacity}
                onChange={(e) =>
                  setClassDetails({
                    ...classDetails,
                    capacity: e.target.value,
                  })
                }
              />
              {validation.capacity && (
                <span>The Capacity Must Be Positive</span>
              )}
            </div>
          </div>

          <div className="selector">
            <label>Grade</label>
            <select
              value={classDetails.grade}
              className={validation.grade ? "error" : ""}
              onChange={(value) =>
                setClassDetails({
                  ...classDetails,
                  grade: value.target.value,
                })
              }
            >
              <option value={""}></option>
              <option value={"bachelor"}>bachelor</option>
              <option value={"ninth"}>ninth</option>
            </select>
          </div>

          <div className="selector">
            <label>Gender</label>
            <select
              value={classDetails.gender}
              className={validation.gender ? "error" : ""}
              onChange={(value) =>
                setClassDetails({
                  ...classDetails,
                  gender: value.target.value,
                })
              }
            >
              <option value={""}></option>
              <option value={"male"}>male</option>
              <option value={"female"}>female</option>
            </select>
          </div>

          <input type="submit" value={type ==='POST' ?  'Submit' : 'Update'} />
        { type === 'PUT' && <button className="update-class-btn" onClick={()=>{props.setUpdataBtnClicked(false)}} >Back</button> }
        </form>
        <ClassCard classDetails={classDetails} />
      </div>
    </>
  );
}
