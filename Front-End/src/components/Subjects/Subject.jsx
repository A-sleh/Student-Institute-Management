import { useEffect, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import SubjectCard from "./SubjectCard";
import "./subject.css";
import Notification from "../Global/Notification";
import CreateSubject from "./CreateSubject";

export const initailSubjectState = {
  subjectId: 0,
  subject: "",
  maximumMark: 0,
};

export default function Subject() {
  const [Subjects, setSubject] = useState([]);
  const [successDelete, setSuccesDelete] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);
  const [createBtn, setCreateBtn] = useState(false);

  useEffect(() => {
    DataServices.ShowAllSubject().then((subjects) => {
      setSubject(subjects);
    });
  }, [successUpdate, successCreate, successDelete]);

  return (
    <>
      <Notification
        title={"Update The Subject"}
        type={"success"}
        state={successUpdate}
        setState={setSuccessUpdate}
      />

      <Notification
        title={"Create The Subject"}
        type={"success"}
        state={successCreate}
        setState={setSuccessCreate}
      />

      <Notification
        title={"Delete The Subject"}
        type={"success"}
        state={successDelete}
        setState={setSuccesDelete}
      />

      <Title title={window.location.pathname} />
      <div className="subject-container">
        {Subjects.map((subject, index) => {
          return (
            <SubjectCard
              Subject={subject}
              setSuccessUpdate={setSuccessUpdate}
              setSuccesDelete={setSuccesDelete}
              successUpdate={successUpdate}
              key={index}
            />
          );
        })}
        <div className="empty-subject-card" style={{ position: "relative" }}>
          {createBtn ? (
            <CreateSubject
              setCreateBtn={setCreateBtn}
              setSuccessCreate={setSuccessCreate}
            />
          ) : (
            <i
              className="bi bi-plus-lg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCreateBtn(true);
              }}
            ></i>
          )}
        </div>
      </div>
    </>
  );
}

/* 

  <SubjectCard
    subject={subject}
    successDelete={successDelete}
    setSuccesDelete={setSuccesDelete}
    setSuccessUpdate={setSuccessUpdate}
    key={index}
  />
*/
