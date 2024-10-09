import { useEffect, useState } from "react"
import { useParams,useLocation, useNavigate} from "react-router-dom"
import DataServices from "../../../../Data/dynamic/DataServices"
import { tBStyle, thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"
import { format } from "date-fns"
import { HeaderControal } from "../../../Bills/TeacherPaysCom/ShowBillTeacherDetails"

export default function ClassesTestDetails() {

    const testId = useParams().testId
    const testDetails = useLocation().state
    const [classes,setClasses] = useState([]) 
    const gotoStudentsTestDetails = useNavigate()
    const [search,setSearch] = useState('')
    
    useEffect(() => {
        DataServices.ShowClassesWhichDoTheTest(testId).then( classes => {
            setClasses(classes)
        })
    } ,[])

    return (
        <>
            <HeaderToShowTestInfo testDetails={testDetails} />
            <HeaderControal searcByName={search} setSearcByName={setSearch} />
            <h2 style={{margin: '20px 0 5px 0', padding: '0' , lineHeight: '20px'}}>The classes that made the <span style={{color: '#066599' , textTransform: 'uppercase'}}>{testDetails.testType}</span></h2>
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
                                    <tr className="hovering-row" style={{cursor: 'pointer'}} onClick={()=>{gotoStudentsTestDetails(`/Test/StudentTestDetails/${Class.classId}`,{state: testDetails})}}>
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
            <button onClick={()=>{gotoStudentsTestDetails(-1)} } style={{padding: '4px 20px',cursor: 'pointer' , color: 'white' , backgroundColor: 'red' , border: 'none' , outline: 'none' , borderRadius: '2px' , margin: '10px 0'}}>Back</button>
        </>
    )
}

export function HeaderToShowTestInfo({testDetails}) {

    const {testType,subject,grade,date} = testDetails
    return (
        <div style={{backgroundColor: '#066599',padding: '20px 10px 0 10px' , textAlign: 'left' , color: 'white' , fontSize: '1.6em'}}>
            <span style={{width: '100%'}}>{grade} / {subject} / {testType} <span style={{float: 'right'}}> {format(new Date(date),'yyyy / MM / dd')}</span></span>
        </div>
    )
}