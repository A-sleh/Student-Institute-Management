import { useLoaderData, useLocation, useParams } from "react-router-dom"
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"
import { useEffect, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"

export default function ReportClassDetails() {

    const reportId = useParams().reportId 
    const classId = useLocation().state
    const [studentDetails,setStudentDetails] = useState([])
    useEffect(() =>{
        DataServices.ShowAllStudentsForCurrentReport(reportId,classId).then( studnets => {
            setStudentDetails(studnets)
        })
    },[])

    return (
        <div>
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
                <table>
                    <thead  style={{position: 'relative' , top: '-10px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Name</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Last Name</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Mark</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Total Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentDetails.map( (student,index) => {              
                                    const {name,lastName,Mark,TotalMark} = student

                                    return <tr style={{ textAlign: 'center' ,cursor:'pointer'}} className="hovering-row" key={index} >         
                                            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{name}</td>
                                            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{lastName}</td>
                                            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{Mark}</td>
                                            <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{TotalMark}</td>
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}