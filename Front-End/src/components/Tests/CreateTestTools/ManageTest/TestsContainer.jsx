import { useEffect, useMemo, useRef, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import {  thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"
import { format } from "date-fns"
import { FormInputFieldStyle } from "../EmentsStyle"

export default function TestsContainer({grade,testType,filterBySubject,setRequestData,requestData}) {

    const [tests,setTests] = useState([])
    const [hideTest,setHideTest] = useState(false)
    const [dateSearch,setDateSearch] = useState('')
    useEffect(() => {
        DataServices.ShowAllTests().then(tests=> {
            setTests(tests.filter(test => {
                const {subject} = test
                if((hideTest && test.correctionDate == null)||(dateSearch != '' && ( new Date(dateSearch) - new Date(test.date)) < 0 )) {
                    return
                }
                return (grade.toLocaleLowerCase() == subject.grade.toLocaleLowerCase()) && (testType == 'All' ||  test.testType.toLocaleLowerCase() == testType.toLocaleLowerCase()) && ( filterBySubject == 'All' || filterBySubject.toLocaleLowerCase() == subject.subject.toLocaleLowerCase())
            }))
        })
    },[grade,testType,filterBySubject,hideTest,dateSearch])

    return (
        <div style={{flex: '1'}}>
            <h3 style={{lineHeight: '20px',marginTop: '10px' }} >Tests</h3>
            <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px' , padding: '10px' ,paddingTop: '4px', margin: '10px 0' }}>
                <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center' , padding: '10px' , borderRadius: '4px' , backgroundColor: 'white' , margin: '20px 0' , marginTop: '5px'}}>
                    <h4 style={{cursor: 'pointer',color: hideTest ? '#066599': 'black'  , fontWeight: hideTest ? '500' : '400' , textAlign: 'center'}} onClick={()=>{setHideTest(c => !c)}}>Hide completed tests</h4>
                    <FormInputFieldStyle type="date" value={dateSearch} onChange={(e)=>{setDateSearch(e.target.value)}} style={{width: '40%',borderRadius: '8px'}}/>
                </div>
                <table>
                    <thead  style={{position: 'relative' , top: '-10px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Counter</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Test Type</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Subject</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Grade</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tests.map( (test,i) => {
                                const {testType,date,correctionDate,subject,testId} = test
                                
                                return (
                                    <tr onClick={()=>{setRequestData(c => ({...c,testId}))}} style={{cursor:'pointer', borderLeft: requestData.testId == testId ? '5px solid #066599' : '5px solid transparent',backgroundColor:  requestData.testId == testId ? '#226d9681' : i  % 2 == 0 ? 'white': '' , color:  requestData.testId == testId ? 'white' :''}}>
                                        <td style={{padding: '10px' , margin: '5px 0' , border: 'none' , fontSize: '15px'}}>{i + 1}</td>
                                        <td style={{padding: '10px' , margin: '5px 0' , border: 'none' , fontSize: '15px'}}>{testType}</td>
                                        <td style={{padding: '10px' , margin: '5px 0' , border: 'none' , fontSize: '15px'}}>{subject.subject}</td>
                                        <td style={{padding: '10px' , margin: '5px 0' , border: 'none' , fontSize: '15px'}}>{subject.grade}</td>
                                        <td style={{padding: '10px' , margin: '5px 0' , border: 'none' , fontSize: '15px'}}>{format( new Date(date) ,'yyyy / MM / dd' )}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table> 
            </div>
        </div>
    )
}