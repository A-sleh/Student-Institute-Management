import { useState } from "react";
import { initailSubjectState } from "./Subject";
import DataServices from "../../Data/dynamic/DataServices";

export default function CreateSubject({ setCreateBtn, setSuccessCreate }) {
    
  const [createSubject, setCreateSubject] = useState(initailSubjectState);
  const [validation,setValidation] = useState(false)

  function handleCancelCreateClicked() {
    setCreateBtn(false);
    setCreateSubject(initailSubjectState);
  }

  return (
    <div
      className="subject-card"
      style={{
        top: "0",
        width: "100%",
        height: "100%",
        gap: "0",
        transition: ".5s",
      }}
    >
      <div className="sub-header" style={{ padding: "4px 0" }}>
        Subject
      </div>
      <form className="subject-info" onSubmit={(e) => {

        e.preventDefault() ;

        const maximumMarkValid = createSubject.maximumMark <= 0 ;

        setValidation(maximumMarkValid) ; 

        if(!maximumMarkValid) {
            DataServices.CreateSubject(createSubject).then( _ => {
                
                setSuccessCreate(true)
                setCreateBtn(false)
                setTimeout(() => {
                    setSuccessCreate(false)
                } , 2000 )
            })
        }

      }}>
        <div
          className="row"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label
            style={{
              fontSize: "14px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Title
          </label>
          <input
            type="text"
            className="input"
            style={{ width: "130px", height: "20px" }}
            value={createSubject.subject}
            onChange={(e) => {
              setCreateSubject({ ...createSubject, subject: e.target.value });
            }}
          />
        </div>
        <div
          className="row"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label
            style={{
              fontSize: "14px",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Maximum Mark
          </label>
          <input
            type="number"
            className="input"
            style={{ width: "130px", height: "20px" }}
            value={createSubject.maximumMarks}
            onChange={(e) => {
              setCreateSubject({
                ...createSubject,
                maximumMark: e.target.value,
              });
            }}
          />
        </div>

        <div style={{ display: "flex" }}>
          <button
            style={{ fontSize: "12px", padding: "2px 6px" }}
            className="update-btn"
            type="submit"
          >
            Create
          </button>
          <div
            className="delete-btn"
            style={{ fontSize: "12px", padding: "2px 6px" }}
            onClick={handleCancelCreateClicked}
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
}
