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
import SubHeaderFilterClassByGrade from "../shared/subHeaderTable/SubHeaderFilterClassByGrade";
import SearchSubHeader from "../shared/SearchSubHeader";

export default function ManageClasses() {

  const [classes, setClasses] = useState([]);
  const [deleteClass, setDeleteClass] = useState(false);
  const [selectedGrade,setSelectedGrade] = useState('')
  const [search,setSearch] = useState('')
  
  useEffect(() => {
    DataServices.showCalsses().then((classes) => {
      setClasses(classes)
    });
  }, [deleteClass])


  return (
    <>
      <Title title={window.location.pathname} />
      <Notification title={"Class Was Deleted"} type={"success"} state={deleteClass} setState={setDeleteClass} />
      <div style={{display: 'flex' , alignItems: 'center',justifyContent: 'space-between'}}>
        <SubHeaderFilterClassByGrade setSelectedGrade={setSelectedGrade}/>
        <SearchSubHeader filter={search} setFilter={setSearch}/>
      </div>
      {
        classes.map((Class, index) => {
          return <ClassSettingMemo Class={Class} search={search} setDeleteClass={setDeleteClass} key={index} selectedGrade={selectedGrade} />;
        })
      }
    </>
  );
}

const ClassSettingMemo = React.memo(({ Class,search, setDeleteClass , selectedGrade }) => {

  console.log(Class)
  if( Class.grade.toLocaleLowerCase() != selectedGrade.toLocaleLowerCase()) return
  if( !Class.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return
  return <ClassSetting ClassId={Class.classId} classTitle={Class.title} setDeleteClass={setDeleteClass} />;
});
