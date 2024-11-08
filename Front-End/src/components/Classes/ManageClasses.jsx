import React, { useEffect, useState, createContext, useMemo } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import "./class.css";
import ClassSetting from "./ClassSetting";
import Notification from "../Global/Notification";
import InsertNewStudent from "./InsertNewStudent";
// import { HeaderControal } from "../Bills/TeacherPaysCom/ShowBillTeacherDetails";

export default function ManageClasses() {

  const [classesId, setClassesId] = useState([null]);
  const [deleteClass, setDeleteClass] = useState(false);
  const [search,setSearch] = useState('')
  
  useEffect(() => {
  
    DataServices.showCalsses().then((classes) => {
  
      const ClassesIds = classes.map((res) => {
        return {
          classId : res.classId ,
          title : res.title
        };
      });
      setClassesId(ClassesIds);
    });
  }, [deleteClass]);


  return (
    <>
      <Title title={window.location.pathname} />
      {/* <HeaderControal searcByName={search}setSearcByName={setSearch}/> */}
      <Notification
        title={"Class Was Deleted"}
        type={"success"}
        state={deleteClass}
        setState={setDeleteClass}
      />
      <div className="manage-class-container">
        {classesId[0] != null ? classesId.map((Class, index) => {
          return <ClassSettingMemo ClassId={Class.classId} search={search} title={Class.title} setDeleteClass={setDeleteClass} key={index} />;
        }) : <span>Loading...</span>
      }
      </div>
    </>
  );
}

const ClassSettingMemo = React.memo(({ ClassId,title,search, setDeleteClass }) => {
  if( !title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return
  return <ClassSetting ClassId={ClassId} classTitle={title} setDeleteClass={setDeleteClass} />;
});
