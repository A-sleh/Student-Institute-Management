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
  grade : '',
  maximumMark: 0,
};

export default function Subject() {
  const [Subjects, setSubject] = useState({ninth :[] , bachelor : []});
  const [successDelete, setSuccesDelete] = useState(false);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);
  const [createBtn_1, setCreateBtn_1] = useState(false);
  const [createBtn_2, setCreateBtn_2] = useState(false);

  useEffect(() => {
    DataServices.ShowAllSubject().then((subjects) => {
      console.log('render')
      const ninthAndBachelorSub = Object.groupBy(subjects,({grade}) => {
        return grade == 'ninth' ? 'ninth' : 'bachelor'
      })
      setSubject({ninth :[] , bachelor : [],...ninthAndBachelorSub})
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

      <div style={{padding: '10px 20px' , backgroundColor: '#eee' , borderRadius: '10px' , margin : '10px 0'}}>
        <h3 style={{fontSize: '18px' , marginBottom: '10px'}}>Bachelor Subjects </h3>
        <div className="subject-container" style={{margin: '0'}}>
          {Subjects.bachelor.map((subject, index) => {
            return (
              <SubjectCard
                Subject={subject}
                setSuccessUpdate={setSuccessUpdate}
                setSuccesDelete={setSuccesDelete}
                successUpdate={successUpdate}
                grade={'bachelor'}
                key={index}
              />
            );
          })}
          <div className="empty-subject-card" style={{ position: "relative" }}>
            {createBtn_1 ? (
              <CreateSubject
                setCreateBtn={setCreateBtn_1}
                setSuccessCreate={setSuccessCreate}
                grade={'bachelor'}
              />
            ) : (
              <i
                className="bi bi-plus-lg"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setCreateBtn_1(true);
                }}
              ></i>
            )}
          </div>
        </div>
      </div>

    <div style={{padding: '10px 20px' , backgroundColor: '#eee' , borderRadius: '10px' }}>
      <h3 style={{fontSize: '18px' , marginBottom: '10px'}}>Ninth Subjects </h3>
      <div className="subject-container">
        {Subjects.ninth.map((subject, index) => {
          return (
            <SubjectCard
              Subject={subject}
              setSuccessUpdate={setSuccessUpdate}
              setSuccesDelete={setSuccesDelete}
              successUpdate={successUpdate}
              grade={'ninth'}
              key={index}
            />
          );
        })}
        <div className="empty-subject-card" style={{ position: "relative" }}>
          {createBtn_2 ? (
            <CreateSubject
              setCreateBtn={setCreateBtn_2}
              setSuccessCreate={setSuccessCreate}
              grade={'ninth'}
            />
          ) : (
            <i
              className="bi bi-plus-lg"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setCreateBtn_2(true);
              }}
            ></i>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
