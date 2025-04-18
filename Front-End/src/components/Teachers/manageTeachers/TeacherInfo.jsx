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
import useTeacherInfo from "../../../hooks/teacher_hooks/useTeacherInfo";
import { useDispatch, useSelector } from "react-redux";
import { ManageTeachersTEXT } from "../../../Data/static/teachers/ManageTeacher/ManageTeachersTEXT";
import { TEACHER_SECTION } from "../../../Redux/actions/type";


export default function Teacherinfo({teacherId,refProp}) {

  const {currentLange} = useSelector( state => state.language)
  const {subjectsTitle ,classesTitle ,teacherTitleInfo ,teacherSubTitle ,addNewSubjectBtn ,addNewClassBtn,
    successDeleteTeacherMES ,successDeleteTeacherSubjectMES ,successUpdateTeacherMES ,errorDeleteTeacherMES} = ManageTeachersTEXT[currentLange]

  // for Notifications modal
  const changePageTo = useNavigate() ;
  const dispatch = useDispatch()
  const [successUpdataTeacher,setSuccessUpdataTeacher] = useState(false)
  const [successDeleteFromSubject,setSuccessDeleteFromSubject] = useState(false)
  const [successDeleteFromClass,setSuccessDeleteFromClass] = useState(false)
  const [teacherInfo] = useTeacherInfo(teacherId,successDeleteFromSubject,successDeleteFromClass,successUpdataTeacher)
  const [updataButtonClicked ,setUpdataButtonClicked] = useState(false)  
  const { name = '' , lastName = '', phone = '' ,teacherClasses = 0 ,totalSalary = 0 } = teacherInfo
  
  const teacherDetailsList = [
    {
      title: {
        arabic: 'رقم الهاتف' ,
        english: "Phone"
      } ,
      value: phone ,
      icon: "bi bi-telephone-fill"
    }, 
    {
      title: {
        arabic: 'عدد الصفوف' ,
        english:  "Classes Number"
      },
      value: teacherClasses,
      icon: "bi bi-building-fill-exclamation",
    },
    {
      title: {
        arabic: 'المبلغ الإجمالي' ,
        english:  "Total Salary"
      },
      value: addSpaceBetweenDigit(totalSalary?.total),
      icon: "bi bi-cash-coin",
    },
    {
      title: {
        arabic: 'المبلغ المتبقي' ,
        english:  "Remaining Salary"
      },
      value: addSpaceBetweenDigit(totalSalary?.required) ,
      icon: "bi bi-coin",
    }
  ]

  function handleUpdataButtonClicked() {
    setUpdataButtonClicked(true)
  }

  return(
    <>
      <Notification title={successDeleteTeacherMES} type={'success'} state ={successDeleteFromClass} setState={setSuccessDeleteFromClass}/>
      <Notification title={successDeleteTeacherSubjectMES} type={'success'} state ={successDeleteFromSubject} setState={setSuccessDeleteFromSubject}/>
      <Notification title={successUpdateTeacherMES} type={'success'} state ={successUpdataTeacher} setState={setSuccessUpdataTeacher}/>
      {   
        updataButtonClicked  ? 
          <TeacherForm initialSatate={teacherInfo} requestType={'PUT'} setSuccessAction={setSuccessUpdataTeacher} setUpdataBtnClicked={setUpdataButtonClicked} /> 
        : 
        <MainContainerStyle ref={refProp} >
          <TitleAndControalHeader title={ name + ' ' + lastName }  handleUpdataButtonClicked={handleUpdataButtonClicked}  showDeleteBtn={false}>
            {teacherSubTitle}
          </TitleAndControalHeader>

          <HeaderInformation data={teacherDetailsList} title={teacherTitleInfo}/>

          <section>
              <FlexSpaceBetweenContainerStyle >
                <h3>{subjectsTitle}</h3>
                <SubmitBtnStyle onClick={()=> {
                  changePageTo(`TeacherNewSubject/` + teacherId )
                  dispatch({
                    type: TEACHER_SECTION ,
                    payload: `teacher_${teacherId}`
                  })                    
                }}>{addNewSubjectBtn}</SubmitBtnStyle>
              </FlexSpaceBetweenContainerStyle >
              <TeacherSubjectsTable teacherId={teacherId} setSuccessDeleteFromSubject={setSuccessDeleteFromSubject} successDeleteFromSubject={successDeleteFromSubject}/>
          </section>

          <section>
              <FlexSpaceBetweenContainerStyle >
                <h3>{classesTitle}</h3>
                <SubmitBtnStyle onClick={()=>{
                  dispatch({
                    type: TEACHER_SECTION ,
                    payload: `teacher_${teacherId}`
                  })
                  changePageTo(`TeacherNewClass/` + teacherId )
                }}>{addNewClassBtn}</SubmitBtnStyle>
              </FlexSpaceBetweenContainerStyle >
              <TeacherClassesTable teacherId={teacherId} successDeleteFromClass={successDeleteFromClass}setSuccessDeleteFromClass={setSuccessDeleteFromClass}/>
          </section>
        </MainContainerStyle >

      }
    </>
  )
}



