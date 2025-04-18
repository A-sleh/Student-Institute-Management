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
import { useSelector } from 'react-redux';
import { NewBillExternalTEXT } from '../../../Data/static/Bills/ExternalPaysCom/NewBillExternalTEXT';

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

    const {currentLange} = useSelector( state => state.language)
    const { billType, inComeBill ,outComeBill,billNumber ,billDate ,billAmount ,billNote ,addBtn,validationMessages ,successAddStudentBillMES ,errorAddStudentBillMES } = NewBillExternalTEXT[currentLange]
    const {bilNumberVal ,billDateVal ,billAmountVal} = validationMessages
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
            <Notification  title={successAddStudentBillMES} type={'success'} state ={successAddBill} setState={setSuccessAddBill}/>
            <Notification  title={errorAddStudentBillMES} type={'error'} state ={errorAddBill} setState={setErrorAddBill}/>
            <FormMainContainer >
                <FormStyle onSubmit={(e)=> handleSubmitClicked(e)}>
                    <FormRowStyle >
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'}  >{billNumber}</LabelStyle>
                            <InputStyle type="text" value={formInput.billNo} className={ validationBillInput.billNo ? 'error': ''} onChange={(e) => setFormInput({...formInput,billNo: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.billNo} message={bilNumberVal}/>
                        </FormSubRowStyle>
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'}  >{billDate}</LabelStyle>
                            <InputStyle type="date" value={formInput.date} className={ validationBillInput.date ? 'error': ''} onChange={(e) => setFormInput({...formInput,date: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.date} message={billDateVal}/>
                        </FormSubRowStyle>
                    </FormRowStyle>

                    <FormRowStyle >
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'}  >{billAmount}</LabelStyle>
                            <InputStyle type="number" value={formInput.amount} className={ validationBillInput.amount ? 'error': ''} onChange={(e) => setFormInput({...formInput,amount: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.amount} message={billAmountVal}/>
                        </FormSubRowStyle>

                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'} >{billType}</LabelStyle>
                            <FormRadioContainerStyle >
                                <input type="radio"  id="out" checked={formInput.type == 'out'} onChange={()=>{setFormInput({...formInput,type: 'out'})}} />
                                <LabelStyle color={'#056699'} htmlFor="out" style={{marginBottom: '0'}}>{outComeBill}</LabelStyle>
                                <input type="radio"  id="in" checked={formInput.type == 'in'} onChange={()=>{setFormInput({...formInput,type: 'in'})}} />
                                <LabelStyle color={'#056699'} htmlFor="in" style={{marginBottom: '0'}}>{inComeBill}</LabelStyle>
                            </FormRadioContainerStyle>
                        </FormSubRowStyle>


                    </FormRowStyle>

                    <div >
                        <LabelStyle color={'#056699'}  htmlFor="">{billNote}</LabelStyle>
                        <TextAreaInputStyle value={formInput.note} onChange={(e) => setFormInput({...formInput,note: e.target.value})}></TextAreaInputStyle>
                    </div>

                    <SubmitBtnStyle >{addBtn}</SubmitBtnStyle>
                </FormStyle>
            </FormMainContainer>
        </>
    )
}

