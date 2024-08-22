import { useEffect, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import SubjectCard from "./SubjectCard";
import "./subject.css";
import Notification from "../Global/Notification";
import UpdateSubject from "../Modal/UpdateSubject";

export default function Subject() {
  const [Subjects, setSubject] = useState([]);
  const [successDelete, setSuccesDelete] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [createBtn,setCreateBtn] = useState(false)


  useEffect(() => {
    DataServices.ShowAllSubject().then((subjects) => {
      setSubject(subjects);
    });
  }, [successDelete,successUpdate]);

  return (
    <>
      {successUpdate && (
        <Notification
          title={"Update The Subject"}
          type={"success"}
          state={successUpdate}
          setState={setSuccessUpdate}
        />
      )}
      <Title title={window.location.pathname} />
      <div className="subject-container">
        {Subjects.map((subject, index) => {
          return (
            <SubjectCard
              subject={subject}
              successDelete={successDelete}
              setSuccesDelete={setSuccesDelete}
              setSuccessUpdate={setSuccessUpdate}
              key={index}
            />
          );
        })}
        <div className="empty-subject-card" onClick={()=>{setCreateBtn(true)}}>
          { !createBtn && <i className="bi bi-plus-lg"></i>}
          { createBtn && <UpdateSubject />}
        </div>
      </div>
    </>
  );
}
