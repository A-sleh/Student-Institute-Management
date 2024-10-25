import { useEffect, useState } from "react"
import DataServices from "../../Data/dynamic/DataServices"
import { useParams } from "react-router-dom"
import Title from "../Global/Title"
import { thStyle } from "../Teachers/teacherInformation/TeacherSubjects"
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
            console.log(TeachersMapingFinal)
        })
    },[])

    console.log(teachers)

    return (
        <>
            <Title title={window.location.pathname}/>
            {/* <table>
                <thead  style={{position: 'relative' }}>                    
                    <tr>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}></th>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Amount</th>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Date</th>
                        <th style={{...thStyle,border: 'none' , padding: '15px' }}>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        teacherBills.map( bill => {
                            const {billNo,amount,date,note,billId} = bill

                            if(radioState.billNo && !`${billNo}`.toLowerCase().includes(searchFiled.toLocaleLowerCase())) {
                                return 
                            }
                            if(radioState.note && !`${note}`.toLowerCase().includes(searchFiled.toLocaleLowerCase())) {
                                return 
                            }
                            if(radioState.date && !`${date}`.toLowerCase().includes(searchFiled.toLocaleLowerCase())) {
                                return 
                            }
                            
                            return (
                                <tr >
                                    <td style={tBStyle}>{billNo}</td>
                                    <td style={tBStyle}>{addSpaceBetweenDigit(amount)}</td>
                                    <td style={tBStyle}>{format( new Date(date) ,'yyyy / MM / dd' )}</td>
                                    <td style={tBStyle}>{note}</td>
                                    {
                                        type == 'manage' &&
                                        <td style={{padding: '15px' , backgroundColor: 'white' , margin: '5px 0' , border: 'none' }}>
                                            <i className="fa-regular fa-trash-can delete remove-student-btn" onClick={()=>handleDeleteClicked(bill)}></i>
                                        </td>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table> */}
        </>
        
    )
}