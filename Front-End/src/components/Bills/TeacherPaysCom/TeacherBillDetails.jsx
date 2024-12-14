/***  
  CSS-OPTIMAIZATION : DONE , 
  COMPONENTS OPTIMIZATION : DONE ,
  USING REACT QURY : 
  
*/

import { useMemo, useState } from "react"
import { FillterBillsHeader } from "../../shared/FillterBillsHeader"
import { GoBackBtnStyle } from "../../shared/style/styleTag"
import { BILLSCOLUMNS } from "../../Teachers/columns/BillsColumn"
import { useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom"
import addSpaceBetweenDigit from "../../Global/globalStyle"
import DeleteModal from "../../Modal/DeleteModal"
import Notification from "../../Global/Notification"
import HeaderInformation from "../../shared/HeaderInformation"
import Table from "../../shared/Table"
import useGetTeacherBills from "../../../hooks/useGetTeacherBills"
import useTeacherInfo from "../../../hooks/useTeacherInfo"

export default function TeacherBillDetails() {

    const teacherId = useParams().id
    const BillsDecode = JSON.parse(decodeURIComponent( useLocation().state ))
    const {specialState , name , lastName } = BillsDecode
    const ManagePage = specialState == 'manage'
    const gotoPreviousPage = useNavigate();
    // search states
    const [searchFiled,setSearchFiled] = useState('');
    const [radioState,setRadioState] = useState({
        billNo: true , 
        date: false ,
        note : false
    })
    const [selectedBillToDelete,setSelectedBillToDelete] = useState({
        billId :'' ,
        billNo : '' 
    })
    // Notification state
    const [deleteModal,setdeleteModal] = useState(false)
    const [successDeleteBill,setSuccessDeleteBill] = useState(false)
    // data states
    const [teacherBills] = useGetTeacherBills(teacherId,successDeleteBill)
    const [teacherDetails] = useTeacherInfo(teacherId,successDeleteBill) 

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
        return teacherBills.filter( bill => {
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

    const TeacherBillsFilterd = FillterBills()

    const TeacherStatistics = [
        {
            title: "Name",
            value: name + ' ' + lastName ,
            icon: "fa-solid fa-user-group"
        }, 
        {
            title: "Total salary",
            value: addSpaceBetweenDigit(teacherDetails?.totalSalary?.total),
            icon: "fa-solid fa-graduation-cap",
        },
        {
            title: "Subjects Number",
            value: teacherDetails?.teacherSubjects?.length,
            icon: "fa-solid fa-graduation-cap",
        },
        {
            title: "Classes Number",
            value: teacherDetails?.teacherClasses ,
            icon: "bi bi-building-fill-exclamation",
        }
    ]

    return (
        <>
            <Notification  title={'Delete bill'} type={'success'} state ={successDeleteBill} setState={setSuccessDeleteBill}/>
            {
                deleteModal && 
                <DeleteModal element={selectedBillToDelete.billNo} id={selectedBillToDelete} type={"Bill"} setDeleteModal={setdeleteModal} setSuccessDelete={setSuccessDeleteBill} />
            }
            <HeaderInformation data={TeacherStatistics} title={'Teacher Details'}/>
            <Table column={ManagePage ? manageBillsColumn : BILLSCOLUMNS} data={TeacherBillsFilterd} showMainHeader={false} styleObj={{padding: '6px' , fontSize : '15px' , sameColor : false}} >
                <FillterBillsHeader radioState={radioState} setRadioState={setRadioState} searchFiled={searchFiled} setSearchFiled={setSearchFiled} />
                <h3 style={{marginBottom: '10px'}}>Teacher bills</h3>
            </Table>
            <GoBackBtnStyle onClick={()=>{gotoPreviousPage(-1)}}>Back</GoBackBtnStyle>
        </>
    )
}