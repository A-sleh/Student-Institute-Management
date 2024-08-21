import "./class.css";
import Title from "../Global/Title";
import { useState } from "react";
import Notification from "../Global/Notification";
import ClassForm from "./ClassForm";

export default function NewClass() {
  const initialSatate = {
    title: "",
    capacity: 0,
    grade: "",
    gender: "",
  };
  const [successCreateClasss, setSuccessCreateClasss] = useState(false);

  return (
    <>
      <Title title={window.location.pathname} />
      <Notification
        title={"Create A New Class"}
        type={"success"}
        state={successCreateClasss}
        setState={setSuccessCreateClasss}
      />
      <ClassForm initialSatate={initialSatate} setSuccessAction={setSuccessCreateClasss} type={'POST'}/>
    </>
  );
}
