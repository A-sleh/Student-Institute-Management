/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { MainContainerStyle } from "../style/styleTags";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import TeacherSubjectsTable from "./TeacherSubjectsTable";
import TeacherClassesTable from "./TeacherClassesTable";
import Notification from "../../Global/Notification";
import TeacherForm from "../newTeacher/TeacherForm";
import DeleteModal from "../../Modal/DeleteModal";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import TitleAndControalHeader from "./TitleAndControalHeader";
import HeaderInformation from "../../shared/HeaderInformation";
import { FlexSpaceBetweenContainerStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import useTeacherInfo from "../../../hooks/useTeacherInfo";


export default function Teacherinfo({teacherId,setSuccessDeleteTeacher}) {

  // for Notifications modal
  const changePageTo = useNavigate() ;
  const [successUpdataTeacher,setSuccessUpdataTeacher] = useState(false)
  const [successDeleteFromSubject,setSuccessDeleteFromSubject] = useState(false)
  const [successDeleteFromClass,setSuccessDeleteFromClass] = useState(false)
  const [teacherInfo] = useTeacherInfo(teacherId,successDeleteFromSubject,successDeleteFromClass,successUpdataTeacher)
  const [NotDeletTeacher, setNotDeleteTeacher] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updataButtonClicked ,setUpdataButtonClicked] = useState(false)
  const [currentTeacherInfo, setCurrentTeacherInfo] = useState({
    id: null,
    name: "",
  });
  
  const { name , lastName , phone ,teacherClasses ,totalSalary} = teacherInfo
  
  const teacherDetailsList = [
    {
      title: "Phone",
      value: phone ,
      icon: "bi bi-telephone-fill"
    }, 
    {
      title: "Classes Number",
      value: teacherClasses,
      icon: "bi bi-building-fill-exclamation",
    },
    {
      title: "Total Salary",
      value: addSpaceBetweenDigit(totalSalary?.total),
      icon: "bi bi-cash-coin",
    },
    {
      title: "Remaining Salary",
      value: addSpaceBetweenDigit(totalSalary?.required) ,
      icon: "bi bi-coin",
    }
  ]

  function handleUpdataButtonClicked() {
    setUpdataButtonClicked(true)
  }

  function handleDeleteClicked() {
    setCurrentTeacherInfo({
      name: `${teacherInfo.name} ${teacherInfo.lastName}`,
      id: teacherInfo.teacherId,
    });
    setDeleteModal(true);
  }

    return(
      <>
        <Notification title={'Delete Teacher From Class'} type={'success'} state ={successDeleteFromClass} setState={setSuccessDeleteFromClass}/>
        <Notification title={'Delete Teacher Subject'} type={'success'} state ={successDeleteFromSubject} setState={setSuccessDeleteFromSubject}/>
        <Notification title={'Updata Teacher Details'} type={'success'} state ={successUpdataTeacher} setState={setSuccessUpdataTeacher}/>
        <Notification  title={'Teacher is teaching in one of the classes.'} type={'error'} state ={NotDeletTeacher} setState={setNotDeleteTeacher} />
        {deleteModal &&  <DeleteModal element={currentTeacherInfo.name} type={"Teacher"} id={currentTeacherInfo.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteTeacher} setUnSuccessDelete={setNotDeleteTeacher} />}
        {   
          updataButtonClicked  ? 
            <TeacherForm initialSatate={teacherInfo} requestType={'PUT'} setSuccessAction={setSuccessUpdataTeacher} setUpdataBtnClicked={setUpdataButtonClicked} /> 
          : 
          <MainContainerStyle >
            <TitleAndControalHeader title={ name + ' ' + lastName }  handleUpdataButtonClicked={handleUpdataButtonClicked}  handleDeleteClicked={handleDeleteClicked}/>
            <HeaderInformation data={teacherDetailsList} title={'Teacher Information'}/>

            <section>
                <FlexSpaceBetweenContainerStyle >
                  <h3>Subjects</h3>
                  <SubmitBtnStyle onClick={()=>{changePageTo(`TeacherNewSubject/` + teacherId )}}> Add New Subject</SubmitBtnStyle>
                </FlexSpaceBetweenContainerStyle >
                <TeacherSubjectsTable teacherId={teacherId} setSuccessDeleteFromSubject={setSuccessDeleteFromSubject} successDeleteFromSubject={successDeleteFromSubject}/>
            </section>

            <section>
                <FlexSpaceBetweenContainerStyle >
                  <h3>Classes</h3>
                  <SubmitBtnStyle onClick={()=>{changePageTo(`TeacherNewClass/` + teacherId )}}> Add New Class</SubmitBtnStyle>
                </FlexSpaceBetweenContainerStyle >
                <TeacherClassesTable teacherId={teacherId} successDeleteFromClass={successDeleteFromClass}setSuccessDeleteFromClass={setSuccessDeleteFromClass}/>
            </section>
          </MainContainerStyle >

        }
      </>
    )
}


