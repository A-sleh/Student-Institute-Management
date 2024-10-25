import { useEffect, useState } from "react"
import DataServices from "../../Data/dynamic/DataServices"
import { useParams } from "react-router-dom"
import Title from "../Global/Title"
import { tBStyle, thStyle } from "../Teachers/teacherInformation/TeacherSubjects"
import Subject from "../Subjects/Subject"

export default function RemoveTeachersFromClass() {

    const [teachers,setTeachers] = useState([])
    const [teachersSelectedId,setTeachersSelectedId] = useState({})
    const classId = useParams().classId
    useEffect(() => {
        DataServices.ShowTeacherInSideClass(classId).then( teachers => {
            const TeachersMaping = teachers.map( teacher => {
                const name = teacher.name + ' ' + teacher.lastName ;
                const teacherSubjectsARRAY = teacher.teacherSubjects.map( teacherSubject => {
                    return {
                        name , 
                        teacherSubjectId:teacherSubject.teacherSubjectId ,
                        subject : teacherSubject.subject.subject
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
    },[])

    function handleTeacherRowClicked(teahcerSubjectId) {
        let teachersSubjectsID = new Map() ;
        teachersSubjectsID = {...teachersSelectedId} ;

        // To remove teacher subject id if the user was selected before ,else added it on the state

        if( teachersSubjectsID[teahcerSubjectId] ) {
            delete teachersSubjectsID[teahcerSubjectId] 
        }else teachersSubjectsID[teahcerSubjectId] = true

        setTeachersSelectedId(teachersSubjectsID)
    }

    console.log(teachersSelectedId)

    return (
        <>
            <Title title={window.location.pathname}/>
            <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px' , padding: '10px' , margin: '10px 0'}}>
                <table>
                    <thead  style={{position: 'relative' , top: '-5px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}></th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Name</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teachers.map( (teacher,index) => {
                                console.log(teacher)
                                const {name,subject,teacherSubjectId} = teacher

                                return (
                                    <tr style={{transition: '.3s',borderBottom: '2px solid white',borderLeft:teachersSelectedId[teacherSubjectId] ?  '2px solid #056699' : "none" ,color: teachersSelectedId[teacherSubjectId] ?  '#034568' : "black",backgroundColor: teachersSelectedId[teacherSubjectId] ?  '#05659945' : "white"}} className="hovering-row" onClick={()=>{handleTeacherRowClicked(teacherSubjectId)}}>
                                        <td style={{transition: '.3s',padding: '15px'  , margin: '5px 0'  ,color: teachersSelectedId[teacherSubjectId] ? '#056699':'#000000', border: 'none' , backgroundColor:teachersSelectedId[teacherSubjectId] ? 'white': '#05659945',fontWeight: 'bold'  }}>{index + 1 }</td>
                                        <td style={{padding: '15px'  , margin: '5px 0' , border: 'none' }}>{name}</td>
                                        <td style={{padding: '15px'  , margin: '5px 0' , border: 'none' }}>{subject}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> 
            </div>
        </>
        
    )
}