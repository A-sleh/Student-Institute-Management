import { useEffect, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import './class.css'
import ClassSetting from "./ClassSetting";
import Notification from "../Global/Notification";


export default function ManageClasses() {

  const [classDetails,setClassDetails] = useState([]) ;
  const [deleteClass,setDeleteClass] = useState(false)

  useEffect(() => {
    DataServices.showAllCalsses().then( response => {
      setClassDetails(response)
    })
  },[deleteClass])

  return (
    <>
      <Title title={window.location.pathname}/>
      <Notification title={'Class Was Deleted'} type={'success'} state={deleteClass}  setState={setDeleteClass} /> 
      <div className="manage-class-container">
        {
          classDetails.map((Class,index) => (
            <ClassSetting classDetails={ Class } key={index} setDeleteClass={setDeleteClass} />
          ))
        }
      </div>
    </>
  );
}
