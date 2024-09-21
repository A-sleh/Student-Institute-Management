import "./modal.css";
import DataServices from "../../Data/dynamic/DataServices";

export default function DeleteModal(props) {
  const { element, type, id, setDeleteModal, setSuccessDelete  } = props;
  

  function handleSuccessDelete() {
    setDeleteModal(false);
    setSuccessDelete(true);
    setTimeout(() => {
      setSuccessDelete(false);
    }, 2000);
  }
  
  function handleUnSuccessDelete() {
    const {setUnSuccessDelete} = props ;
    
    setDeleteModal(false);
    setUnSuccessDelete(true);
    setTimeout(() => {
      setUnSuccessDelete(false)
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
          DataServices.DeleteSubject(id).then((response) => {
            if(response.status > 299 ) {
              handleUnSuccessDelete()
            } 
            else handleSuccessDelete();
          });
          break;
        case "Teacher":
          DataServices.DeleteTeacher(id).then((response) => {
            if(response.status > 299 ) {
              handleUnSuccessDelete()
            } 
            else handleSuccessDelete();
          });
          break;
          case 'TeacherFromClass' : 
            DataServices.DeleteTeacherFromClass(id.teacherSubjectId,id.classId).then((response) => {
              if(response.status < 299 ) {
                handleSuccessDelete();
              } 
            });
            break;  
          case "TeacherSubject" : 
             DataServices.DeleteTeacherSubject(id).then(response => {
              if(response.status > 299 ) {
                handleUnSuccessDelete() ;
              }else {
                handleSuccessDelete()
              }
            })
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
