import { useEffect, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices.js";
import "./studentStyle.css";
import StudentCard from "./StudentCard.jsx";

export default function NewStudent() {
  const [studentDetails, setStudentDetails] = useState({
    name: "",
    lastName: "",
    fatherName: "",
    birthdate: "",
    phone: "",
    missedDays: 0,
    billRequired: 0,
    classId: 0,
  });

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
      console.log("inside the if");
      console.log(liveState);
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


  // fetch classes Details From Data Base
  useEffect(() => {
    DataServices.showAllCalsses().then((data) => {
      setCalssDetails(data);
    });
  }, []);

  // Filter The Classes Depanded on Gender And Grade IN THE FIRST RENDER
  useEffect(() => {
    FilterClassGnderAndGrade(classDetails);
  }, [classDetails]);

  return (
    <div>
      <Title title={window.location.pathname} />
      <section style={{ display: "flex", justifyContent: "space-around" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            try {
              DataServices.AddNewStudent(studentDetails);
              alert("done");
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <h3 className="sub-title">Student Details</h3>
          <div className="row">
            <div className="input">
              <label>First Name</label>
              <input
                type="text"
                value={studentDetails.name}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="input">
              <label>Last Name</label>
              <input
                type="text"
                value={studentDetails.lastName}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    lastName: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="input">
              <label>Father Name</label>
              <input
                type="text"
                value={studentDetails.fatherName}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    fatherName: e.target.value,
                  })
                }
              />
            </div>
            <div className="input">
              <label>birthdate</label>
              <input
                type="date"
                value={studentDetails.birthdate}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    birthdate: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="input">
              <label>Phone</label>
              <input
                type="text"
                value={studentDetails.phone}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    phone: e.target.value,
                  })
                }
              />
            </div>
            <div className="input">
              <label>missed Days</label>
              <input
                type="number"
                value={studentDetails.missedDays}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    missedDays: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="input">
              <label>bill Required</label>
              <input
                type="number"
                value={studentDetails.billRequired}
                onChange={(e) =>
                  setStudentDetails({
                    ...studentDetails,
                    billRequired: e.target.value,
                  })
                }
              />
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
                    <label htmlFor="Famale">Famale</label>
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
          </div>
          <input type="submit" value="Add" />
        </form>
        <StudentCard studentDetails={studentDetails} />
      </section>
    </div>
  );
}
