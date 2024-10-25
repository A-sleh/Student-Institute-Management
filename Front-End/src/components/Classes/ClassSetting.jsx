import React, { useState, useContext, lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./class.css";
import Notification from "../Global/Notification";
import DeleteModal from "../Modal/DeleteModal";
import ClassForm from "./ClassForm";
import ShowClassDetails from "./ShowClassDetails";
import DataServices from "../../Data/dynamic/DataServices";
import StudentTable from "./StudentTable";
import { useDispatch } from "react-redux";
import { UPDATESUTENDSNUMBER } from "../../Redux/actions/type"; // test case 
import TeacherTableClass from "./TeacherTableClass";
import TeacherTableCurrentClass from "./TeacherTableClass";

export default function ClassSetting({ ClassId, setDeleteClass ,classTitle}) {

  const dispatch = useDispatch();// test

  const [teachersNumber,setTeachersNumber] = useState(0)
  const [SuccessUpdateClasss, setSuccessUpdateClasss] = useState(false);
  const [successRemoveStudent, setSuccessRemoveStudent] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [NotDeletClass, setNotDeleteClass] = useState(false);
  const [classDetails, setClassDetails] = useState({isEmpty: true});
  const gotoPage = useNavigate()

  useEffect(() => {
    DataServices.showCalsses(ClassId).then((response) => {
      setClassDetails({...response,isEmpty : false});
    });

    DataServices.ShowTeacherInSideClass(ClassId).then( teachers => {
      setTeachersNumber(teachers?.length )
    })

  }, [SuccessUpdateClasss, successRemoveStudent]);

  const { classId, title, capacity, gender, grade, students } = classDetails;

  const totalStudentsNumber =
    students?.length - (students != undefined && students[0] == null); // if the class don't contain any studnet will return an array with length one so we remove it useing this condition

  function handleDeleteClicked() {
    if (totalStudentsNumber > 0) {
      setNotDeleteClass(true);
      setTimeout(() => {
        setNotDeleteClass(false);
      }, 3000);
      return;
    }
    setDeleteModal(true);
  }

  const handleAddNewStudentClicked = () => {
    dispatch({ // test case 
      type: UPDATESUTENDSNUMBER , // test case 
      payload: totalStudentsNumber// test case 
    })// test case 
    gotoPage("InsertNewStudent", { state: encodeURIComponent(JSON.stringify(classDetails)) });
  };

  function handleAddNewTeacherClicked() {
    gotoPage('/ManageTeacher/TeacherNewClass/all',{state:{ClassId,grade,classTitle}})
  }

  return (
    <>
      <Notification
        title={"Students were removed"}
        type={"success"}
        state={successRemoveStudent}
        setState={setSuccessRemoveStudent}
      />
      {deleteModal && (
        <DeleteModal
          element={title}
          id={ClassId}
          type={"class"}
          setDeleteModal={setDeleteModal}
          setSuccessDelete={setDeleteClass}
          classId={ClassId}
        />
      )}
      <Notification
        title={"Class Mustn't Contain students to delete"}
        type={"error"}
        state={NotDeletClass}
        setState={setNotDeleteClass}
      />
      <Notification
        title={"Updata Class Details"}
        type={"success"}
        state={SuccessUpdateClasss}
        setState={setSuccessUpdateClasss}
      />

      {!updateBtnClicked && (
        <div className="class">
          <div
            className="title-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 10px",
            }}
          >
            <h1 className="class-title">{title}</h1>
            <div
              className="class-setting-btns"
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <button
                style={{
                  padding: "2px 15px",
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "13px",
                  cursor: "pointer ",
                  border: "none",
                  borderRadius: "3px",
                }}
                onClick={handleDeleteClicked}
              >
                Delete
              </button>
              <button
                style={{
                  padding: "2px 15px",
                  backgroundColor: "#066599",
                  color: "white",
                  fontSize: "13px",
                  cursor: "pointer ",
                  border: "none",
                  borderRadius: "3px",
                }}
                onClick={() => {
                  setUpdateBtnClicked(true);
                }}
              >
                Update
              </button>
            </div>
          </div>

          <div className="class-header-info">
            <h3>Class Information</h3>
            <div className="class-info">
              <ShowClassDetails
                title={"Title"}
                value={title}
                color={"#ffbc00"}
                icon={"bi bi-archive-fill"}
              />
              <ShowClassDetails
                title={"Capacity"}
                value={capacity}
                color={"#229edb"}
                icon={"fa-solid fa-user-group"}
              />
              <ShowClassDetails
                title={"Grade"}
                value={grade}
                color={"#60ff00"}
                icon={"fa-solid fa-graduation-cap"}
              />
              <ShowClassDetails
                title={"Gender"}
                value={gender}
                color={"#ff0000"}
                icon={"bi bi-person-fill-exclamation"}
              />
            </div>
          </div>

          <div className="class-body-info">
            <div className="teachers-info">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px 0",
                }}
                >
                <h3>Teachers</h3>
                <button
                  className="add-btn"
                  onClick={handleAddNewTeacherClicked}
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <i
                    className="bi bi-plus-lg"
                    style={{ lineHeight: "-10px" }}
                  ></i>
                  <span>Add New Teacher </span>
                </button>
              </div>
              <div className="teacher-name">
                { teachersNumber == 0 ?
                  <p
                    style={{
                      color: "red",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    There are no teachers yet ...
                  </p> : 
                  <TeacherTableCurrentClass classId={ClassId} /> 
                }
              </div>
            </div>

            <div className="students-info">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px 0",
                }}
              >
                <h3>Students</h3>
                <button
                  className="add-btn"
                  onClick={handleAddNewStudentClicked}
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <i
                    className="bi bi-plus-lg"
                    style={{ lineHeight: "-10px" }}
                  ></i>
                  <span>Add New Student </span>
                </button>
              </div>
              <div className="students-name">
                {totalStudentsNumber == 0 ? (
                  <p
                    style={{
                      color: "red",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    There are no students yet ...
                  </p>
                ) : (
                   classDetails.isEmpty == false ? 
                        <StudentTable
                          students={classDetails.students}
                          classID={ClassId}
                          setSuccessRemoveStudent={setSuccessRemoveStudent}
                        />
                    : ('')
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {updateBtnClicked && (
        <ClassForm
          initialSatate={classDetails}
          setSuccessAction={setSuccessUpdateClasss}
          type={"PUT"}
          setUpdataBtnClicked={setUpdateBtnClicked}
        />
      )}
    </>
  );
}
