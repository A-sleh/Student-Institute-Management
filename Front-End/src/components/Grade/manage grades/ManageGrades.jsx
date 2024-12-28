import { useEffect, useMemo, useRef, useState } from "react";
import { successActionLogic } from "../../shared/logic/logic";
import { SmallButtonStyle } from "../../shared/style/styleTag";
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade";
import Table from "../../shared/Table";
import DeleteModal from "../../Modal/DeleteModal";
import DataServices from "../../../Data/dynamic/DataServices";
import Notification from "../../Global/Notification";

export default function ManageGrades() {

    
    const initailGradeState = {gradeId : -1 , grade : ''}
    const [upDateGrade,setUpDateGrade] = useState(initailGradeState)
    const [unSuccessDelete,setUnSuccessDelete] = useState(false)
    const [successDelete,setSuccessDelete] = useState(false)
    const [successUpdate,setSuccessUpdate] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [selectedGrade,setSelectedGrade] = useState({})
    const [grades] = useGetAllGrade(successDelete,successUpdate)
    const [_,setReRender] = useState(0)
    const gradeRef = useRef(null)

    // to keep focus on the input field
    useEffect(()=>{setReRender(1)},[upDateGrade])

    const column = useMemo(() => [
        {
            Header: 'Grade' ,
            accessor: 'grade',
            Cell : ({row}) => {
                return upDateGrade.gradeId != row.original.gradeId ? row.original.grade : <input type='text'  min='1'  ref={gradeRef} value={upDateGrade.grade} onChange={(e) => setUpDateGrade({...upDateGrade,grade : e.target.value})} style={{padding: '0 4px' ,backgroundColor: 'transparent',width: '3em', fontSize: '15px' , outline: 'none' , border: 'none' , textAlign: 'center' ,borderBottom: '1px solid #066599' , borderRadius: '2px' }}/>
            }
        },
        {
            Header: 'Actions' ,
            Cell : ({row}) => <div>
                <SmallButtonStyle color={'#009744'} onClick={() =>{
                    upDateGrade.gradeId == row.original.gradeId ? handleUpdateClicked() : setUpDateGrade(row.original)  
                }} >{upDateGrade.gradeId == row.original.gradeId ? 'Apply' : 'Update grade'}</SmallButtonStyle>
                { row.original.gradeId == upDateGrade.gradeId ? <SmallButtonStyle color={'red'} onClick={()=>{setUpDateGrade(initailGradeState)}} >Cancel</SmallButtonStyle> : '' }
                {  
                    upDateGrade.gradeId != row.original.gradeId ? 
                    <SmallButtonStyle color={'red'} onClick={()=>{handleDeleteGradeClicked(row.original)}} >Delete</SmallButtonStyle> : ''
                }
            </div>
        }
    ],[upDateGrade])


    function handleDeleteGradeClicked(grade) {
        setSelectedGrade(grade)
        setDeleteModal(true)
    }

    function handleUpdateClicked() {
        DataServices.UpdateGrade(upDateGrade).then( _ => {
            successActionLogic(setSuccessUpdate)
        })
        setUpDateGrade(initailGradeState)
    }

    gradeRef.current?.focus()

    return (
        <>
            {
                deleteModal &&
                <DeleteModal element={selectedGrade?.grade} type={"Grade"} id={selectedGrade?.gradeId} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDelete} setUnSuccessDelete={setUnSuccessDelete} />
            }
            <Notification title={"update grade"} type={"success"} state={successUpdate} setState={setSuccessUpdate} />
            <Notification title={"delete grade"} type={"success"} state={successDelete} setState={setSuccessDelete} />
            <Notification title={"grade must not be liked with any things"} type={"error"} state={unSuccessDelete} setState={setUnSuccessDelete} />
            <Table data={grades} column={column} showMainHeader={false} unableId={true} styleObj={{padding: '8px' , fontSize: '14px'}} />
        </>
    )
}