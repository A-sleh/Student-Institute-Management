import React, { useEffect, useState, createContext, useMemo } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import "./class.css";
import ClassSetting from "./ClassSetting";
import Notification from "../Global/Notification";
import InsertNewStudent from "./InsertNewStudent";

export default function ManageClasses() {
  console.log("render parent");

  const [classesId, setClassesId] = useState([null]);
  const [deleteClass, setDeleteClass] = useState(false);
  
  useEffect(() => {
  
    DataServices.showCalsses().then((response) => {
      const ClassesIds = response.map((res) => {
        return res.classId;
      });
      setClassesId(ClassesIds);
    });
  }, [deleteClass]);


  return (
    <>
      <Title title={window.location.pathname} />
      <Notification
        title={"Class Was Deleted"}
        type={"success"}
        state={deleteClass}
        setState={setDeleteClass}
      />
      <div className="manage-class-container">
        {classesId[0] != null ? classesId.map((id, index) => {
          return <ClassSettingMemo ClassId={id} setDeleteClass={setDeleteClass} key={index} />;
        }) : <span>Loading...</span>
      }
      </div>
    </>
  );
}

const ClassSettingMemo = React.memo(({ ClassId, setDeleteClass }) => {
  return <ClassSetting ClassId={ClassId} setDeleteClass={setDeleteClass} />;
});
