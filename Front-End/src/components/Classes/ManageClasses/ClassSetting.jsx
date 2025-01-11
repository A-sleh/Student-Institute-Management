/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { FlexSpaceBetweenContainerStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import { useDispatch, useSelector } from "react-redux";
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
import { ManageClassesTEXT } from "../../../Data/static/classes/ManageClass/ManageClassesTEXT";

export default function ClassSetting({ ClassId, setDeleteClass ,classTitle}) {

  const {currentLange} = useSelector( state => state.language)
  const { subTitle ,teacherstitle,studentsTitle ,addNewTeacherBtn ,addNewStudentBtn ,successRemoveStudentsMES ,successUpdateClassMES ,errorDeleteClassMES } = ManageClassesTEXT[currentLange]
  
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
      title: {
        english: "Title" ,
        arabic: 'عنوان الشعبة'
      } ,
      value: title ,
      icon: "bi bi-archive-fill"
    }, 
    {
      title: {
        english: "Capacity" ,
        arabic: 'سعة الشعبة'
      },
      value: capacity,
      icon: "fa-solid fa-user-group",
    },
    {
      title: {
        english: "Grade",
        arabic: 'فئة الشعبة'
      },
      value: grade,
      icon: "fa-solid fa-graduation-cap",
    },
    {
      title: {
        english: "Gender" ,
        arabic: 'جنس الطلاب'
      },
      value: gender,
      icon: "bi bi-person-fill-exclamation",
    }
  ]

  return (
    <>
      <Notification title={successRemoveStudentsMES} type={"success"} state={successRemoveStudent} setState={setSuccessRemoveStudent} />
      <Notification title={successUpdateClassMES} type={"success"} state={SuccessUpdateClasss} setState={setSuccessUpdateClasss}/>
      <Notification title={errorDeleteClassMES} type={"error"} state={NotDeletClass} setState={setNotDeleteClass} />
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
          <HeaderInformation data={classStatistics} title={subTitle} />

          <section>
                <FlexSpaceBetweenContainerStyle >
                  <h3>{teacherstitle}</h3>
                  <SubmitBtnStyle onClick={()=>gotoPage('/ManageTeacher/TeacherNewClass/all',{state:{ClassId,grade,classTitle}})}> {addNewTeacherBtn}</SubmitBtnStyle>
                </FlexSpaceBetweenContainerStyle >
                <TeacherTableCurrentClass classId={ClassId} /> 
          </section>

          <section>
                <FlexSpaceBetweenContainerStyle >
                  <h3>{studentsTitle}</h3>
                  <SubmitBtnStyle onClick={()=>handleAddNewStudentClicked()}> {addNewStudentBtn}</SubmitBtnStyle>
                </FlexSpaceBetweenContainerStyle >
                <StudentTable students={classDetails.students} classID={ClassId} setSuccessRemoveStudent={setSuccessRemoveStudent} />
          </section>

        </MainContainerStyle>
      }
    </>
  );
}
