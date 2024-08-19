import { useEffect, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import ClassInfo from "./ClassInfo";


export default function ManageClasses() {

  const [classDetails,setClassDetails] = useState([]) ;
  useEffect(() => {
    DataServices.showAllCalsses().then( response => {
      setClassDetails(response)
    })
  },[])

  return (
    <>
      <Title title={window.location.pathname}/>
      <div className="manage-class-container">
        <ClassInfo classDetails={classDetails}/>
      </div>
    </>
  );
}
