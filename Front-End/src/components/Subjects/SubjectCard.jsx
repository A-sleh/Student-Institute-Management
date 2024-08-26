import UpdateSubject from "./UpdateSubject";
import ShowSubjectFace from "./ShowSubjectFace";
import { useMemo, useState } from "react";
import DeleteModal from "../Modal/DeleteModal";

export default function SubjectCard({
  Subject,
  setSuccessUpdate,
  setSuccesDelete,
  successUpdate
}) {
  const [updateBtn, setUpdateBtn] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { subject, subjectId, maximumMark } = Subject;
  const MemoShowSubjectFace = useMemo(
    () => (
      <ShowSubjectFace
        subjec={Subject}
        setUpdateBtn={setUpdateBtn}
        setSuccesDelete={setSuccesDelete}
        setDeleteModal={setDeleteModal}
      />
    ),
    [successUpdate]
  );

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
      <div className="flip-card">
        <div
          className="flip-card-inner"
          style={{ transform: updateBtn ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {MemoShowSubjectFace}
          <UpdateSubject
            subject={Subject}
            setUpdateBtn={setUpdateBtn}
            setSuccessUpdate={setSuccessUpdate}
          />
        </div>
      </div>
    </>
  );
}
