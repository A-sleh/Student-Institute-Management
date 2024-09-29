
import { useEffect, useRef, useState } from 'react'
import './studnetPays.css'
import DataServices from '../../../Data/dynamic/DataServices';
import Notification from '../../Global/Notification';


export default function NewBill() {

    const initialFormInput = { 
        teacher: null,
        student : {
            studentId: '' ,
            name: '',
            lastName: '' ,
        },
amount: '' ,
        date: '' ,
        note: '',
        fullName : '',
        type: 'in',
        billNo: ''
    }

    const [successAddBill,setSuccessAddBill] = useState(false)
    const [errorAddBill,setErrorAddBill] = useState(false)
    const [validationBillInput,setValidationBillInput] = useState({
        studentId: '' ,
        date: '' ,
        billNo: '',
amount: '' 
    })
    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => {
        setTimeout(() => {
            setFocused(false)
        },200)
    }
    const [formInput,setFormInput] = useState(initialFormInput)
    

    function validInputs() {
        const {billNo,date,amount,student} = formInput ;
        const { studentId } = student

        setValidationBillInput({
            studentId: studentId == '' ,
            date: date == '' ,
            billNo: billNo == '',
            amount: amount <= 0 
        })

        return ( studentId == '' || date == '' || billNo == ''|| amount <= 0 )
    }


    function handleSubmitClicked(event) {
        event.preventDefault() ;

        const validInput = validInputs()
        if(!validInput) {
            DataServices.CreateNewStudnetBill(formInput).then( response => {
                if(response.status <= 299 ) {
                    setFormInput(initialFormInput) ;
                    setSuccessAddBill(true) 
                    setTimeout(() => {
                        setSuccessAddBill(false)
                    } ,2000 )
                }else {
                    setErrorAddBill(true) 
                    setTimeout(() => {
                        setErrorAddBill(false)
                    } ,2000 )
                }
            })
        }

    }

    
    return (
        <>
            <Notification  title={'Add student bill'} type={'success'} state ={successAddBill} setState={setSuccessAddBill}/>
            <Notification  title={'Bill number is exist already ,Please change it'} type={'error'} state ={errorAddBill} setState={setErrorAddBill}/>
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , borderRadius: '5px', marginTop: '10px'}}>
                <form className='student-pays-form' onSubmit={(e)=> handleSubmitClicked(e)}>
                    <div className="row" >
                        <div className="input" style={{position: 'relative' , width: '100%'}}>
                            <label >Student Name</label>
                            <input type="text"   onFocus={onFocus}  onBlur={onBlur}  className={validationBillInput.studentId ? 'search-students error' :'search-students' } value={formInput.fullName} onChange={(e)=>{setFormInput({...formInput,fullName: e.target.value})}}/>
                            { validationBillInput.studentId && <span style={{marginTop: '4px' , fontSize: '11px' , color: 'red' , transition: '.3s'}}>You must select a student </span> }
                            <ShowStudnetsAvilable searchFiled={formInput.fullName} setFormInput={setFormInput} formInput={formInput} focused={focused} setFocused={setFocused} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input" >
                            <label >Bill Number</label>
                            <input type="text" value={formInput.billNo} className={ validationBillInput.billNo ? 'error': ''} onChange={(e) => setFormInput({...formInput,billNo: e.target.value})}/>
                            { validationBillInput.billNo && <span style={{marginTop: '4px' , fontSize: '11px' , color: 'red' , transition: '.3s'}}>Please enter the bill number</span> }
                        </div>
                        <div className="input">
                            <label >Date</label>
                            <input type="date" value={formInput.date} className={ validationBillInput.date ? 'error': ''} onChange={(e) => setFormInput({...formInput,date: e.target.value})}/>
                            { validationBillInput.studentId && <span style={{marginTop: '4px' , fontSize: '11px' , color: 'red' , transition: '.3s'}}>You must chose the bill date</span> }
                        </div>
                        <div className="input">
                            <label >Amount</label>
                            <input type="number" value={formInput.amount} className={ validationBillInput.amount ? 'error': ''} onChange={(e) => setFormInput({...formInput,amount: e.target.value})}/>
                            { validationBillInput.amount && <span style={{marginTop: '4px' , fontSize: '11px' , color: 'red' , transition: '.3s'}}>the amount must be poistive ,And it requierd!!</span> }
                        </div>
                    </div>
                    <div className="row text-area">
                        <label htmlFor="">Note</label>
                        <textarea value={formInput.note} onChange={(e) => setFormInput({...formInput,note: e.target.value})}></textarea>
                    </div>
                    <input type="submit" value="Add" style={{width: 'fit-content' , margin: '5px 0'}}/>
                </form>
            </div>
        </>
    )
}


function ShowStudnetsAvilable({searchFiled,setFormInput,formInput,focused, setFocused}) {
    const [studentDetails,setStudentDetails] = useState([]) ;
    useEffect(() => {
        DataServices.StudentsInformaion().then( studentsDetails => {
            const studentMaping = studentsDetails.map( student => {
                return {
                    id : student.studentId ,
                    name: student.name ,
                    lastName: student.lastName,
                    fullName : student.name + ' ' + student.lastName
                }
            })

            setStudentDetails(studentMaping)
        })
    } ,[])


    function handleSelectStudentClicked(student) {
        setFormInput({...formInput , student : {
            studentId: student.id ,
            name: student.name,
            lastName: student.lastName ,
        }, fullName : student.fullName })
        setFocused(false)
    }

    return ( 
        <div style={{padding: '10px 5px' , backgroundColor: 'white', marginTop: '2px' , borderRadius: '2px' , transform: focused ? 'translateY(0px) scaleY(1)': 'translateY(30px) scaleY(0)'}} className='student-container'>
            {
                studentDetails.map( (student,index) => {
                    let {fullName} = student
                    if( fullName.toLowerCase().includes(searchFiled.toLowerCase()) ) {
                        return <div className='student-name-option' onClick={()=>{handleSelectStudentClicked(student)}} key={index}>{fullName}</div> 
                    }
                })
            }
        </div>
    )

}