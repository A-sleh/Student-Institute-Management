import {  useNavigate, useSearchParams } from "react-router-dom";
import "./modal.css";
import DataServices from "../../Data/dynamic/DataServices";
import { useContext } from "react";
import { SharedState } from "../../App";

export default function DeleteStudenModal() {

  const [SearchParams, setSearchParams] = useSearchParams();
  const {setSuccessDeleteStudent} = useContext(SharedState) ;

  const studentInfo = JSON.parse(decodeURIComponent(SearchParams.get("data")));
  const StudnetName = `${studentInfo.name} ${studentInfo.lastName} `;
  const gotoStudentDetailsPage = useNavigate();

  function handleDeletClicked() {
    try {
      DataServices.DeleteSutent(studentInfo.id).then( _ => {
        setSuccessDeleteStudent(true)
        setTimeout(() => {
          setSuccessDeleteStudent(false)
        } ,2000)
        gotoStudentDetailsPage(-1,{replace: 'true'})
      })
    }catch(error) {
      // should fixed error here
    }
  }


  return (
    <div className="delete-modal">
      <div>
        <i
          className="bi bi-exclamation-triangle-fill"
          style={{ color: "red", fontSize: "3em" }}
        ></i>
        <p style={{ fontWeight: "600", fontSize: "1.5em", margin: "5px 0" }}>
          Are you sure?
        </p>
        <p className="content">This action will Delete the student <b style={{color: '#2b2121'}}>{StudnetName}</b>.</p>
        <p className="content">You can not undo this action</p>
        <div>
          <button onClick={handleDeletClicked}>Yes, delete </button>
          <button onClick={()=>{gotoStudentDetailsPage('/StudentsDetails',{replace: 'true'})}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
