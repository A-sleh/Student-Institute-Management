/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/
import { errorActionLogic, successActionLogic } from "../../shared/logic/logic";
import { TeacherSubDetails } from "./TeacherSubDetails";
import { useMemo, useState } from "react";
import { useNavigate, useParams} from 'react-router-dom'
import { SUBJECTsCOLUMN } from "../columns/SubjectManageColumn";
import { ButtonsContainerStyle, FormMainContainer, FormStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import { FilterGradeHeader } from "../../shared/subHeaderTable/FilterGradeHeader";
import Title from "../../Global/Title";
import DataServices from "../../../Data/dynamic/DataServices";
import Notification from "../../Global/Notification";
import Table from "../../shared/Table";
import useTeacherSubjectTeachesIt from "../../../hooks/teacher_hooks/useTeacherSubjectTeachesIt";
import { TeacherNewSubjectTEXT } from "../../../Data/static/teachers/ManageTeacher/TeacherNewSubjectTEXT";
import { useSelector } from "react-redux";


export default function TeacherNewSubject() {

    const {currentLange} = useSelector( state => state.language)
    const { goBackBtn ,salaryPlaceHolder,addBtn ,selectedSubjectsTitle ,usedTitle,chooseSubjectsTitle , hideSubjectsTitle ,successAddSubjectsMES ,errorInSelectSubjectsMES ,errorInSubjectsSalary } = TeacherNewSubjectTEXT[currentLange]
    const teacherId = useParams().id;
    // Notification state
    const [successAdd,setSuccessAdd] = useState(false)
    const [emptySeletedRows,setEmptySeletedRows] = useState(false) 
    const [salaryValidation,setSalaryValidation] = useState(false)
    // Filtering state
    const [hiddenUsedSubject,setHiddenUsedSubject] = useState(false)
    const [filter,setFilter] = useState('All')
    const gotoPreviousPage = useNavigate();
    // Main Information state
    const [teacherDetails,allsubjects] = useTeacherSubjectTeachesIt(teacherId,filter,hiddenUsedSubject,successAdd);
    const [selectedSubjects,setSelectedSubjects] = useState([])
    // table columns
    const columns = useMemo(() => [
        ...SUBJECTsCOLUMN ,
        {
            Header : {
                english: 'Status',
                arabic: 'الأستخدام'
            }  ,
            id: 'Action' ,
            Cell : ({row}) => {
                const {checked,onChange} = row.getToggleRowSelectedProps() 
                if(row.original.isUsed)
                    return <span style={{padding: '2px 15px' , fontSize : '11px' , fontWeight: '600', color: 'red' , borderRadius: '4px' , backgroundColor: '#ff000057'}}>{usedTitle}</span>
                else 
                    return <input type='checkbox' style={{cursor: 'pointer'}} checked={checked} onChange={(e)=>onChange(e)} />                
            }
        }
    ],[successAdd,currentLange])
    
    async function addSubjectsToTeacher(subjectsSelected) {
        return new Promise( async resolve => {
            await subjectsSelected.map( subject => {
                const subjectId = subject.original.subjectId 
                const obj = {
                    subject : {
                        subjectId: subjectId ,
                    },
                    salary : subject.salary
                }
                DataServices.AddNewSubjectsForTeacher({teacher:{teacherId:+teacherId},...obj})
            })
            resolve('done')
        })
    }

    function validSalaryValue() {

        let checkSalary = 0 ;
        selectedSubjects.map( subject => {
            checkSalary |= (subject?.salary == '' || subject.unValid || subject.salary == undefined ) ;
        })
        return checkSalary
    }

    function handleAddClicked() {

        if(selectedSubjects.length == 0 ) {
            errorActionLogic(setEmptySeletedRows)
            return             
        }

        if( validSalaryValue() ) {
            errorActionLogic(setSalaryValidation)
            return  
        }

        addSubjectsToTeacher(selectedSubjects).then(_ => {
            successActionLogic(setSuccessAdd)
        })
    }

    function handlChangeInput(newSalary,subjectId) {
        const newSelected = selectedSubjects.map( (row) => {
            return row.id == subjectId ? {...row, salary : newSalary , unValid : ( newSalary < 1 || /[^0-9]/.test(newSalary))} : row
        })
        setSelectedSubjects(newSelected)
    }

    return (
        <>
        
            <Notification title={successAddSubjectsMES} type={'success'} state ={successAdd} setState={setSuccessAdd} />
            <Notification title={errorInSelectSubjectsMES} type={'error'} state ={emptySeletedRows} setState={setEmptySeletedRows} />
            <Notification title={errorInSubjectsSalary} type={'error'} state ={salaryValidation} setState={setSalaryValidation} />
            <Title title={window.location.pathname}/>

            <TeacherSubDetails teacherDetails={teacherDetails}/>
            <FormStyle >
                <h3>{chooseSubjectsTitle} </h3>
                <Table data={allsubjects} column={columns} showMainHeader={false} setSelectedRows={setSelectedSubjects} unableId={true} styleObj = {{padding: '8px' , fontSize : '14px' , sameColor : false}}>
                    <FilterGradeHeader setFilter={setFilter} filter={filter}>
                        <div onClick={()=> {setHiddenUsedSubject(c => !c)}} style={{fontSize: '16px',cursor: 'pointer' , fontWeight: hiddenUsedSubject ? '600': '300' }}> {hideSubjectsTitle} </div>
                    </FilterGradeHeader>
                </Table>
            </FormStyle>

            <FormStyle style={{marginTop:'10px'}}>
                <h4 style={{marginBottom: '10px'}}> <span style={{color : 'red' }}>*</span> {selectedSubjectsTitle} </h4>
                <SelectedSubjectsContainer selectedSubjects={selectedSubjects} handlChangeInput={handlChangeInput}/>
            </FormStyle>

            <ButtonsContainerStyle>
                <SubmitBtnStyle onClick={()=>{handleAddClicked()}}>{addBtn}</SubmitBtnStyle>
                <GoBackBtnStyle onClick={()=>{gotoPreviousPage('/ManageTeacher',{replace: true})}} >{goBackBtn}</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </>
    )
}

function SelectedSubjectsContainer({selectedSubjects,handlChangeInput}) {

    const {currentLange} = useSelector( state => state.language)
    const { salaryPlaceHolder} = TeacherNewSubjectTEXT[currentLange]
    return (
        <div style={{display: 'flex' , gap: '10px', backgroundColor : 'white' , padding: '10px' , flexWrap: 'wrap'}}> 
            { 
                selectedSubjects.map(subject => {
                    return {...subject , salary : subject?.salary || '' , unValid : subject?.unValid || false };
                }).map( (subject,index) => {
                    return (
                        <div key={index}>
                            <span style={{fontSize: '15px' , fontWeight: '600'}}>{+subject.id + 1 }: </span>
                            <span>{ subject.original.subject} </span>
                            <span><span style={{fontWeight: '600'}}>/</span> {subject.original.grade}</span>
                            <input type="text" value={subject.salary} onChange={(e)=>handlChangeInput(e.target.value,subject.id)}  style={{border: 'none' , outline: 'none', marginLeft: '10px' , padding: '0px 15px' ,width: '8rem' , color: subject.unValid ? 'red' : 'black' , caretColor: 'black'}} placeholder={salaryPlaceHolder}/>
                        </div>
                    )
                })
            }
        </div>
    )
}