import { useEffect, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices.js";
import "./studentStyle.css";
import StudentCard from "./StudentCard.jsx";
import Notification from "../Global/Notification.jsx";
import { useNavigate } from "react-router-dom";

export default function StudentForm({
  title,
  requestType,
  studentInformation,
}) {
  const previousPage = useNavigate();

  const [successAdd, setSuccessAdd] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);

  const [validation, setValidation] = useState({
    name: false,
    lastName: false,
    fatherName: false,
    birthdate: false,
    phone: false,
    missedDays: false,
    billRequired: false,
    classId: false,
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

  const [classDetails, setCalssDetails] = useState([]);

  const [newClassDetails, setNewClassDetails] = useState([]);

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
      setStudentDetails({ ...studentDetails, classId: 0 });
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
      classId,
    } = studentDetails;

    const nextStateValid = {
      name: name === "",
      lastName: lastName === "",
      fatherName: fatherName === "",
      birthdate: birthdate === "",
      phone: phone === "" || phone.length != 10 || phone.match(/[^0-9]/),
      missedDays: missedDays < 0,
      billRequired: billRequired <= 0,
      classId: classId <= 0,
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
      classId <= 0 ||
      phone.match(/[^0-9]/)
    );
  }
  

  // fetch classes Details From Data Base
  useEffect(() => {
    try {
      DataServices.showAllCalsses().then((data) => {
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

  console.log(classDetails)

  return (
    <div>
      <Notification
        title={"Add New Student"}
        type={"success"}
        state={successAdd}
        setState={setSuccessAdd}
      />
      <Notification
        title={"Updata Student Information"}
        type={"success"}
        state={successUpdate}
        setState={setSuccessUpdate}
      />
      <Title title={title} />
      <section
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "30px",
        }}
      >
        <form
          className="student-info"
          onSubmit={(e) => {
            e.preventDefault();

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
          }}
        >
          <h3 className="sub-title">Student Details</h3>
          <div className="row">
            <div className="input">
              <label>First Name</label>
              <input
                className={validation.name ? "error" : ""}
                type="text"
                value={studentDetails.name}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    name: e.target.value,
                  })
                }
              />
              {validation.name && <span>Pleas Enter The First Name</span>}
            </div>
            <div className="input">
              <label>Last Name</label>
              <input
                type="text"
                className={validation.lastName ? "error" : ""}
                value={studentDetails.lastName}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    lastName: e.target.value,
                  })
                }
              />
              {validation.lastName && <span>Pleas Enter The Last Name</span>}
            </div>
          </div>

          <div className="row">
            <div className="input">
              <label>Father Name</label>
              <input
                type="text"
                className={validation.fatherName ? "error" : ""}
                value={studentDetails.fatherName}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    fatherName: e.target.value,
                  })
                }
              />
              {validation.fatherName && (
                <span>Pleas Enter The Father Name</span>
              )}
            </div>
            <div className="input">
              <label>birthdate</label>
              <input
                type="date"
                className={validation.birthdate ? "error" : ""}
                value={studentDetails.birthdate}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    birthdate: e.target.value,
                  })
                }
              />
              {validation.birthdate && <span>Pleas Enter The Birth Days</span>}
            </div>
          </div>

          <div className="row">
            <div className="input">
              <label>Phone</label>
              <input
                type="text"
                value={studentDetails.phone}
                className={validation.phone ? "error" : ""}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    phone: e.target.value,
                  })
                }
              />
              {validation.phone && (
                <span>
                  The Number Should Be 10 Digite ,And With Out Letters
                </span>
              )}
            </div>
            <div className="input">
              <label>missed Days</label>
              <input
                type="number"
                className={validation.missedDays ? "error" : ""}
                value={studentDetails.missedDays}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    missedDays: e.target.value,
                  })
                }
              />
              {validation.missedDays && (
                <span>The Miss Days Must Be Positive</span>
              )}
            </div>
          </div>

          <div className="row">
            <div className="input">
              <label>bill Required</label>
              <input
                type="number"
                className={validation.billRequired ? "error" : ""}
                value={studentDetails.billRequired}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    billRequired: e.target.value,
                  })
                }
              />
              {validation.billRequired && (
                <span>The Bill Must Be Positive</span>
              )}
            </div>
            <div className="check-box">
              <div className="check-box-gender">
                <label>Gender</label>
                <div className="info">
                  <div>
                    <input
                      type="checkbox"
                      id="Male"
                      checked={ClassType.Gender.Male}
                      onChange={(e) => handleCheckBoxGender(e.target.checked)}
                    />
                    <label htmlFor="Male">Male</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="Famale"
                      checked={ClassType.Gender.Famale}
                      onChange={(e) => handleCheckBoxGender(e.target.checked)}
                    />
                    <label htmlFor="Famale">Female</label>
                  </div>
                </div>
              </div>
              <div className="check-box-gender">
                <label>Grade</label>
                <div className="info">
                  <div>
                    <input
                      type="checkbox"
                      id="bachelor"
                      checked={ClassType.Grade.Bachelor}
                      onChange={(e) => handleCheckBoxGrade(e.target.checked)}
                    />
                    <label htmlFor="bachelor">Bachelor</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="ninth"
                      checked={ClassType.Grade.Ninth}
                      onChange={(e) => handleCheckBoxGrade(e.target.checked)}
                    />
                    <label htmlFor="ninth">Ninth</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="selector">
            <label>Class Name </label>
            <select
              value={studentDetails.classId}
              className={validation.classId ? "error" : ""}
              onChange={(value) =>
                setStudentDetails({
                  ...studentDetails,
                  classId: value.target.value,
                })
              }
            >
              <option value={0}></option>
              {newClassDetails.map((currentClass, index) => (
                <option
                  value={currentClass.id}
                  key={index}
                  style={{ padding: "20px" }}
                >
                  {currentClass.title}
                </option>
              ))}
            </select>
            {validation.classId && (
              <span>Pleas Chose A Class Or Create One If There are no </span>
            )}
          </div>
          
          <input
            type="submit"
            value={requestType === "POST" ? "Add" : "Update"}
          />
        </form>
          <StudentCard studentDetails={studentDetails} />
      </section>
    </div>
  );
}
