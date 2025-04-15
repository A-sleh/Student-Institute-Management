
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { FlexSpaceBetweenContainerStyle } from "../../shared/style/styleTag";
import { useEffect, useState } from "react";
import { MainContainerStyle } from "../../Teachers/style/styleTags";
import DataServices from "./../../../Data/dynamic/DataServices";
import HeaderInformation from "../../shared/HeaderInformation";
import TeacherTagsList from './TeacherTagsList'
import StudnetsTagsList from "./StudentsTagsList";
import { ClassesDetailsTEXT } from "../../../Data/static/classes/ClassesDetails/ClassesDetailsTEXT";
import { useSelector } from "react-redux";

export default function ClassInfo({ classDetails }) {

  const {currentLange} = useSelector( state => state.language)
  const {subTitle ,teacherstitle ,studentsTitle,classTitle} = ClassesDetailsTEXT[currentLange]

  const { title, gender, grade, students , classId } = classDetails;
  const [teachersNumber,setTeachersNumber] = useState([])

  useEffect(() => {
    DataServices.ShowTeacherInSideClass(classId).then( teachers => {
      setTeachersNumber(teachers?.length )
    })
  } ,[])

  // if the class don't contain any studnet will return an array with length one so we remove it useing this condition
  const totalStudentsNumber = students?.length - (students != undefined && students[0] == null); 

  const classStatistics = [
    {
      title: {
        english: "Students" ,
        arabic: 'عددالطلاب'
      },
      value: totalStudentsNumber ,
      icon: "fa-solid fa-user-group"
    }, 
    {
      title: {
        english: "Teachers",
        arabic: 'عددالأساتذه'
      },
      value: teachersNumber,
      icon: "fa-solid fa-person-chalkboard",
    },
    {
      title: {
        english: "Gender",
        arabic: 'فئه الشعبه'
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
      <MainContainerStyle>

        <h1 style={{fontWeight: '500' , fontSize: '17px' , margin: '5px 0' , textTransform: 'uppercase'}}> <span style={{ fontWeight: '600' , color: '#056699'}}>{classTitle} / </span> {title}</h1>

        <HeaderInformation data={classStatistics} title={subTitle}/>

        <section>
          <FlexSpaceBetweenContainerStyle >
            <h3>{teacherstitle}</h3>
          </FlexSpaceBetweenContainerStyle >
          <TeacherTagsList classId={classId} classHasNoTeachers={teachersNumber == 0 }/>
          
        </section>

        <section>
          <FlexSpaceBetweenContainerStyle >
            <h3>{studentsTitle}</h3>
          </FlexSpaceBetweenContainerStyle >
          <StudnetsTagsList students={students} classId={classId} classHasNoStudents={totalStudentsNumber == 0}/>
        </section>

      </MainContainerStyle>
    </>
  );
}
