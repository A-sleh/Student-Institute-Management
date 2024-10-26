import { useEffect, useState } from "react"
import DataServices from "../../../Data/dynamic/DataServices"
import addSpaceBetweenDigit from "../../Global/globalStyle"

export default function StudentInfoCard({studentId}) {

    const [studentInfo,setStudentInfo] = useState({
        billRequired : '' ,
        missedDays : '' ,
        phone : '' ,
        class : '' ,
        fatherName : '' ,
        lastName : '' ,
        name: ''
    }) 
    const [studentBillsBalance,setStudentBillsBalance] = useState({required: 0 , paid : 0})
    useEffect(() => {
        DataServices.StudentsInformaion(studentId).then( studentInfo => {
            setStudentInfo(studentInfo)
        })
        DataServices.ShowStudentBillBalanc(studentId).then( bill => {
            setStudentBillsBalance(bill)
        })
    } ,[])
    
    return (
        <div style={{width: '40%' , display: 'flex' , flexDirection: 'column' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Student Information</span>
            <div style={{ padding: '15px 8px' , borderRadius: ' 0 0 5px 5px' , background: '#f3f1f1d7' , flex: '1' }}>
                <div className="row" style={{display: 'flex' , alignItems: 'center' ,gap: '1.3em' , backgroundColor: 'white' , padding: '4px 8px'}}>
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Name :   <span style={{fontSize: '0.8em' , color: 'black' , marginLeft: '1px'}}>{studentInfo?.name} {studentInfo?.lastName}</span></h4>
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Father Name :   <span style={{fontSize: '0.8em' , color: 'black' , marginLeft: '1px'}}>{studentInfo?.fatherName}</span></h4>
                    
                </div>
                <div className="row" style={{display: 'flex' , alignItems: 'center' ,gap: '2em' , backgroundColor: 'white' , padding: '4px 8px'}}   >
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Phone Number :  <span style={{fontSize: '13px' , color: 'black', marginLeft: '4px'}}>{studentInfo?.phone}</span></h4>
                </div>
                <div className="row" style={{display: 'flex' , alignItems: 'center' ,gap: '2em' , backgroundColor: 'white' , padding: '4px 8px'}}   >
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Missed Days :<span style={{fontSize: '13px' , color: 'black', marginLeft: '4px'}}>{studentInfo?.missedDays}</span></h4>
                </div>
                <div className="row" style={{display: 'flex' , alignItems: 'center' ,gap: '2em' , backgroundColor: 'white' , padding: '4px 8px'}}   >
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Bill Required :<span style={{fontSize: '13px' , color: 'black', marginLeft: '4px'}}>{addSpaceBetweenDigit(studentInfo?.billRequired)}</span></h4>
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Paid :<span style={{fontSize: '13px' , color: 'black', marginLeft: '4px'}}>{addSpaceBetweenDigit(studentBillsBalance?.paid || 0)}</span></h4>
                    
                </div>
                <div className="row" style={{display: 'flex' , alignItems: 'center' ,gap: '2em' , backgroundColor: 'white' , padding: '4px 8px'}}   >
                    <h4 style={{color: '#066599' , fontSize: '1em'}}>Remaining :<span style={{fontSize: '13px' , color: 'black', marginLeft: '4px'}}>{addSpaceBetweenDigit(studentBillsBalance?.required || 0)}</span></h4>
                </div> 
            </div>    
        </div>
    )
}