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
import { NewBillTEXT } from '../../../Data/static/Bills/StudentsPaysCom/NewBillTEXT';
import { useSelector } from 'react-redux';

const initialFormInput = {
    teacher: null, student : { studentId: '' , name: '', lastName: '' , }, amount: '' , date: '' , note: '', fullName : '', type: 'in', billNo: ''
}

export default function NewBill() {

    const {currentLange} = useSelector( state => state.language)
    const {studentName ,billNumber ,billDate ,billAmount ,billNote ,addBtn ,successAddStudentBillMES ,errorAddStudentBillMES,validationMessages } = NewBillTEXT[currentLange]
    const {nameVale ,bilNumberVal ,billDateVal ,billAmountVal} = validationMessages

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
            <Notification  title={successAddStudentBillMES} type={'success'} state ={successAddBill} setState={setSuccessAddBill}/>
            <Notification  title={errorAddStudentBillMES} type={'error'} state ={errorAddBill} setState={setErrorAddBill}/>
            <FormMainContainer >
                <FormStyle onSubmit={(e)=> handleSubmitClicked(e)}>
                    <FormRowStyle >
                        <FormSubRowStyle width={'100%'} >
                            <LabelStyle color={'#056699'} >{studentName}</LabelStyle>
                            <InputStyle type="text"  onFocus={onFocus}  onBlur={onBlur}  className={validationBillInput.studentId ? 'error' :'' } value={formInput.fullName} onChange={(e)=>{setFormInput({...formInput,fullName: e.target.value})}}/>
                            <ErrorMessage showMessage={validationBillInput.studentId} message={nameVale}/>
                            <SearchBodyList searchValue={formInput.fullName} handleElementClicked={handleSelectedStudnet} data={allStudnets} focused={focused}/>
                        </FormSubRowStyle>
                    </FormRowStyle>
                    
                    <FormRowStyle>
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'} >{billNumber}</LabelStyle>
                            <InputStyle type="text" value={formInput.billNo} className={ validationBillInput.billNo ? 'error': ''} onChange={(e) => setFormInput({...formInput,billNo: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.billNo} message={bilNumberVal}/>
                        </FormSubRowStyle>

                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'} >{billDate}</LabelStyle>
                            <InputStyle type="date" value={formInput.date} className={ validationBillInput.date ? 'error': ''} onChange={(e) => setFormInput({...formInput,date: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.date} message={billDateVal}/>
                        </FormSubRowStyle>
                        
                        <FormSubRowStyle >
                            <LabelStyle color={'#056699'} >{billAmount}</LabelStyle>
                            <InputStyle type="number" value={formInput.amount} className={ validationBillInput.amount ? 'error': ''} onChange={(e) => setFormInput({...formInput,amount: e.target.value})}/>
                            <ErrorMessage showMessage={validationBillInput.amount} message={billAmountVal}/>
                        </FormSubRowStyle>
                    </FormRowStyle>
                    <div>
                        <LabelStyle color={'#056699'} htmlFor="">{billNote}</LabelStyle>
                        <TextAreaInputStyle value={formInput.note} onChange={(e) => setFormInput({...formInput,note: e.target.value})}></TextAreaInputStyle>
                    </div>
                    <SubmitBtnStyle >{addBtn}</SubmitBtnStyle>
                </FormStyle >
            </FormMainContainer>
        </>
    )
}
