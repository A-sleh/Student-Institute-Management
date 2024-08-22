import { useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";
import Notification from "../Global/Notification";

export default function UpdateSubject(props) {
  const [subject, setSubject] = useState(props.subject);
  const [successUpdate, setSuccessUpdate] = useState(false);
  const [validation, setValidation] = useState({
    subjectMarke: false,
  });

  const setUpdateBtn = props.setUpdateBtn;

  function Validation() {
    setValidation({
      subjectMarke: subject.maximumMark <= 0,
    });

    return subject.maximumMark <= 0;
  }
  function handleSubmitClicked() {
    const flag = Validation();

    if (!flag) {
      DataServices.UpdateStudent(subject).then((_) => {
        setSuccessUpdate(true);
        setTimeout(() => {
          setSuccessUpdate(false);
        }, 2000);
      });
    }
  }

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
      <div className="update-card">
        <div className="sub-header">Subject</div>
        <form
          className="subject-info"
          onSubmit={(e) => {
            handleSubmitClicked();
          }}
        >
          <label
            style={{
              fontSize: "15px",
              fontWeight: "600",
              margin: "8px 0",
            }}
          >
            Title
          </label>
          <input
            type="text"
            value={subject.subject}
            className="input"
            onChange={(e) => {
              setSubject({ ...subject, subject: e.target.value });
            }}
          />
          <label
            style={{ fontSize: "15px", fontWeight: "600", margin: "8px 0" }}
          >
            Maximum Mark
          </label>
          <input
            type="text"
            value={subject.maximumMark}
            onChange={(e) => {
              setSubject({ ...subject, maximumMark: e.target.value });
            }}
            className="input"
          />
          {validation.subjectMarke && (
            <span style={{ marginTop: "4px", fontSize: "11px", color: "red" }}>
              The Value Must Be Positive
            </span>
          )}
          <div style={{ padding: "0 10px", marginTop: "10px" }}>
            <button className="update-btn" type="submit">
              Apply
            </button>
            <button
              className="delete-btn"
              onClick={() => {
                setUpdateBtn(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
