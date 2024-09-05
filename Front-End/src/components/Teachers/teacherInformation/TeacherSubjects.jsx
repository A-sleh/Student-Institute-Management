import { useEffect, useState } from "react"
import DataServices from "../../../Data/dynamic/DataServices";

export default function TeacherSubjects({teacherId}) {

    const thStyle = {
        backgroundColor: 'white',
        borderBottom: '1px solid #ddd',
        textTransform: 'uppercase',
        color: '#066599',
        fontWeight: 'bold',
        padding: '4px 10px',
        fontSize : '14px'
    }
    const tBStyle = {
        fontWeight: 'bold',
        padding: '4px 10px',
        fontSize : '13px',
        backgroundColor: 'white',
        borderLeftColor : 'white'
    }


    const [teacherSubjects , setTeacherSubjects] = useState([]) ; 
    useEffect(() => {
        DataServices.ShowAllTeacherSubjects(teacherId).then( subjects => {
            setTeacherSubjects(subjects) ; 
        })
    } , [])

    return(
        <div style={{width: '100%' , marginBottom: '20px'}}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Teacher Subjects</span>
            <div style={{ padding: '15px 8px' , borderRadius: ' 0 0 5px 5px' , background: '#f3f1f1d7' }}>
                <table >
                    <thead >                    
                        <tr >
                            <th style={thStyle}>Number</th>
                            <th style={thStyle}>subject</th>
                            <th style={thStyle}>maximumMark</th>
                            <th style={thStyle}>salary</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            teacherSubjects.map((Subject,index) => {
                                const { maximumMark,subject} =Subject.subject
                                return  <tr >
                                    <td style={tBStyle}>{index + 1}</td>
                                    <td style={tBStyle}>{subject}</td>
                                    <td style={tBStyle}>{maximumMark}</td>
                                    <td style={tBStyle}>{Subject.salary}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>  
    )
}