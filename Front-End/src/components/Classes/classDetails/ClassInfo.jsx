
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

export default function ClassInfo({ classDetails }) {

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
      title: "Students",
      value: totalStudentsNumber ,
      icon: "fa-solid fa-user-group"
    }, 
    {
      title: "Teachers",
      value: teachersNumber,
      icon: "fa-solid fa-person-chalkboard",
    },
    {
      title: "Gender",
      value: grade,
      icon: "fa-solid fa-graduation-cap",
    },
    {
      title: "Remaining Salary",
      value: gender,
      icon: "bi bi-person-fill-exclamation",
    }
  ]

  return (
    <>
      <MainContainerStyle>

        <h1 style={{fontWeight: '500' , fontSize: '20px' , margin: '5px 0' , textTransform: 'uppercase'}}>{title}</h1>

        <HeaderInformation data={classStatistics} title={'Class Information'}/>

        <section>
          <FlexSpaceBetweenContainerStyle >
            <h3>Teachers</h3>
          </FlexSpaceBetweenContainerStyle >
          <TeacherTagsList classId={classId} classHasNoTeachers={teachersNumber == 0 }/>
          
        </section>

        <section>
          <FlexSpaceBetweenContainerStyle >
            <h3>Students</h3>
          </FlexSpaceBetweenContainerStyle >
          <StudnetsTagsList students={students} classHasNoStudents={totalStudentsNumber == 0}/>
        </section>

      </MainContainerStyle>
    </>
  );
}
