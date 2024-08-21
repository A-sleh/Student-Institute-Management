import { useEffect, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import ClassInfo from "./ClassInfo";
import './class.css'


export default function ClassesDetails() {

  const [classesDetails,setClassesDetails] = useState([]) ;

  useEffect(() => {
    DataServices.showAllCalsses().then( response => {
      setClassesDetails(response)
    });
  },[]);
  
  const showAllCalsses = classesDetails.map( (Class,index) => {
    return <ClassInfo classDetails={Class} key={index}/>
  })
  

  return (
    <>
      <Title title={window.location.pathname}/>
      <div className="class-container">
        {showAllCalsses}
      </div>
    </>
  );
}
