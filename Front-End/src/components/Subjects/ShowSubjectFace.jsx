
export default function ShowSubjectFace({
  subjec,
  setUpdateBtn,
  setDeleteModal
}) {
  const { subject, subjectId, maximumMark } = subjec;
  function handleDeleteClicked() {
    setDeleteModal(true);
  }

  return (
    <>
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
          <button
            className="update-btn"
            onClick={() => {
              setUpdateBtn(true);
            }}
          >
            Update
          </button>
          <button onClick={handleDeleteClicked} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
