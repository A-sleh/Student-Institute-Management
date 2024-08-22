import "./modal.css";
import DataServices from "../../Data/dynamic/DataServices";

export default function DeleteModal(props) {
  const { element, type, id, setDeleteModal, setSuccessDelete } = props;

  function handleSuccessDelete() {
    setDeleteModal(false);
    setSuccessDelete(true);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 2000);
  }

  function handleDeletClicked() {
    try {
      switch (type) {
        case "student":
          DataServices.DeleteSutent(id).then((_) => {
            handleSuccessDelete();
          });
          break;
        case "class":
          DataServices.DeleteClass(id).then((_) => {
            handleSuccessDelete();
          });
          break;
        case "Subject":
          DataServices.DeleteSubject(id).then((repsonse) => {
            handleSuccessDelete();
          });

          break;
        default:
          // UnValid Type
          break;
      }
    } catch (error) {
      // should fixed error here
    }
  }

  return (
    <div className="modal">
      <div>
        <i
          className="bi bi-exclamation-triangle-fill"
          style={{ color: "red", fontSize: "5em" }}
        ></i>
        <p style={{ fontWeight: "600", fontSize: "1.5em", margin: "5px 0" }}>
          Are you sure?
        </p>
        <p className="modal-content">
          This action will Delete the {type}{" "}
          <b style={{ color: "#2b2121" }}>{element}</b>.
        </p>
        <p className="modal-content">You can not undo this action</p>
        <div>
          <button onClick={handleDeletClicked}>Yes, delete </button>
          <button
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
