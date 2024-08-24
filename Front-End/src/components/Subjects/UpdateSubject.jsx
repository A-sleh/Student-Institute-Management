import { useState } from "react";
import DataServices from "../../Data/dynamic/DataServices";

export default function UpdateSubject(props) {
  
  const [subject, setSubject] = useState(props.subject);
  const setSuccessUpdate = props.setSuccessUpdate ;
  const setUpdateBtn = props.setUpdateBtn;
  const [validation, setValidation] = useState({
    subjectMarke: false,
  });


  function Validation() {
    setValidation({
      subjectMarke: subject.maximumMark <= 0,
    });

    return subject.maximumMark <= 0;
  }

  function handleSubmitClicked() {

    const flag = Validation();

    if (!flag) {
      DataServices.UpdateSubject(subject).then((_) => {
        setSuccessUpdate(true);
        setUpdateBtn(false)
        setTimeout(() => {
          setSuccessUpdate(false);
        }, 2000);
      });
    }
  }

  return (
      <div className="update-card" style={{boxShadow:'box-shadow: 0 0 10px -5px gray'}}>
        <div className="sub-header" style={{borderTopLeftRadius: '5px' , borderTopRightRadius: '5px'}}>Subject</div>
        <form
          className="subject-info"
          onSubmit={(e) => {
            e.preventDefault();
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
          <div style={{ marginTop: "10px" }}>
            <button className="update-btn" type="submit">
              Apply
            </button>
            <span
              className="delete-btn"
              onClick={() => {
                setUpdateBtn(false);
              }}
            >
              Cancel
            </span>
          </div>
        </form>
      </div>
  );
}
