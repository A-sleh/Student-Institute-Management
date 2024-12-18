
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useState } from "react";
import Title from "../Global/Title";
import Notification from "../Global/Notification";
import ClassForm from "./NewClass/ClassForm";


export default function NewClass() {
  const initialSatate = { title: "", capacity: 0, grade: "", gender: "",gradeId: 0};
  const [successCreateClasss, setSuccessCreateClasss] = useState(false);

  return (
    <>
      <Title title={window.location.pathname} />
      <Notification title={"Create A New Class"} type={"success"} state={successCreateClasss} setState={setSuccessCreateClasss} />
      <ClassForm initialSatate={initialSatate} setSuccessAction={setSuccessCreateClasss} type={'POST'}/>
    </>
  );
}
