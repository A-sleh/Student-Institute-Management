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
import useStudentBillsDetails from "../../../hooks/useStudentBillsDetails"
import useStudentInfo from "../../../hooks/useStudentInfo"

export default function StudentBillDetails() {

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
    ])

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

            if(radioState.billNo && !`${billNo}`?.toLowerCase().includes(searchFiled.toLocaleLowerCase())) {
                return false
            }
            if(radioState.note && !`${note}`?.toLowerCase().includes(searchFiled.toLocaleLowerCase())) {
                return false 
            }
            if(radioState.date && !`${date}`?.toLowerCase().includes(searchFiled.toLocaleLowerCase())) {
                return false
            }
            return true
        })
    }

    const studentBillsFilterd = FillterBills()

    const StudentStatistics = [
        {
            title: "Name",
            value: studentDetails?.name +' ' +studentDetails?.lastName ,
            icon: "fa-solid fa-user-group"
        }, 
        {
            title: "Class",
            value: studentDetails?.class?.title,
            icon: "bi bi-building-fill-exclamation",
        },
        {
            title: "Grade",
            value: studentDetails?.class?.grade,
            icon: "fa-solid fa-graduation-cap",
        },
        {
            title: "Gender",
            value: studentDetails?.class?.gender ,
            icon: "bi bi-person-fill-exclamation",
        }
    ]

    return (
        <>
            <Notification  title={'Delete bill'} type={'success'} state ={successDeleteBill} setState={setSuccessDeleteBill}/>
            {
                deleteModal && 
                <DeleteModal element={selectedBillToDelete.billNo} id={selectedBillToDelete} type={"Bill"} setDeleteModal={setdeleteModal} setSuccessDelete={setSuccessDeleteBill} />
            }
            <HeaderInformation data={StudentStatistics} title={'Student Details'}/>
            <Table column={ManagePage ? manageBillsColumn : BILLSCOLUMNS} data={studentBillsFilterd} showMainHeader={false} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}} >
                <FillterBillsHeader radioState={radioState} setRadioState={setRadioState} searchFiled={searchFiled} setSearchFiled={setSearchFiled} />
                <h3 style={{marginBottom: '10px'}}>Student Bills</h3>
            </Table>
            <GoBackBtnStyle onClick={()=>{gotoPreviousPage(-1)}}>Back</GoBackBtnStyle>
        </>
    )
}

