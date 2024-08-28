import { useEffect, useState, createContext, useMemo } from "react";
import Title from "../Global/Title";
import DataServices from "../../Data/dynamic/DataServices";
import "./class.css";
import { ClassSetting } from "./ClassSetting";
import Notification from "../Global/Notification";
import InsertNewStudent from "./InsertNewStudent";

export const AddStudentContext = createContext(null);
export const RemoveStudentContext = createContext(null);
export const MoveStudentContext = createContext(null);


export default function ManageClasses() {
  console.log('render parent ................')
  const [test, setTest] = useState(0);
  const [classDetails, setClassDetails] = useState([]);
  const [deleteClass, setDeleteClass] = useState(false);
  const [successAddStudent, setSuccessAddStudent] = useState(false);
  const [successRemoveStudent, setSuccessRemoveStudent] = useState(false);
  const [successMoveStudent, setSuccessMoveStudent] = useState(false);

  useEffect(() => {
    DataServices.showAllCalsses().then((response) => {
      setClassDetails(response);
    });
  }, []);

  return (
    <>
      <Title title={window.location.pathname} />
      <Notification
        title={"Class Was Deleted"}
        type={"success"}
        state={deleteClass}
        setState={setDeleteClass}
      />
      <Notification
        title={"Remove Students From The Class"}
        type={"success"}
        state={successRemoveStudent}
        setState={setSuccessRemoveStudent}
      />
      <AddStudentContext.Provider
        value={{ successAddStudent, setSuccessAddStudent }}
      >
        <RemoveStudentContext.Provider
          value={{ successRemoveStudent, setSuccessRemoveStudent }}
        >
          <MoveStudentContext.Provider
            value={{ successMoveStudent, setSuccessMoveStudent }}
          >
            <div className="manage-class-container">
              {classDetails.map((Class, index) => (
                <ClassMemo
                  classDetails={Class}
                  key={index}
                  setDeleteClass={setDeleteClass}
                />
              ))}
            </div>
          </MoveStudentContext.Provider>
        </RemoveStudentContext.Provider>
      </AddStudentContext.Provider>
    </>
  );
}

function ClassMemo({ classDetails, setDeleteClass }) {
  
  const ClassMemo = useMemo(
    () => <ClassSetting classDetails={classDetails} setDeleteClass={setDeleteClass} />,
    [classDetails]
  );
  return ClassMemo ;
}
