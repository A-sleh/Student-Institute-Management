
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useState } from "react";
import Title from "../Global/Title";
import Notification from "../Global/Notification";
import ClassForm from "./NewClass/ClassForm";
import { useSelector } from "react-redux";
import { NewClassTEXT } from "../../Data/static/classes/NewClass/NewClassTEXT";


export default function NewClass() {

  const {currentLange} = useSelector( state => state.language)
  const { successCreateClassMES } = NewClassTEXT[currentLange]
  const initialSatate = { title: "", capacity: 0, grade: "", gender: "",gradeId: 0};
  const [successCreateClasss, setSuccessCreateClasss] = useState(false);

  return (
    <>
      <Title title={window.location.pathname} />
      <Notification title={successCreateClassMES} type={"success"} state={successCreateClasss} setState={setSuccessCreateClasss} />
      <ClassForm initialSatate={initialSatate} setSuccessAction={setSuccessCreateClasss} type={'POST'}/>
    </>
  );
}
