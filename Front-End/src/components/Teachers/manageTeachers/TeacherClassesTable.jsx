/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { TEACHERCLASSCOLUMNS } from "../columns/TeacherClassColumn.js";
import { useMemo, useState } from "react";
import DeleteModal from "../../Modal/DeleteModal.jsx";
import useTeacherClassDetails from "../../../hooks/useTeacherClassDetails.jsx";
import Table from "../../shared/Table.jsx";

export default function TeacherClassesTable({teacherId,setSuccessDeleteFromClass,successDeleteFromClass}) {

    const [classes] = useTeacherClassDetails(teacherId,successDeleteFromClass) ;
    const [deletModal,setDeleteModal] = useState(false)
    const [currentClass,setCurrentClass] = useState({
      id : {
        teacherSubjectId : '' ,
        classId : ''
      },
      title : ""
    })

    const columns = useMemo(() => [
        ...TEACHERCLASSCOLUMNS ,
        {
          Header : 'Actions' ,
          id : 'selection' ,
          Cell : ({row}) => {
          return ( 
              <i className="bi bi-trash" onClick={()=>{handleDeleteClicked(row.original)}} style={{ color: "gray", cursor: "pointer" ,fontSize: '16px' ,color: 'red' }}></i>
          )}
        }
    ],[])


    function handleDeleteClicked(details) {
      setDeleteModal(true)
      const obj = {
        id: {
          teacherSubjectId : details.teacherSubjectId ,
          classId : details.classId
        },
        title: details.title
      }
      setCurrentClass(obj)
    }

    return (
      <>
        {
          deletModal && 
          <DeleteModal element={currentClass.title} type={'TeacherFromClass'} id={currentClass.id} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteFromClass} />
        }
        {
          classes.length == 0  ? <span style={{ color: "red", fontWeight: "400", fontSize: "16px", }} > There are no classes yet ...</span> :
          <Table data={classes || []} column={columns} showMainHeader={false} styleObj = {{padding: '6px' , fontSize : '15px' , sameColor : false}} unableId={true}/>
        }
      </>
    )
}






