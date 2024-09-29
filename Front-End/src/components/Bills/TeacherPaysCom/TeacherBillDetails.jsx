import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams, useLocation } from "react-router-dom"
import DataServices from "../../../Data/dynamic/DataServices"
import ShowClassDetails from "../../Classes/ShowClassDetails"
import '../StudentsPaysCom/studnetPays.css'
import { tBStyle, thStyle } from "../../Teachers/teacherInformation/TeacherSubjects"
import { format } from "date-fns"
import addSpaceBetweenDigit from "../../Global/globalStyle"
import DeleteModal from "../../Modal/DeleteModal"
import Notification from "../../Global/Notification"
import { SeacherInputHeader } from "../StudentsPaysCom/StudentBillDetails"

export default function TeacherBillDetails() {

    const teacherId = useParams().id
    const fullName = useLocation().state.fullName
    const type = useLocation().state.type
    const gotoPreviousPage = useNavigate();

    const [teacherBills,setTeacherBills] = useState([])
    const [teacherDetails,setTeacherDetails] = useState({}) 
    const [searchFiled,setSearchFiled] = useState('');
    const [radioState,setRadioState] = useState({
        billNo: true , 
        date: false ,
        note : false
    })
    const [deleteModal,setdeleteModal] = useState(false)
    const [successDeleteBill,setSuccessDeleteBill] = useState(false)
    const [selectedBillToDelete,setSelectedBillToDelete] = useState({
        billId :'' ,
        billNo : '' 
    })

    useEffect(() => {
        DataServices.ShowTeacherBillsDetails(teacherId).then( Bills => {
            setTeacherBills(Bills)
        })
            DataServices.ShowAllTeacherSubjects(teacherId).then( teacherSubject => {
                let subjectsNumber = teacherSubject?.length , classessNumber = 0 , totalSalary = 0;
                teacherSubject.forEach( teacherClass => {
                    classessNumber += teacherClass.classes.length
                    totalSalary += (teacherClass.salary * teacherClass.classes.length)
                })
                setTeacherDetails({
                    subjectsNumber,
                    classessNumber ,
                    totalSalary
                })
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
                    <h3 >Teacher Details</h3>
                    <div className="student-info-header"  >
                        <ShowClassDetails
                            title={"Name"}
                            value={fullName}
                            color={"#ffbc00"}
                            icon={"fa-solid fa-user-group"}
                        />
                        <ShowClassDetails
                            title={"Total salary"}
                            value={addSpaceBetweenDigit(teacherDetails.totalSalary)}
                            color={"#229edb"}
                            icon={"bi bi-cash-coin"}
                        /> 
                        <ShowClassDetails
                            title={"Subjects Number"}
                            value={teacherDetails?.subjectsNumber}
                            color={"#60ff00"}
                            icon={"fa-solid fa-graduation-cap"}
                        />
                        <ShowClassDetails
                            title={"Classes Number"}
                            value={teacherDetails?.classessNumber}
                            color={"#ff0000"}
                            icon={"bi bi-building-fill-exclamation"}
                        />
                    </div>
                </div>
                <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px' , padding: '10px' , margin: '10px 0'}}>
                    <h3 style={{marginBottom: '10px'}}>Teacher bills</h3>
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
                                teacherBills.map( bill => {
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