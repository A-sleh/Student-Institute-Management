/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { FlexSpaceBetweenContainerStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import { useDispatch } from "react-redux";
import { errorActionLogic } from "../../shared/logic/logic";
import { MainContainerStyle } from "../../Teachers/style/styleTags";
import { UPDATESUTENDSNUMBER } from "../../../Redux/actions/type"; // test case 
import React, { useState, useContext, lazy, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../../Global/Notification";
import DeleteModal from "../../Modal/DeleteModal";
import ClassForm from "../NewClass/ClassForm";
import StudentTable from "./StudentTable";
import TeacherTableCurrentClass from "./TeacherTableClass";
import HeaderInformation from "../../shared/HeaderInformation";
import TitleAndControalHeader from "../../Teachers/manageTeachers/TitleAndControalHeader";
import useClass from "../../../hooks/useClass";

export default function ClassSetting({ ClassId, setDeleteClass ,classTitle}) {

  // Notification States
  const [SuccessUpdateClasss, setSuccessUpdateClasss] = useState(false);
  const [successRemoveStudent, setSuccessRemoveStudent] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [NotDeletClass, setNotDeleteClass] = useState(false);
  // Data States
  const [classDetails] = useClass(ClassId,SuccessUpdateClasss,successRemoveStudent);
  const { title, capacity, gender, grade, students } = classDetails;
  const dispatch = useDispatch();// test
  const gotoPage = useNavigate()

  // if the class don't contain any studnet will return an array with length one so we remove it useing this condition
  const totalStudentsNumber = students?.length - (students != undefined && students[0] == null)

  const handleAddNewStudentClicked = () => {
    dispatch({ // test case 
      type: UPDATESUTENDSNUMBER , // test case 
      payload: totalStudentsNumber// test case 
    })// test case 
    gotoPage("InsertNewStudent", { state: encodeURIComponent(JSON.stringify(classDetails)) });
  }

  function handleDeleteClicked() {
    
    if (totalStudentsNumber > 0) {
      errorActionLogic(setNotDeleteClass)
      return
    }
    setDeleteModal(true)
  }
  const classStatistics = [
    {
      title: "Title",
      value: title ,
      icon: "bi bi-archive-fill"
    }, 
    {
      title: "Capacity",
      value: capacity,
      icon: "fa-solid fa-user-group",
    },
    {
      title: "Grade",
      value: grade,
      icon: "fa-solid fa-graduation-cap",
    },
    {
      title: "Gender",
      value: gender,
      icon: "bi bi-person-fill-exclamation",
    }
  ]

  return (
    <>
      <Notification title={"Students were removed"} type={"success"} state={successRemoveStudent} setState={setSuccessRemoveStudent} />
      <Notification title={"Class Mustn't Contain students to delete"} type={"error"} state={NotDeletClass} setState={setNotDeleteClass} />
      <Notification title={"Updata Class Details"} type={"success"} state={SuccessUpdateClasss} setState={setSuccessUpdateClasss}/>
      {
        deleteModal && 
        <DeleteModal element={title} id={ClassId} type={"class"} setDeleteModal={setDeleteModal} setSuccessDelete={setDeleteClass} classId={ClassId} />
      }
      { 
        updateBtnClicked ? 
          <ClassForm initialSatate={classDetails} setSuccessAction={setSuccessUpdateClasss} type={"PUT"} setUpdataBtnClicked={setUpdateBtnClicked}/>
        : 
        <MainContainerStyle>
          <TitleAndControalHeader title={ title}  handleUpdataButtonClicked={() =>setUpdateBtnClicked(true)}  handleDeleteClicked={handleDeleteClicked}/>
          <HeaderInformation data={classStatistics} title={'Class Information'} />

          <section>
                <FlexSpaceBetweenContainerStyle >
                  <h3>Teachers</h3>
                  <SubmitBtnStyle onClick={()=>gotoPage('/ManageTeacher/TeacherNewClass/all',{state:{ClassId,grade,classTitle}})}> Add New Teacher</SubmitBtnStyle>
                </FlexSpaceBetweenContainerStyle >
                <TeacherTableCurrentClass classId={ClassId} /> 
          </section>

          <section>
                <FlexSpaceBetweenContainerStyle >
                  <h3>Students</h3>
                  <SubmitBtnStyle onClick={()=>handleAddNewStudentClicked()}> Add New Student</SubmitBtnStyle>
                </FlexSpaceBetweenContainerStyle >
                <StudentTable students={classDetails.students} classID={ClassId} setSuccessRemoveStudent={setSuccessRemoveStudent} />
          </section>

        </MainContainerStyle>
      }
    </>
  );
}
