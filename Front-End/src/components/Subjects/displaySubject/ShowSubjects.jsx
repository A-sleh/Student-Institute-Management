import { SUBJECTCOLUMNS } from "../column/SubjectColumn"
import { useMemo, useState } from "react"
import Table from "../../shared/Table"
import useGetSubjects from "../../../hooks/useGetSubjects"
import SubHeaderFilterClassByGrade from "../../shared/subHeaderTable/SubHeaderFilterClassByGrade"
import { SubmitBtnStyle } from "../../shared/style/styleTag"
import Notification from "../../Global/Notification"
import DeleteModal from "../../Modal/DeleteModal"

export default function ShowSubjects() {

    const [filterByGrade,setFilterByGrade] = useState('bachelor')
    const [successDeleteSubject,setSuccessDeleteSubject] = useState(false)
    const [unSuccessDeleteSubject,setUnSuccessDeleteSubject] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [manageButton,setManageButton] = useState(true)
    const [selectedSubject,setSelectedSubject] = useState({})
    const [subjects] = useGetSubjects(filterByGrade)

    const manageColumn = useMemo(() => [
        ...SUBJECTCOLUMNS ,
        ,
        {
            Header: 'Action' ,
            Cell: ({row}) => {
                return <i className="bi bi-trash" onClick={()=>{handleDeleteClicked(row.original)}} style={{ cursor: "pointer" ,fontSize: '16px',color: 'red' }}></i>
            }
        }
    ], [])

    function handleDeleteClicked(subject) {
        setSelectedSubject(subject)
        setDeleteModal(true);
    }

    return(
        <>
            {
                deleteModal &&
                <DeleteModal element={selectedSubject?.subject} type={"Subject"} id={selectedSubject?.subjectId} setDeleteModal={setDeleteModal} setSuccessDelete={setSuccessDeleteSubject} setUnSuccessDelete={setUnSuccessDeleteSubject}/>
            }
            <Notification title={"the subject has just deleted successful"} type={"success"} state={unSuccessDeleteSubject} setState={setSuccessDeleteSubject} />
            <Notification title={"The subject has not tought from one of theacher"} type={"error"} state={successDeleteSubject} setState={setUnSuccessDeleteSubject} />
            <Table data={subjects} column={manageButton ? SUBJECTCOLUMNS : manageColumn} unableId={true} styleObj={{padding: '8px' , fontSize: '14px'}} showMainHeader={false}>
                <SubHeaderFilterClassByGrade setSelectedGrade={setFilterByGrade} />
                <SubmitBtnStyle style={{float: 'right'}} onClick={() => setManageButton(last => !last)}>Setting</SubmitBtnStyle>
            </Table>
        </>

    )
}