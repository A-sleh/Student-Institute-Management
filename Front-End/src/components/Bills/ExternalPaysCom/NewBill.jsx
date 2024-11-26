/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 

*/

import { FormMainContainer, FormRadioContainerStyle, FormRowStyle, FormStyle, FormSubRowStyle, InputStyle, LabelStyle, SubmitBtnStyle, TextAreaInputStyle } from '../../shared/style/styleTag';
import { useState } from 'react'
import DataServices from '../../../Data/dynamic/DataServices';
import Notification from '../../Global/Notification';
import ErrorMessage from '../../shared/ErrorMessage';
import { errorActionLogic, successActionLogic } from '../../shared/logic/logic';


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

export default function NewBillExternal() {

    const [successAddBill,setSuccessAddBill] = useState(false)
    const [errorAddBill,setErrorAddBill] = useState(false)
    const [validationBillInput,setValidationBillInput] = useState({
        date: '' ,
        billNo: '',
        amount: '' 
    })
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
                    successActionLogic(setSuccessAddBill)
                }else {
                    errorActionLogic(setErrorAddBill)
                }
            })
        }

    }

    
    return (
        <>
            <Notification  title={'Add student bill'} type={'success'} state ={successAddBill} setState={setSuccessAddBill}/>
            <Notification  title={'Bill number is exist already ,Please change it'} type={'error'} state ={errorAddBill} setState={setErrorAddBill}/>
            <FormMainContainer >
                <FormStyle onSubmit={(e)=> handleSubmitClicked(e)}>
                    <FormRowStyle >
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'}  >Bill Number</LabelStyle>
                            <InputStyle type="text" value={formInput.billNo} className={ validationBillInput.billNo ? 'error': ''} onChange={(e) => setFormInput({...formInput,billNo: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.billNo} message={"Please enter the bill number"}/>
                        </FormSubRowStyle>
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'}  >Date</LabelStyle>
                            <InputStyle type="date" value={formInput.date} className={ validationBillInput.date ? 'error': ''} onChange={(e) => setFormInput({...formInput,date: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.date} message={"You must chose the bill date"}/>
                        </FormSubRowStyle>
                    </FormRowStyle>

                    <FormRowStyle >
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'}  >Amount</LabelStyle>
                            <InputStyle type="number" value={formInput.amount} className={ validationBillInput.amount ? 'error': ''} onChange={(e) => setFormInput({...formInput,amount: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.amount} message={"the amount must be poistive ,And it requierd!!"}/>
                        </FormSubRowStyle>

                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'} >Type</LabelStyle>
                            <FormRadioContainerStyle >
                                <input type="radio"  id="out" checked={formInput.type == 'out'} onChange={()=>{setFormInput({...formInput,type: 'out'})}} />
                                <LabelStyle color={'#056699'} htmlFor="out" >Out come bill</LabelStyle>
                                <input type="radio"  id="in" checked={formInput.type == 'in'} onChange={()=>{setFormInput({...formInput,type: 'in'})}} />
                                <LabelStyle color={'#056699'} htmlFor="in" >In come bill</LabelStyle>
                            </FormRadioContainerStyle>
                        </FormSubRowStyle>


                    </FormRowStyle>

                    <div >
                        <LabelStyle color={'#056699'}  htmlFor="">Note</LabelStyle>
                        <TextAreaInputStyle value={formInput.note} onChange={(e) => setFormInput({...formInput,note: e.target.value})}></TextAreaInputStyle>
                    </div>

                    <SubmitBtnStyle >Add</SubmitBtnStyle>
                </FormStyle>
            </FormMainContainer>
        </>
    )
}

