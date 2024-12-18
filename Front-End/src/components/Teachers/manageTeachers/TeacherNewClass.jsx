/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { ButtonsContainerStyle, FormStyle, GoBackBtnStyle, SubmitBtnStyle } from "../../shared/style/styleTag";
import { useEffect, useMemo, useState } from "react";
import { TeacherSubDetails } from "./TeacherSubDetails";
import { CLASSDETAILSCOLUMN } from "../columns/ClassDetailsColumn";
import { FilterGradeHeader } from "../../shared/subHeaderTable/FilterGradeHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Title from "../../Global/Title";
import DataServices from "../../../Data/dynamic/DataServices";
import Notification from "../../Global/Notification";
import Table from "../../shared/Table";

export default function TeacherNewClass() {

    // if i came from add new teacher class from manage class page to show all subject 
    const classId = useLocation()?.state?.ClassId || undefined;
    const classTitle = useLocation()?.state?.classTitle || undefined;
    const grade = useLocation()?.state?.grade || undefined;

    // to manage a single teacher 
    const teacherId = useParams().id ;  
    const gotoPreviousPage = useNavigate();
    const [currentSubjectClass,setCurrentSubjectClass] = useState({}) ;
    const [compareGrade,setCompareGrade] = useState(false)
    const [teacherClassAlreadySeleted,setTeacherClassAlreadySeleted] = useState(false)
    const [selectedTeacherClass,setSelectedTeacherClass] = useState([])
    const [selectedSubject,setSelectedSubject] = useState({})
    const [selectedClass,setSelectedClass] = useState({
        classId : classId || '' ,
        title: classTitle || '',
        grade : grade || ''
    })
    const [teacherDetails,setTeacherDetails] = useState({}) ;
    const [teacherSubjects,setTeacherSubjects] = useState([]);
    const [successAddTeacherToClass,setSuccessAddTeacherToClass] = useState(false) 
    const [classes,setClasses] = useState([]) 

    useEffect(() => {
        DataServices.TeacherInformaion(teacherId).then( teahcerInfo => {
            setTeacherDetails(teahcerInfo)
        })
        if( classId != undefined ) {
            DataServices.ShowAllTeachersSubjects(grade).then( teacherSubjects => {
                setTeacherSubjects(teacherSubjects)
            })
        }else {
            DataServices.ShowAllTeacherSubjects(teacherId).then( subjects => {
                setTeacherSubjects(subjects)
            })
        }
        DataServices.showCalsses().then( Classes => {
            setClasses(Classes) ;
            classSubjectsStatus(Classes).then( classSubject => {
                setCurrentSubjectClass(classSubject)
            })
            
        })
    } ,[])
    

    async function classSubjectsStatus(Classes) {
        return new Promise((resolve) => {
            let classSubject = {} ;
            Classes.map( async (Class ,index )=> {
                const subjects = await DataServices.ShowAllCurrentSubjectsInTheClass(Class.classId)

                if( subjects.status ) return
                const classId = Class.classId
                classSubject[classId] = {}
                
                subjects.map( subject => {
                    const key = subject.Subject 
                    classSubject[classId][key] = true 
                })
                if(index == ( Classes.length - 2 )){
                    resolve(classSubject)
                }
            })
        })
    }

    function checkIfTheTeacherClassIsSeleted() {
        let selectedBefore = 0
        selectedTeacherClass.map( (teacherClass) => {
            const {classId,teacherSubjectId} = teacherClass
            selectedBefore |= ( selectedClass.classId == classId && teacherSubjectId == selectedSubject.teacherSubjectId )
        })
        return selectedBefore
    }

    function handleAddClicked() {
        if(selectedClass.grade != selectedSubject.subject.grade) {
            
            setCompareGrade(true) ;
            setTimeout(() => {
                setCompareGrade(false)
            } , 3000 )
            return ;
        }
        
        if(checkIfTheTeacherClassIsSeleted()) {
            setTeacherClassAlreadySeleted(true) ;
            setTimeout(() => {
                setTeacherClassAlreadySeleted(false)
            } , 3000 )
            return ;
        }
        const {classId,grade,title,gender} = selectedClass ;
        const {teacherSubjectId,subject} = selectedSubject ;
        const Subject_1 = subject.subject
        const status = currentSubjectClass[selectedClass.classId][Subject_1]

        
        setSelectedTeacherClass(
            
            [...selectedTeacherClass,{
                id: selectedTeacherClass.length == 0 ? 1 : selectedTeacherClass[selectedTeacherClass.length - 1].id + 1 , // if the user delete some one and re add it the id will repeate so i use the lastest subject id  added  to aviod this case
                classId: classId, 
                classGrade : grade,
                classTitle : title ,
                classGender : gender,
                teacherSubjectId : teacherSubjectId , 
                subject: Subject_1 ,
                subjectGrade : selectedSubject.subject.grade,
                status :  status == true
            }]
        )
    }

    async function addTeacherToClasses() {
        return new Promise( resolve => {
            selectedTeacherClass.map( (teacherClass , index) => {
                const {teacherSubjectId,classId} = teacherClass
                DataServices.AddTeacherToClass(teacherSubjectId,classId)
                if(index == selectedTeacherClass.length - 1 ) {
                    resolve('done')
                }
            })
        })
    }

    const handleConfirmClicked = () => {
        addTeacherToClasses().then( _ => {
            setSelectedTeacherClass([]) ; 
            setSuccessAddTeacherToClass(true)
            setTimeout(() => {
                setSuccessAddTeacherToClass(false) ;
            } , 2000 )
        })
    }


    return (
        <>
            
            <Notification title={'class grade must be equal the subject grade'} type={'error'} state ={compareGrade} setState={setCompareGrade} />
            <Notification title={'have been seleted already'} type={'error'} state ={teacherClassAlreadySeleted} setState={setTeacherClassAlreadySeleted} />
            <Notification title={'Teacher was added to all selected classes'} type={'success'} state ={successAddTeacherToClass} setState={setSuccessAddTeacherToClass} />
            <Title title={window.location.pathname} />

            {
                teacherId != 'all' && <TeacherSubDetails teacherDetails={teacherDetails}/>
            }
            <div style={{display: 'flex' , gap: '10px' , flexWrap : 'wrap'}}>
                <div style={{flex: '4 1 3em'}}>
                    <SubjectsTable subjects={teacherSubjects} setSelectedSubject={setSelectedSubject} selectedSubject={selectedSubject} AllTeachers={classId != undefined}/>
                    <ClassesTable classes={classes} setSelectedClass={setSelectedClass} selectedClass={selectedClass} selectedGrade={grade} />
                </div>
                <div style={{flex : '1 2 5em' }}>
                    <TeacherClassSelected selectedTeacherClass={selectedTeacherClass} setSelectedTeacherClass={setSelectedTeacherClass} handleConfirmClicked={handleConfirmClicked}/>
                </div>
            </div>

            <ButtonsContainerStyle>
                <SubmitBtnStyle onClick={()=>{handleAddClicked()}}>Add</SubmitBtnStyle>
                <GoBackBtnStyle onClick={()=>{gotoPreviousPage(-1,{replace: true})}} >Go back</GoBackBtnStyle>
            </ButtonsContainerStyle>
        </>
    )
}


