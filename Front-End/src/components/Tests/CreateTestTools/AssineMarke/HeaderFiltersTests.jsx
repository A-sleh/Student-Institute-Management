/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useContext } from "react"
import { FiltersSharedState } from "./TestClassCurrent"
import { InputStyle } from "../../../shared/style/styleTag"

export default function HeaderFiltersTests() {

    const { testType, setTestType, filterBySubject ,setFilterBySubject ,subjects ,dateSearch ,setDateSearch } = useContext(FiltersSharedState)

    return(
        <div style={{display: 'grid',gridTemplateColumns:'repeat(auto-fill,minmax(400px,auto))', gap:'10px' ,backgroundColor: '#ddd' , padding: '4px 10px' , borderRadius: '4px' , marginBottom: '10px' ,flexWrap: 'wrap'}}>
            <div >
                <h1 style={{fontSize: '18px' , marginRight: '10px'}}>Test start from date</h1>
                <InputStyle type="date" value={dateSearch} onChange={(e)=>{setDateSearch(e.target.value)}} style={{width: '100%',backgroundColor: 'white'}}/>
            </div>
            <div >
                <h1 style={{fontSize: '18px' , marginRight: '10px'}}>Test Type</h1>
                <select value={testType} onChange={(e)=>{setTestType(e.target.value)}} style={{width: '100%',padding : '4px 10px' ,border: 'none' , outline: 'none' , fontSize: '18px' , marginBottom: '10px'}}>
                    <option value="All" style={{fontSize: '15px' }}>All</option>
                    <option value="EXAM" style={{fontSize: '15px' }}>EXAM</option>
                    <option value="QUIZ" style={{fontSize: '15px' }}>QUIZ</option>
                </select>
            </div>
            <div >
                <h1 style={{fontSize: '18px' , marginRight: '10px'}}>Subject</h1>
                <select value={filterBySubject} onChange={(e)=>{setFilterBySubject(e.target.value)}} style={{width: '100%',padding : '4px 10px' ,border: 'none' , outline: 'none' , fontSize: '18px' , marginBottom: '10px'}}>
                    <option value="All" style={{fontSize: '15px' }}>All</option>
                    {
                        subjects.map( (subject,index) => {
                            return <option key={index} value={subject.subject} style={{fontSize: '15px', display: 'flex'  }}> {subject.subject} <option style={{alignSelf: 'flex-start'}}> / {subject.grade}</option> </option>
                        })
                    }
                </select>   
            </div>
        </div>
    )
}