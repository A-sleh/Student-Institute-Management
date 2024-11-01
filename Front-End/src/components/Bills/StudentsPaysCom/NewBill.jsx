
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 

*/

import { FormMainContainer, FormRowStyle, FormStyle, FormSubRowStyle, InputStyle, LabelStyle, SubmitBtnStyle, TextAreaInputStyle } from '../../shared/style/styleTag';
import { useEffect, useState } from 'react'
import { errorActionLogic, successActionLogic } from '../../shared/logic/logic';
import DataServices from '../../../Data/dynamic/DataServices';
import Notification from '../../Global/Notification';
import ErrorMessage from '../../shared/ErrorMessage';
import SearchBodyList from '../../shared/SearchBodyList';

const initialFormInput = {
    teacher: null, student : { studentId: '' , name: '', lastName: '' , }, amount: '' , date: '' , note: '', fullName : '', type: 'in', billNo: ''
}

export default function NewBill() {

    const [successAddBill,setSuccessAddBill] = useState(false)
    const [errorAddBill,setErrorAddBill] = useState(false)
    const [formInput,setFormInput] = useState(initialFormInput)
    const [allStudnets,setAllStudnets] = useState([])
    const [validationBillInput,setValidationBillInput] = useState({
        studentId: '' ,
        date: '' ,
        billNo: '',
        amount: '' 
    })

    // search input field functionality 
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
            setAllStudnets(studentMaping)
        })
    },[])
    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => { setTimeout(() => { setFocused(false) },200) }

    function handleSelectedStudnet(student) {
        setFormInput({...formInput , student : {
            studentId: student.id ,
            name: student.name,
            lastName: student.lastName ,
        }, fullName : student.fullName })
        setFocused(false)
    }
        

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
                    setFormInput(initialFormInput) 
                    successActionLogic(setSuccessAddBill)
                }else 
                    errorActionLogic(setErrorAddBill)
                
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
                        <FormSubRowStyle width={'100%'} >
                            <LabelStyle color={'#056699'} >Student Name</LabelStyle>
                            <InputStyle type="text"  onFocus={onFocus}  onBlur={onBlur}  className={validationBillInput.studentId ? 'error' :'' } value={formInput.fullName} onChange={(e)=>{setFormInput({...formInput,fullName: e.target.value})}}/>
                            <ErrorMessage showMessage={validationBillInput.studentId} message={"You must select a student"}/>
                            <SearchBodyList searchValue={formInput.fullName} handleElementClicked={handleSelectedStudnet} data={allStudnets} focused={focused}/>
                        </FormSubRowStyle>
                    </FormRowStyle>
                    <FormRowStyle>
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'} >Bill Number</LabelStyle>
                            <InputStyle type="text" value={formInput.billNo} className={ validationBillInput.billNo ? 'error': ''} onChange={(e) => setFormInput({...formInput,billNo: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.billNo} message={"Please enter the bill number"}/>
                        </FormSubRowStyle>
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'} >Date</LabelStyle>
                            <InputStyle type="date" value={formInput.date} className={ validationBillInput.date ? 'error': ''} onChange={(e) => setFormInput({...formInput,date: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.date} message={"You must chose the bill date"}/>
                        </FormSubRowStyle>
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'} >Amount</LabelStyle>
                            <InputStyle type="number" value={formInput.amount} className={ validationBillInput.amount ? 'error': ''} onChange={(e) => setFormInput({...formInput,amount: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.amount} message={"he amount must be poistive ,And it requierd!!"}/>
                        </FormSubRowStyle>
                    </FormRowStyle>
                    <div >
                        <LabelStyle color={'#056699'} htmlFor="">Note</LabelStyle>
                        <TextAreaInputStyle value={formInput.note} onChange={(e) => setFormInput({...formInput,note: e.target.value})}></TextAreaInputStyle>
                    </div>
                    <SubmitBtnStyle >Add</SubmitBtnStyle>
                </FormStyle >
            </FormMainContainer>
        </>
    )
}
