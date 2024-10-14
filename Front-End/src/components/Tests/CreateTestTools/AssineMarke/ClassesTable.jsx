import { Children, useEffect, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"
import { useNavigate } from "react-router-dom"


export default function ClassesTable({selectedGrade,search}) {

    const [classes,setClasses] = useState([])
    const gotoTestClassCurrentPage = useNavigate()

    useEffect(() => {
        DataServices.showCalsses().then( classes => {
            setClasses(
                classes.filter( Class => {
                    return Class.grade.toLowerCase() == selectedGrade.toLowerCase()
                })
            )
        })
    } , [selectedGrade])

    return (
        <>
            <h3 style={{padding: '5px',fontWeight: '400' , backgroundColor: '#066599' , color: 'white' , textAlign: 'center'}}>Classes</h3>
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
                <table>
                    <thead  style={{position: 'relative' , top: '-10px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Count</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Class Title</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Gender</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Grade</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map( (Class,index) => {  
                                const {title,gender,grade,students} = Class  
                                if( !title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))return                   
                                return (
                                    <tr className="hovering-row" style={{cursor: 'pointer'}} onClick={()=>{gotoTestClassCurrentPage(`/Test/TestClassCurrent/${Class.classId}`,{state:{ grade : selectedGrade , classTitle :title } })}}>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{index + 1}</td>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{title}</td>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{gender}</td>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{grade}</td>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{students?.length}</td>
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