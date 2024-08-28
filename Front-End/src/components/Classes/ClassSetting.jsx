import React, { useState, useContext, lazy, Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./class.css";
import Notification from "../Global/Notification";
import DeleteModal from "../Modal/DeleteModal";
import ClassForm from "./ClassForm";
import ShowClassDetails from "./ShowClassDetails";

export const  ClassSetting = React.memo( ({ classDetails, setDeleteClass }) => {
  
  const StudentTable = lazy(() => import("./StudentTable"));
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [SuccessUpdateClasss, setSuccessUpdateClasss] = useState(false);
  const [NotDeletClass, setNotDeleteClass] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const gotoInsertNewStudent = useNavigate();

  const { classId, title, capacity, gender, grade, students } = classDetails;

  console.log("render-class" + classId);

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
    gotoInsertNewStudent("InsertNewStudent", { state: classDetails });
  };

  return (
    <>
      {deleteModal && (
        <DeleteModal
          element={title}
          id={classId}
          type={"class"}
          setDeleteModal={setDeleteModal}
          setSuccessDelete={setDeleteClass}
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
              <h3>Teachers</h3>
              <div className="teacher-name">
                {/* needed to build soon */}
                {
                  <p
                    style={{
                      color: "red",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    There are no teachers yet ...
                  </p>
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
                  <Suspense >
                    <StudentTable students={classDetails?.students} />
                  </Suspense>
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
})
