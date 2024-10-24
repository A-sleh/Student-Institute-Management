import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DataServices from "../../../../Data/dynamic/DataServices"
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"

export default function ShowAllClasses({selectedGrade,search,url,type}) {
    const [classes,setClasses] = useState([])
    const goto = useNavigate()

    useEffect(() => {
        DataServices.showCalsses().then( classes => {
            setClasses(
                classes.filter( Class => {
                    return Class.grade.toLowerCase() == selectedGrade.toLowerCase()
                })
            )
        })
    } ,[selectedGrade,search])

    return (
        <>
            <h3 style={{padding: '5px',fontWeight: '400' , backgroundColor: '#066599' , color: 'white' , textAlign: 'center'}}>Classes</h3>
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
                <table>
                    <thead  style={{position: 'relative' , top: '-10px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}></th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Class Title</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Gender</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Grade</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map( (Class,index) => {  
                                const {title,gender,grade,students,classId} = Class  
                                if( !title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))return                   
                                return (
                                    <tr className="hovering-row" style={{cursor: 'pointer'}} onClick={()=>{goto(`${url}/${classId}`,{state:{classTitle : title, grade: grade}})}}>
                                        <td style={{padding: '15px' , margin: '5px 0' , border: 'none' , color: 'white' , backgroundColor: '#056599b3',width: '15%',borderBottom: '1px solid white'}}>{index + 1}</td>
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