function SubjectsTable({subjects,setSelectedSubject,selectedSubject,AllTeachers}) {

    const columns = useMemo(() => [
        AllTeachers ? 
        {
            Header: 'Teacher Name' ,
            accessor: 'name' ,
            Cell : ({row}) => {
                const teahcerDetails = row.original.teacher ; 
                return teahcerDetails.name + ' ' + teahcerDetails.lastName;
            }
        }:{   
            Header: 'Grade' ,
            accessor : 'subject.grade'
        },
        {
            Header: 'Subject' ,
            accessor : 'subject.subject'
        },
        {   
            Header: 'Maximum Mark' ,
            accessor : 'subject.maximumMark'
        },
        {
            Header: 'Select' ,
            id: 'action' ,
            Cell : ({row}) => {
                return <input checked={selectedSubject.teacherSubjectId == row.original.teacherSubjectId} onChange={ () => {setSelectedSubject(row.original)}} type="radio"   />
            }
        }
    ],[selectedSubject])
    
    return (
        <>
            <h3>Teacher{AllTeachers && 's'} subjects </h3>
            <Table column={columns} data={subjects} showMainHeader={false} styleObj = {{padding: '5px' , fontSize : '14px' , sameColor : false}} />
        </>
    )

}

function  ClassesTable({classes,setSelectedClass,selectedClass,selectedGrade}) {

    const [filter,setFilter] = useState(selectedGrade != undefined ? selectedGrade :'all')
    
    const columns = useMemo(() => [
        ...CLASSDETAILSCOLUMN ,
        {
            Header: 'Select' ,
            id: 'action' ,
            Cell : ({row}) => {
                return <input checked={selectedClass.classId == row.original.classId} onChange={(_) => {setSelectedClass(row.original)}} type="radio" />
            }
        }
    ],[selectedClass])

    const classFiltering = classes.filter( Class => {
        return (filter?.toLowerCase() == Class.grade?.toLowerCase() || filter?.toLowerCase() == 'all')
    })

    return(
        <>
            <h3>All Classes </h3>
            <Table column={columns} data={classFiltering || []} showMainHeader={false} styleObj = {{padding: '5px' , fontSize : '14px' , sameColor : false}}>
                <FilterGradeHeader setFilter={setFilter} filter={filter} />
            </Table>
        </>
    )

}

