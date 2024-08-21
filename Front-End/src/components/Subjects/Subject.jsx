import { useEffect, useState } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import SubjectCard from "./SubjectCard";
import "./subject.css";

export default function Subject() {
  const [Subjects, setSubject] = useState([]);
  const [successDelete, setSuccesDelete] = useState(false);

  useEffect(() => {
    DataServices.ShowAllSubject().then((subjects) => {
      setSubject(subjects);
    });
  }, [successDelete]);

  return (
    <>
      <Title title={window.location.pathname} />
      <div className="subject-container">
        {Subjects.map((subject, index) => {
          return (
            <SubjectCard
              subject={subject}
              successDelete={successDelete}
              setSuccesDelete={setSuccesDelete}
              key={index}
            />
          );
        })}
        <div className="empty-subject-card">
          <i className="bi bi-plus-lg"></i>
        </div>
      </div>
    </>
  );
}
