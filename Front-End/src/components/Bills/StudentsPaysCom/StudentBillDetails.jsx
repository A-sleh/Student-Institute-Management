/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 

*/
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useMemo, useState } from "react"
import { BILLSCOLUMNS } from "../../Teachers/columns/BillsColumn"
import { GoBackBtnStyle } from "../../shared/style/styleTag"
import { FillterBillsHeader } from "../../shared/FillterBillsHeader"
import DeleteModal from "../../Modal/DeleteModal"
import Notification from "../../Global/Notification"
import Table from "../../shared/Table"
import HeaderInformation from "../../shared/HeaderInformation"
import useStudentBillsDetails from "../../../hooks/student_hooks/useStudentBillsDetails"
import useStudentInfo from "../../../hooks/student_hooks/useStudentInfo"
import { ManageStudentBillsTEXT } from "../../../Data/static/Bills/StudentsPaysCom/ManageStudentBillsTEXT"
import { useSelector } from "react-redux"

export default function StudentBillDetails() {

    const {currentLange} = useSelector( state => state.language)
    const {studentInfoTitle ,studentBillsTitle ,backBtn ,successDeleteBillMES} = ManageStudentBillsTEXT[currentLange]

    const studentId = useParams().id
    const BillsDecode = JSON.parse(decodeURIComponent( useLocation().state ))
    const ManagePage = BillsDecode.specialState == 'manage'
    const gotoPreviousPage = useNavigate();
    // Search States
    const [searchFiled,setSearchFiled] = useState('');
    const [selectedBillToDelete,setSelectedBillToDelete] = useState({
        billId :'' ,
        billNo : '' 
    })
    const [radioState,setRadioState] = useState({
        billNo: true , 
        date: false ,
        note : false
    })
    // Notification states
    const [deleteModal,setdeleteModal] = useState(false)
    const [successDeleteBill,setSuccessDeleteBill] = useState(false)
    // Data states
    const [studentDetails] = useStudentInfo(studentId) 
    const [studentBills] = useStudentBillsDetails(studentId,successDeleteBill)

    const manageBillsColumn = useMemo(() => [
        ...BILLSCOLUMNS,
        {
            Header: 'Action' ,
            Cell: ({row}) => {
                return <i className="bi bi-trash" style={{color: 'red',cursor: 'pointer'}}onClick={()=>handleDeleteClicked(row.original)}></i>                
            }
        }
    ],[currentLange])

    function handleDeleteClicked(bill) {
        const {billNo,billId} = bill
        setdeleteModal(true)
        setSelectedBillToDelete({
            billId : billId ,
            billNo : billNo 
        })
    }

    function FillterBills() {
        return studentBills.filter( bill => {
            const {billNo,date,note} = bill

            if(radioState.billNo && !`${billNo}`?.toLowerCase().includes(searchFiled.toLowerCase())) {
                return false
            }
            if(radioState.note && !`${note}`?.toLowerCase().includes(searchFiled.toLowerCase())) {
                return false 
            }
            if(radioState.date && !`${date}`?.toLowerCase().includes(searchFiled.toLowerCase())) {
                return false
            }
            return true
        })
    }

    const studentBillsFilterd = FillterBills()

    const StudentStatistics = [
        {
            title: {
                arabic: 'الأسم' ,
                english: "Name"
            } ,
            value: studentDetails?.name +' ' +studentDetails?.lastName ,
            icon: "fa-solid fa-user-group"
        }, 
        {
            title: {
                arabic: 'الشعبه' ,
                english: "Class"
            } ,
            value: studentDetails?.class?.title,
            icon: "bi bi-building-fill-exclamation",
        },
        {
            title: {
                arabic: 'الفئه' ,
                english: "Grade"
            } ,
            value: studentDetails?.class?.grade,
            icon: "fa-solid fa-graduation-cap",
        },
        {
            title: {
                arabic: 'الجنس' ,
                english: "Gender"
            } ,
            value: studentDetails?.class?.gender ,
            icon: "bi bi-person-fill-exclamation",
        }
    ]

    return (
        <>
            <Notification  title={successDeleteBillMES} type={'success'} state ={successDeleteBill} setState={setSuccessDeleteBill}/>
            {
                deleteModal && 
                <DeleteModal element={selectedBillToDelete.billNo} id={selectedBillToDelete} type={"Bill"} setDeleteModal={setdeleteModal} setSuccessDelete={setSuccessDeleteBill} />
            }
            <HeaderInformation data={StudentStatistics} title={studentInfoTitle}/>
            <Table column={ManagePage ? manageBillsColumn : BILLSCOLUMNS} data={studentBillsFilterd} showMainHeader={false} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}} >
                <FillterBillsHeader radioState={radioState} setRadioState={setRadioState} searchFiled={searchFiled} setSearchFiled={setSearchFiled} />
                <h3 style={{marginBottom: '10px'}}>{studentBillsTitle}</h3>
            </Table>
            <GoBackBtnStyle onClick={()=>{gotoPreviousPage(-1)}}>{backBtn}</GoBackBtnStyle>
        </>
    )
}