function TeacherClassSelected({selectedTeacherClass,setSelectedTeacherClass,handleConfirmClicked}) {

    const handleDeleteClicked = (id) => {
        setSelectedTeacherClass(
            selectedTeacherClass.filter( teacherClass => {
                return teacherClass.id != id    
            })
        )

    }

    return (
        <div style={{ backgroundColor: "#dddddd70",padding: "10px",borderRadius: "5px", height: '100%' , display: 'flex' , flexDirection: 'column' , justifyContent: 'space-between'}} >
            <div>
                <h3 style={{ margin: "5px 0" }}>Teacher Class Seleted</h3>
                <div style={{display: 'flex' , flexWrap: 'wrap' , flexDirection: 'column', gap: '5px'}}>
                    {
                        selectedTeacherClass.map( (teacherClass,index) => {
                            const {id,subject,subjectGrade,classTitle,status} = teacherClass ;
                            return <div key={index} style={{  borderLeftWidth: '3px' , borderLeftStyle: 'solid' , borderLeftColor: status ? 'red': '#00ff00' ,padding: '5px 10px' , backgroundColor: 'white' , borderRadius: '5px' , display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
                                        <div><b>{index + 1}:</b> <span style={{fontSize: '0.9em'}}>{subject}-{subjectGrade}-{classTitle}</span></div>
                                        <i onClick={()=>{handleDeleteClicked(id)}}className="bi bi-x-lg" style={{color: 'red' , cursor: 'pointer' , fontWeight: 'bold',fontSize: '0.9em'}}></i>
                                    </div>
                        })
                    }
                </div>
            </div>

            <div>
                <button onClick={handleConfirmClicked} style={{marginRight: '5px',padding: '2px 12px' ,cursor: 'pointer' , border: 'none' , color : 'white' , borderRadius: '4px' , backgroundColor : '#066599' , fontSize: '12px'}}>Confirm</button>
                <button onClick={()=>{setSelectedTeacherClass([])}} style={{padding: '2px 12px' ,cursor: 'pointer' , border: 'none' , color : 'white' , borderRadius: '4px' , backgroundColor : 'red' , fontSize: '12px'}}>Clear All</button>
            </div>
        </div>  
    )
}

