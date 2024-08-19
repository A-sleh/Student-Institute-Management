import "./class.css";
import Title from "../Global/Title";
import { useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import ClassCard from "./ClassCard";
import Notification from "../Global/Notification";

export default function NewClass() {
  
  const initialSatate = {
    title: "",
    capacity: 0,
    grade: "",
    gender: "",
  };
  const [successCreateClasss, setSuccessCreateClasss] = useState(false);

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

  return (
    <>
      <Title title={window.location.pathname} />
      <Notification
        title={"Create A New Class"}
        type={"success"}
        state={successCreateClasss}
        setState={setSuccessCreateClasss}
      />
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
              DataServices.CreateNewClass(classDetails).then((_) => {
                // No Thing to do here
              });
              setClassDetails(initialSatate)
              setSuccessCreateClasss(true);
              setTimeout(() => {
                setSuccessCreateClasss(false);
              }, 2000);
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

          <input type="submit" value={"Submit"} />
        </form>
        <ClassCard classDetails={classDetails} />
      </div>
    </>
  );
}
