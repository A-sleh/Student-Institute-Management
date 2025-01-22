/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { TEACHERCLASSCOLUMNS } from "../columns/TeacherClassColumn.js";
import { useMemo, useState } from "react";
import DeleteModal from "../../Modal/DeleteModal.jsx";
import useTeacherClassDetails from "../../../hooks/teacher_hooks/useTeacherClassDetails.jsx";
import Table from "../../shared/Table.jsx";
import { useSelector } from "react-redux";
import { TeacherNewSubjectTEXT } from "../../../Data/static/teachers/ManageTeacher/TeacherNewSubjectTEXT.js";

export default function TeacherClassesTable({teacherId,setSuccessDeleteFromClass,successDeleteFromClass}) {

  const {currentLange} = useSelector( state => state.language)
  const {isAdmin} = useSelector( state => state.admin)
  const {noClassesWOR} = TeacherNewSubjectTEXT[currentLange]
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
          Header : {
            english: 'Setting' ,
            arabic: 'إعدادات'
          },
          id : 'selection' ,
          Cell : ({row}) => {
            if(!isAdmin) return '...'
            return ( 
                <i className="bi bi-trash" onClick={()=>{handleDeleteClicked(row.original)}} style={{ color: "gray", cursor: "pointer" ,fontSize: '16px' ,color: 'red' }}></i>
            )
          }
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
          classes.length == 0  ? <span style={{ color: "red", fontWeight: "400", fontSize: "16px", }} > {noClassesWOR}</span> :
          <Table data={classes || []} column={columns} showMainHeader={false} styleObj = {{padding: '6px' , fontSize : '15px' , sameColor : false}} unableId={true}/>
        }
      </>
    )
}






