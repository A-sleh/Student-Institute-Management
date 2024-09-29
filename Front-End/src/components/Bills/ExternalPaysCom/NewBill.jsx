
import { useEffect, useRef, useState } from 'react'
import '../StudentsPaysCom/studnetPays.css'
import DataServices from '../../../Data/dynamic/DataServices';
import Notification from '../../Global/Notification';


export default function NewBillExternal() {

    const initialFormInput = { 
        teacher: null ,
        student : null ,
        amount: '' ,
        date: '' ,
        note: '',
        fullName : '',
        type: 'out',
        billNo: ''
    }

    const [successAddBill,setSuccessAddBill] = useState(false)
    const [errorAddBill,setErrorAddBill] = useState(false)
    const [validationBillInput,setValidationBillInput] = useState({
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
        const {billNo,date,amount} = formInput ;


        setValidationBillInput({
            date: date == '' ,
            billNo: billNo == '',
            amount: amount <= 0 
        })

        return (date == '' || billNo == ''|| amount <= 0 )
    }


    function handleSubmitClicked(event) {
        event.preventDefault() ;

        const validInput = validInputs()
        if(!validInput) {
            DataServices.CreateNewTeacherBill(formInput).then( response => {
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
                        <div className="input" style={{width: '100%'}}>
                            <label >Bill Number</label>
                            <input type="text" value={formInput.billNo} className={ validationBillInput.billNo ? 'error': ''} onChange={(e) => setFormInput({...formInput,billNo: e.target.value})}/>
                            { validationBillInput.billNo && <span style={{marginTop: '4px' , fontSize: '11px' , color: 'red' , transition: '.3s'}}>Please enter the bill number</span> }
                        </div>
                        <div className="input" style={{width: '100%'}}>
                            <label >Date</label>
                            <input type="date" value={formInput.date} className={ validationBillInput.date ? 'error': ''} onChange={(e) => setFormInput({...formInput,date: e.target.value})}/>
                            { validationBillInput.studentId && <span style={{marginTop: '4px' , fontSize: '11px' , color: 'red' , transition: '.3s'}}>You must chose the bill date</span> }
                        </div>
                    </div>

                    <div className="row">
                        <div className="input" style={{width: '100%'}}>
                            <label >Amount</label>
                            <input type="number" value={formInput.amount} className={ validationBillInput.amount ? 'error': ''} onChange={(e) => setFormInput({...formInput,amount: e.target.value})}/>
                            { validationBillInput.amount && <span style={{marginTop: '4px' , fontSize: '11px' , color: 'red' , transition: '.3s'}}>the amount must be poistive ,And it requierd!!</span> }
                        </div>
                        <div className="input" style={{width: '100%'}}>
                            <label >Type</label>
                            <div style={{display:'flex' , alignItems:'center'}}>
                                <input type="radio"  id="out" checked={formInput.type == 'out'}onChange={()=>{setFormInput({...formInput,type: 'out'})}} style={{boxShadow: 'none', cursor:'pointer'}}/>
                                <label htmlFor="out" style={{ marginLeft: '5px', cursor:'pointer'}}>Out come bill</label>
                                <input type="radio"  id="in" checked={formInput.type == 'in'} onChange={()=>{setFormInput({...formInput,type: 'in'})}} style={{boxShadow: 'none' , marginLeft: '30px', cursor:'pointer'}}/>
                                <label htmlFor="in" style={{ marginLeft: '5px', cursor:'pointer'}}>In come bill</label>
                            </div>
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

