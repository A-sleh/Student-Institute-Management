import { useEffect, useState } from "react"
import DataServices from "../../Data/dynamic/DataServices"
import { useNavigate, useParams } from "react-router-dom"
import Title from "../Global/Title"
import {  thStyle } from "../Teachers/teacherInformation/TeacherSubjects"
import addSpaceBetweenDigit from "../Global/globalStyle"
import Notification from "../Global/Notification"

export default function RemoveTeachersFromClass() {

    const [teachers,setTeachers] = useState([])
    const [currentClass,setCurrentClass] = useState({})
    const [teachersSelectedId,setTeachersSelectedId] = useState({})
    const [wornning,setWornning] = useState(false)
    const [successRemoveTeachers,setSuccessRemoveTeachers] = useState(false)
    const classId = useParams().classId
    useEffect(() => {
        DataServices.ShowTeacherInSideClass(classId).then( teachers => {
            const TeachersMaping = teachers.map( teacher => {
                const name = teacher.name + ' ' + teacher.lastName ;
                const teacherSubjectsARRAY = teacher.teacherSubjects.map( teacherSubject => {
                    return {
                        name , 
                        teacherSubjectId:teacherSubject.teacherSubjectId ,
                        subject : teacherSubject.subject.subject,
                        salary : teacherSubject.salary
                    }
                })
                return teacherSubjectsARRAY ;
            })
            let TeachersMapingFinal = [] ;
            TeachersMaping.map( teacherSubjects => {
                TeachersMapingFinal = [...TeachersMapingFinal,...teacherSubjects] ;
            })
            setTeachers(TeachersMapingFinal)
        })
        DataServices.showCalsses(classId).then( Class => {
            setCurrentClass(Class)
        })
    },[successRemoveTeachers])
    
    function handleTeacherRowClicked(teahcerSubjectId) {
        let teachersSubjectsID = new Map() ;
        teachersSubjectsID = {...teachersSelectedId} ;

        // To remove teacher subject id if the user was selected before ,else added it on the state

        if( teachersSubjectsID[teahcerSubjectId] ) {
            delete teachersSubjectsID[teahcerSubjectId] 
        }else teachersSubjectsID[teahcerSubjectId] = true

        setTeachersSelectedId(teachersSubjectsID)
    }


    async function RemoveTeachersFromClass(teachersSubjectIDs) {
        new Promise( resolve => {
            teachersSubjectIDs.map( (teacherSubjectId,index) => {
                DataServices.DeleteTeacherFromClass(teacherSubjectId,classId) 
                if( index == teachersSubjectIDs?.length - 1 ) {
                    resolve('done')
                }
            })
        })
    }

    function handleRemoveClicked() {
        let teachersSubjectIDs = Object.keys(teachersSelectedId)
        
        if(teachersSubjectIDs?.length == 0 ) {
            setWornning(true)
            setTimeout(() => {
                setWornning(false)
            } , 2000 )
            return 
        }
        
        RemoveTeachersFromClass(teachersSubjectIDs).then( _ => {
            setSuccessRemoveTeachers(true)
            setTimeout(() => {
                setSuccessRemoveTeachers(false)
            } , 2000 )
        })

    }

    return (
        <>
            <Notification title={'select one teacher at least'} type={'error'} state ={wornning} setState={setWornning} />
            <Notification title={'remove teachers'} type={'success'} state ={successRemoveTeachers} setState={setSuccessRemoveTeachers} />
            <Title title={window.location.pathname}/>
            <h3 style={{backgroundColor: '#056699' , marginBottom: '8px' , color: 'white' , padding: '10px 10px 0 10px' ,fontWeight: '400'}}>
                <span style={{textAlign: 'left'}}>{currentClass.title} / {currentClass.grade}</span>
                <span style={{float: 'right'}}>Teacher Number : {teachers?.length || 0}</span>
            </h3>
            <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px' , padding: '10px' , margin: '10px 0'}}>
                <h3 style={{marginBottom: '10px'}}>Teachers</h3>                
                <table>
                    <thead  style={{position: 'relative' , top: '-5px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}></th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Name</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Subject</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teachers.map( (teacher,index) => {
                                const {name,subject,teacherSubjectId,salary} = teacher

                                return (
                                    <tr style={{transition: '.3s',borderBottom: '2px solid white',borderLeft:teachersSelectedId[teacherSubjectId] ?  '2px solid #056699' : "none" ,color: teachersSelectedId[teacherSubjectId] ?  '#056699' : "black",cursor: 'pointer'}} className="hovering-row" onClick={()=>{handleTeacherRowClicked(teacherSubjectId)}}>
                                        <td style={{transition: '.3s',padding: '15px'  , margin: '5px 0'  ,color: teachersSelectedId[teacherSubjectId] ? 'white':'#056699', border: 'none' , backgroundColor:teachersSelectedId[teacherSubjectId] ? '#056699': 'white',fontWeight: 'bold'  }}>{index + 1 }</td>
                                        <td style={{padding: '15px'  , margin: '5px 0',borderLeft: 'none' }}>{name}</td>
                                        <td style={{padding: '15px'  , margin: '5px 0' }}>{subject}</td>
                                        <td style={{padding: '15px'  , margin: '5px 0' }}>{addSpaceBetweenDigit(salary)}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> 
            </div>
            <ControalButtons handleRemoveClicked={handleRemoveClicked}/>
        </>
        
    )
}

function ControalButtons({handleRemoveClicked}) {
    const gotoPage = useNavigate() 

    return (
        <div style={{margin: '10px 0'}}>
            <button onClick={()=>handleRemoveClicked()} style={{marginRight: '10px',padding: '4px 20px' ,cursor: 'pointer' , border: 'none' , color : 'white' , borderRadius: '2px' , backgroundColor : '#066599'}}>Remove</button>
            <button onClick={()=>{gotoPage(-1,{replace: true})}} style={{padding: '4px 20px' ,cursor: 'pointer' , border: 'none' , color : 'white' , borderRadius: '2px' , backgroundColor : 'red'}}>Go Back</button>
        </div>
    )

}