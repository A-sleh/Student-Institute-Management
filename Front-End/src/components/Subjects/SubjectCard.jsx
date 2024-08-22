import { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";
import Notification from "../Global/Notification";
import UpdateSubject from "../Modal/UpdateSubject";

export default function SubjectCard(props) {
  const { subject, subjectId, maximumMark } = props.subject;
  const successDelete = props.successDelete;
  const setSuccesDelete = props.setSuccesDelete;

  const [deleteModal, setDeleteModal] = useState(false);
  const [updateBtn,setUpdateBtn] = useState(false)

  function handleDeleteClicked() {
    setDeleteModal(true);
  }

  return (
    <>
      {deleteModal && (
        <DeleteModal
          element={subject}
          type={"Subject"}
          id={subjectId}
          setDeleteModal={setDeleteModal}
          setSuccessDelete={setSuccesDelete}
        />
      )}
      {successDelete && (
        <Notification
          title={"Delete The Subject"}
          type={"success"}
          state={successDelete}
          setState={setSuccesDelete}
        />
      )}
      <div className="flip-card">
        <div className="flip-card-inner" style={{transform: updateBtn ? 'rotateY(180deg)' : 'rotateY(0deg)'}} >
          <div className="subject-card">
            <div className="sub-header">Subject</div>
            <div className="subject-info">
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  marginBottom: "8px",
                }}
              >
                Title :
                <span style={{ fontSize: "14px", fontWeight: "400" }}>
                  {" "}
                  {subject}
                </span>
              </p>
              <span style={{ fontSize: "15px", fontWeight: "600" }}>
                Maximum Mark :
                <span style={{ fontSize: "14px", fontWeight: "400" }}>
                  {" "}
                  {maximumMark}
                </span>
              </span>
            </div>
            <div style={{ padding: "0 10px" }}>
              <button className="update-btn" onClick={()=>{setUpdateBtn(true)}}>Update</button>
              <button onClick={handleDeleteClicked} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
          <UpdateSubject subject={props.subject} setUpdateBtn={setUpdateBtn} setSuccessUpdate={props.setSuccessUpdate}/>
        </div>
      </div>
    </>
  );
}
