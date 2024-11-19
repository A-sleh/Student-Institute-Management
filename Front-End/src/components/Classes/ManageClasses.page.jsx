/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import React, { useEffect, useState} from "react";
import DataServices from "../../Data/dynamic/DataServices";
import ClassSetting from "./ManageClasses/ClassSetting";
import Notification from "../Global/Notification";
import Title from "../Global/Title";

export default function ManageClasses() {

  const [classesId, setClassesId] = useState([]);
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
      <Notification title={"Class Was Deleted"} type={"success"} state={deleteClass} setState={setDeleteClass} />
      {
        classesId.map((Class, index) => {
          return <ClassSettingMemo ClassId={Class.classId} search={search} title={Class.title} setDeleteClass={setDeleteClass} key={index} />;
        })
      }
    </>
  );
}

const ClassSettingMemo = React.memo(({ ClassId,title,search, setDeleteClass }) => {
  if( !title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return
  return <ClassSetting ClassId={ClassId} classTitle={title} setDeleteClass={setDeleteClass} />;
});
