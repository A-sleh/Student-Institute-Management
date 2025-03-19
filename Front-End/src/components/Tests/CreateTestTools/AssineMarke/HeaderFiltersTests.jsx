/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { useContext } from "react"
import { FiltersSharedState } from "./TestClassCurrent"
import { HeaderFilterTestsStyle, InputStyle } from "../../../shared/style/styleTag"
import { HeaderFiltersTestsTEXT } from "../../../../Data/static/test/CreateTestTools/AssineMarke/HeaderFiltersTestsTEXT"
import { useSelector } from "react-redux"
import { ARABIC } from "../../../../Redux/actions/type"

export default function HeaderFiltersTests() {

    const {currentLange} = useSelector( state => state.language)
    const {testStartingDateTitle ,testTypeTitle ,examType ,quizType ,allType ,subjectTitle } = HeaderFiltersTestsTEXT[currentLange]
    const { testType, setTestType, filterBySubject ,setFilterBySubject ,subjects ,dateSearch ,setDateSearch } = useContext(FiltersSharedState)

    return(
        <HeaderFilterTestsStyle>
            <div >
                <h1 style={{fontSize: '18px' , marginRight: '10px' , marginBottom: currentLange == ARABIC ? '6px':'0' }}>{testStartingDateTitle}</h1>
                <InputStyle type="date" value={dateSearch} onChange={(e)=>{setDateSearch(e.target.value)}} style={{width: '100%',backgroundColor: 'white'}}/>
            </div>
            <div >
                <h1 style={{fontSize: '18px' , marginRight: '10px' , marginBottom: currentLange == ARABIC ? '6px':'0' }}>{testTypeTitle}</h1>
                <select value={testType} onChange={(e)=>{setTestType(e.target.value)}} style={{width: '100%',padding : '8px 15px' ,border: 'none' , outline: 'none' , fontSize: '18px' , marginBottom: '10px'}}>
                    <option value="All" style={{fontSize: '15px' }}>{allType}</option>
                    <option value="EXAM" style={{fontSize: '15px' }}>{examType}</option>
                    <option value="QUIZ" style={{fontSize: '15px' }}>{quizType}</option>
                </select>
            </div>
            <div >
                <h1 style={{fontSize: '18px' , marginRight: '10px' , marginBottom: currentLange == ARABIC ? '6px':'0' }}>{subjectTitle}</h1>
                <select value={filterBySubject} onChange={(e)=>{setFilterBySubject(e.target.value)}} style={{width: '100%',padding : '8px 15px' ,border: 'none' , outline: 'none' , fontSize: '18px' , marginBottom: '10px'}}>
                    <option value="All" style={{fontSize: '15px' }}>{allType}</option>
                    {
                        subjects.map( (subject,index) => {
                            return <option key={index} value={subject.subject} style={{fontSize: '15px', display: 'flex' ,cursor: 'pointer',fontWeight: '500' }}>{subject.subject}  / {subject.grade} </option>
                        })
                    }
                </select>   
            </div>
        </HeaderFilterTestsStyle>
    )
}