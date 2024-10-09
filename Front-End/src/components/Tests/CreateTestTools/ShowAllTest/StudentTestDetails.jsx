import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HeaderControal } from "../../../Bills/TeacherPaysCom/ShowBillTeacherDetails";
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects";
import { useEffect, useState } from "react";
import DataServices from "../../../../Data/dynamic/DataServices";
import { HeaderToShowTestInfo } from "./ClassesTestDetails";

export default function StudentTestDetails() {

    const classId = useParams().classId
    const gotoPreviousPage = useNavigate()
    const [search,setSearch] = useState('')
    const testDetails = useLocation().state
    const [studentsMarks,setStudentsMarks] = useState([]);
    
    useEffect(() => {
            DataServices.ShowStudentsMarksInOneClass(classId,testDetails.testId).then( students => {
                setStudentsMarks(students)
            })

    },[])

    return (
        <>
            <HeaderToShowTestInfo testDetails={testDetails} />
            <HeaderControal searcByName={search} setSearcByName={setSearch} />
            <h2 style={{margin: '20px 0 5px 0', padding: '0' , lineHeight: '20px'}}>Students mark in the <span style={{color: '#066599' , textTransform: 'uppercase'}}>{testDetails.testType}</span></h2>
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
                <table>
                    <thead  style={{position: 'relative' , top: '-10px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Count</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Name </th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Father Name</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentsMarks.map( (student,index) => {  
                                const {mark} = student  
                                const fullName = student.student.name+ ' '+ student.student.lastName
                                if( !fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase()))return                   
                                return (
                                    <tr className="hovering-row" >
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{index + 1}</td>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{fullName}</td>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{student.student.fatherName} </td>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{mark}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <button onClick={()=>{gotoPreviousPage(-1)} } style={{padding: '4px 20px',cursor: 'pointer' , color: 'white' , backgroundColor: 'red' , border: 'none' , outline: 'none' , borderRadius: '2px' , margin: '10px 0'}}>Back</button>
        </>
    )
}