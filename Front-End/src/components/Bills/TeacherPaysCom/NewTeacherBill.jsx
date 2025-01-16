/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { FormMainContainer, FormRowStyle, FormStyle, FormSubRowStyle, InputStyle, LabelStyle, SubmitBtnStyle, TextAreaInputStyle } from '../../shared/style/styleTag';
import { useEffect, useState } from 'react'
import DataServices from '../../../Data/dynamic/DataServices';
import Notification from '../../Global/Notification';
import ErrorMessage from '../../shared/ErrorMessage';
import SearchBodyList from '../../shared/SearchBodyList';
import { useSelector } from 'react-redux';
import { errorActionLogic, successActionLogic } from '../../shared/logic/logic';
import { NewTeacherBillTEXT } from '../../../Data/static/Bills/TeacherPaysCom/NewTeacherBillTEXT';
import useGetAllTeachers from '../../../hooks/teacher_hooks/useGetAllTeachers';

const initialFormInput = { 
    teacher: {
        teacherId: '',
        name: '',
        lastName: ''
    },
    student : null,
    amount: '' ,
    date: '' ,
    note: '',
    fullName : '',
    type: 'out',
    billNo: ''
}

export default function NewBill() {

    const {currentLange} = useSelector( state => state.language)
    const {teacherName ,billNumber ,billDate ,billAmount ,billNote ,addBtn ,successAddStudentBillMES ,validationMessages,errorAddStudentBillMES } = NewTeacherBillTEXT[currentLange]
    const {nameVale ,bilNumberVal ,billDateVal ,billAmountVal} = validationMessages

    

    const [successAddBill,setSuccessAddBill] = useState(false)
    const [errorAddBill,setErrorAddBill] = useState(false)
    const [allTeachers] = useGetAllTeachers()
    const [formInput,setFormInput] = useState(initialFormInput)
    const [validationBillInput,setValidationBillInput] = useState({
        teacherId: '' ,
        date: '' ,
        billNo: '',
        amount: '' 
    })

    // search input field functionality 
    useEffect(() => {
        DataServices.TeacherInformaion().then( teachers => {
            const teacherMaping = teachers.map( teacher => {
                return {
                    id : teacher.teacherId ,
                    name: teacher.name ,
                    lastName: teacher.lastName,
                    fullName : teacher.name + ' ' + teacher.lastName
                }
            })
            setAllTeachers(teacherMaping)
        })
    },[])
    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => { setTimeout(() => { setFocused(false) },200) }

    function handleSelectedTeacher(teacher) {
        setFormInput({...formInput , teacher : {
            teacherId: teacher.id ,
            name: teacher.name,
            lastName: teacher.lastName ,
        }, fullName : teacher.full_name })
        setFocused(false)
    }

    function validInputs() {
        const {billNo,date,amount,teacher} = formInput ;
        const { teacherId } = teacher

        setValidationBillInput({
            teacherId: teacherId == '' ,
            date: date == '' ,
            billNo: billNo == '',
            amount: amount <= 0 
        })

        return ( teacherId == '' || date == '' || billNo == ''|| amount <= 0 )
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

    console.log(formInput)
    return (
        <>
            <Notification  title={successAddStudentBillMES} type={'success'} state ={successAddBill} setState={setSuccessAddBill}/>
            <Notification  title={errorAddStudentBillMES} type={'error'} state ={errorAddBill} setState={setErrorAddBill}/>
            <FormMainContainer >
                <FormStyle onSubmit={(e)=> handleSubmitClicked(e)}>
                    <FormRowStyle >
                        <FormSubRowStyle width={'100%'}>
                            <LabelStyle color={'#056699'} >{teacherName}</LabelStyle>
                            <InputStyle type="text"   onFocus={onFocus}  onBlur={onBlur}  className={validationBillInput.teacherId ? 'error' :'' } value={formInput.fullName} onChange={(e)=>{setFormInput({...formInput,fullName: e.target.value})}}/>
                            <ErrorMessage showMessage={validationBillInput.teacherId} message={nameVale}/>
                            <SearchBodyList searchValue={formInput.fullName} handleElementClicked={handleSelectedTeacher} data={allTeachers} focused={focused}/>
                        </FormSubRowStyle>
                    </FormRowStyle>

                    <FormRowStyle >
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

                    <div >
                        <LabelStyle color={'#056699'}>{billNote}</LabelStyle>
                        <TextAreaInputStyle value={formInput.note} onChange={(e) => setFormInput({...formInput,note: e.target.value})}></TextAreaInputStyle>
                    </div>

                    <SubmitBtnStyle >{addBtn}</SubmitBtnStyle>
                </FormStyle>
            </FormMainContainer>
        </>
    )
}
