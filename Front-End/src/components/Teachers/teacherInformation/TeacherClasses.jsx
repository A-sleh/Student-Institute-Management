import { useEffect, useState } from "react";
import { tBStyle, thStyle } from "./TeacherSubjects"
import DataServices from "../../../Data/dynamic/DataServices";

export default function TeacherClasses({teacherId}) {

    const [teacherSubjects , setTeacherSubjects] = useState([]) ;
    let classCounter = 1 ; 
    useEffect(() => {
        DataServices.ShowAllTeacherSubjects(teacherId).then( subjects => {
            setTeacherSubjects(subjects) ; 
        })
    } , [])

    return(
        <div style={{width: '100%' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Its Classes</span>
            <div style={{ padding: '15px 8px' , borderRadius: '0 0 5px 5px' , background: '#f3f1f1d7'}}>
            <table >
                    <thead >                    
                        <tr >
                            <th style={thStyle}>Number</th>
                            <th style={thStyle}>Title</th>
                            <th style={thStyle}>grade</th>
                            <th style={thStyle}>gender</th>
                            <th style={thStyle}>subject</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            teacherSubjects.map((SubjectClass,index) => {
                                const { subject} = SubjectClass.subject
                                return SubjectClass.classes.map( Class => {
                                    const {title,grade,gender} = Class 
                                    return  <tr >
                                        <td style={tBStyle}>{classCounter ++ }</td>
                                        <td style={tBStyle}>{title}</td>
                                        <td style={tBStyle}>{grade}</td>
                                        <td style={tBStyle}>{gender}</td>
                                        <td style={tBStyle}>{subject}</td>
                                    </tr>
                                })
                            })
                        }
                    </tbody>
                </table>
            </div>  
        </div>
    )
}