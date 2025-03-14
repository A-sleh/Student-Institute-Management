import "./modal.css";
import DataServices from "../../Data/dynamic/DataServices";
import { modelTEXT } from "../../Data/static/modelTEXT";
import { useSelector } from 'react-redux'

export default function DeleteModal(props) {

  const {currentLange} = useSelector( state => state.language)
  const {content ,cancelBtn ,accepteBtn} = modelTEXT[currentLange]
  
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
          DataServices.DeleteClass(id).then((response) => {
            if(response.status > 299 ) {
              handleUnSuccessDelete()
            } 
            else handleSuccessDelete();
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
          case "Bill" : 
             DataServices.DeleteStudentBill(id.billId).then(response => {
              if(response.status <= 299 ) {
                handleSuccessDelete()
              }
            })
            break;
          case "Grade" : 
             DataServices.DeleteGrade(id).then(response => {
              if(response.status <= 299 ) {
                handleSuccessDelete()
              }else handleUnSuccessDelete()
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
      <div style={{lineHeight: '30px'}}>
        <i
          className="bi bi-exclamation-triangle-fill"
          style={{ color: "red", fontSize: "5em" }}
        ></i>
        <span style={{ fontWeight: "600", fontSize: "1.5em", margin: "5px 0" }}>
          {content.sub1}
        </span>
        <span className="modal-content">
          {content.sub2}{type}{" "}
          <b style={{ color: "#2b2121" }}>{element}</b>.
        </span>
        <span className="modal-content">{content.sub3}</span>
        <div>
          <button onClick={handleDeletClicked}>{accepteBtn} </button>
          <button
            onClick={() => {
              setDeleteModal(false);
            }}
          >
            {cancelBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
