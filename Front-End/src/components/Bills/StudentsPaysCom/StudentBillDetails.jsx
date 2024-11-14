import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom"
import DataServices from "../../../Data/dynamic/DataServices"
import ShowClassDetails from "../../Classes/ShowClassDetails"
import './studnetPays.css'
import { format } from "date-fns"
import addSpaceBetweenDigit from "../../Global/globalStyle"
import DeleteModal from "../../Modal/DeleteModal"
import Notification from "../../Global/Notification"

export default function StudentBillDetails() {

    const studentId = useParams().id
    const type = useLocation().state
    const gotoPreviousPage = useNavigate();
    const [searchFiled,setSearchFiled] = useState('');
    const [radioState,setRadioState] = useState({
        billNo: true , 
        date: false ,
        note : false
    })
    const [studentBills,setStudentBills] = useState([])
    const [studentDetails,setStudentDetails] = useState({}) 
    const [deleteModal,setdeleteModal] = useState(false)
    const [successDeleteBill,setSuccessDeleteBill] = useState(false)
    const [selectedBillToDelete,setSelectedBillToDelete] = useState({
        billId :'' ,
        billNo : '' 
    })

    useEffect(() => {
        DataServices.ShowStudentBillsDetails(studentId).then( Bills => {
            setStudentBills(Bills)
        })
        DataServices.StudentsInformaion(studentId).then( studentDetails => {
            setStudentDetails(studentDetails)
        })
    } ,[successDeleteBill])


    function handleDeleteClicked(bill) {
        const {billNo,billId} = bill
        setdeleteModal(true)
        setSelectedBillToDelete({
            billId : billId ,
            billNo : billNo 
        })
    }

    return (
        <>
            <Notification  title={'Delete bill'} type={'success'} state ={successDeleteBill} setState={setSuccessDeleteBill}/>
            {deleteModal && 
                <DeleteModal
                element={selectedBillToDelete.billNo}
                id={selectedBillToDelete}
                type={"Bill"}
                setDeleteModal={setdeleteModal}
                setSuccessDelete={setSuccessDeleteBill}
                />
            }
            <div>
                <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px' , padding: '10px' , margin: '10px 0'}}>
                    <h3 >Student Details</h3>
                    <div className="student-info-header"  >
                        <ShowClassDetails
                            title={"Name"}
                            value={studentDetails?.name +' ' +studentDetails?.lastName}
                            color={"#ffbc00"}
                            icon={"fa-solid fa-user-group"}
                        />
                        <ShowClassDetails
                            title={"Class"}
                            value={studentDetails?.class?.title}
                            color={"#229edb"}
                            icon={"bi bi-building-fill-exclamation"}
                        />
                        <ShowClassDetails
                            title={"Grade"}
                            value={studentDetails?.class?.grade}
                            color={"#60ff00"}
                            icon={"fa-solid fa-graduation-cap"}
                        />
                        <ShowClassDetails
                            title={"Gender"}
                            value={studentDetails?.class?.gender}
                            color={"#ff0000"}
                            icon={"bi bi-person-fill-exclamation"}
                        />
                    </div>
                </div>
                <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px' , padding: '10px' , margin: '10px 0'}}>
                    <h3 style={{marginBottom: '10px'}}>Student Bills</h3>
                    <SeacherInputHeader radioState={radioState} setRadioState={setRadioState} searchFiled={searchFiled} setSearchFiled={setSearchFiled}/>
                    <table>
                        <thead  style={{position: 'relative' , top: '-10px' }}>                    
                            <tr>
                                <th style={{...thStyle,border: 'none' , padding: '15px' }}>Bill Number </th>
                                <th style={{...thStyle,border: 'none' , padding: '15px' }}>Amount</th>
                                <th style={{...thStyle,border: 'none' , padding: '15px' }}>Date</th>
                                <th style={{...thStyle,border: 'none' , padding: '15px' }}>Note</th>
                                { type == 'manage' && <th style={{...thStyle,border: 'none' , padding: '15px' }}>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                studentBills.map( bill => {
                                    const {billNo,amount,date,note,billId} = bill

                                    if(radioState.billNo && !`${billNo}`.toLowerCase().includes(searchFiled.toLocaleLowerCase())) {
                                        return 
                                    }
                                    if(radioState.note && !`${note}`.toLowerCase().includes(searchFiled.toLocaleLowerCase())) {
                                        return 
                                    }
                                    if(radioState.date && !`${date}`.toLowerCase().includes(searchFiled.toLocaleLowerCase())) {
                                        return 
                                    }

                                    return (
                                        <tr >
                                            <td style={tBStyle}>{billNo}</td>
                                            <td style={tBStyle}>{addSpaceBetweenDigit(amount)}</td>
                                            <td style={tBStyle}>{format( new Date(date) ,'yyyy / MM / dd' )}</td>
                                            <td style={tBStyle}>{note}</td>
                                            {
                                                type == 'manage' &&
                                                <td style={{padding: '15px' , backgroundColor: 'white' , margin: '5px 0' , border: 'none' }}>
                                                    <i className="fa-regular fa-trash-can delete remove-student-btn" onClick={()=>handleDeleteClicked(bill)}></i>
                                                </td>
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <button onClick={()=>{gotoPreviousPage(-1)}}  style={{padding: '2px 20px' , border: 'none', fontSize: '14px' , fontWeight: '500' , borderRadius: '5px', outline: 'none' , color: 'white' , backgroundColor: 'red' , cursor: 'pointer'}}>Back</button>
            </div>
        </>
    )
}

export function SeacherInputHeader({radioState,setRadioState,searchFiled,setSearchFiled,children}) {

    function handleRadioClicked(value) {
        const current = value.innerHTML ;
        setRadioState({
            billNo: current == 'Bill Number' , 
            date: current == 'Date',
            note : current == 'Note'
        })
    }

    function handlePlaceHolder() {
        if(radioState.billNo) {
            return 'bill number ...'
        }else if(radioState.date) {
            return 'date ...'
        }else {
            return 'note ...'
        }
    }
    
    return (
        <div style={{marginBottom: '20px' , backgroundColor:'white' , padding: '10px'}}>
            <div style={{display: 'flex' ,justifyContent: 'space-between' , alignItems: 'center'}}>
                <h4>Seacher by</h4>
                {children}
            </div>
            <form >
                <div style={{display: 'flex' , gap: '10px' , alignItems: 'center' , fontWeight: '600' }}>
                    <label onClick={(e)=>{handleRadioClicked(e.target)}} value={'billNo'} style={{fontWeight : radioState.billNo ?  '600' : '300' , cursor: 'pointer' , fontSize: '14px'}}>Bill Number</label>
                    <label onClick={(e)=>{handleRadioClicked(e.target)}} value={'note'} style={{fontWeight : radioState.note ?  '600' : '300' , cursor: 'pointer' , fontSize: '14px'}}>Note</label>
                    <label onClick={(e)=>{handleRadioClicked(e.target)}} valuse={'date'} style={{fontWeight : radioState.date ?  '600' : '300' , cursor: 'pointer' , fontSize: '14px'}}>Date</label>
                </div>
                <input
                    type="search"
                    style={{
                        backgroundColor: "transparent",
                        fontWeight: "500",
                        color: "gray",
                        padding: '10px',
                        width:'100%',
                        backgroundColor: '#f3f1f1d7'
                    }}
                    placeholder={'Search ' + handlePlaceHolder() }
                    value={searchFiled || ''}
                    onChange={(e) => {setSearchFiled(e.target.value)}}
                />
            </form>

        </div>
    )
}