
import RecevingMarkes from "../AssineMarke/RecevingMarkes";

export default function ShowAllTest() {

    return (
        <>
            <RecevingMarkes type={'Show All Test'}/>
        </>
    )
}

export function HeaderControlOnTestClasses(props) {

    const {grade,testType,filterBySubject,setGrade,setTestType,setFilterBySubject,subjects} = props

    return (
        <div style={{display: 'flex',gap:'10px' ,backgroundColor: '#ddd' , padding: '4px 10px' , borderRadius: '4px' , marginBottom: '10px' }}>
            <div style={{width: '100%'}}>
                <h1 style={{fontSize: '18px' , marginRight: '10px'}}>Selcet Grade</h1>
                <select value={grade} onChange={(e)=>{setGrade(e.target.value)}} style={{width: '100%',padding : '4px 10px' ,border: 'none' , outline: 'none' , fontSize: '18px' , marginBottom: '10px'}}>
                    <option value="bachelor" style={{fontSize: '15px' }}>Bachelor</option>
                    <option value="ninth" style={{fontSize: '15px' }}>Ninth</option>
                    { props.type != 'manage' &&<option value="All" style={{fontSize: '15px' }}>All</option>}
                </select>
            </div>
            <div style={{width: '100%'}}>
                <h1 style={{fontSize: '18px' , marginRight: '10px'}}>Test Type</h1>
                <select value={testType} onChange={(e)=>{setTestType(e.target.value)}} style={{width: '100%',padding : '4px 10px' ,border: 'none' , outline: 'none' , fontSize: '18px' , marginBottom: '10px'}}>
                    <option value="All" style={{fontSize: '15px' }}>All</option>
                    <option value="FINAL" style={{fontSize: '15px' }}>FINAL</option>
                    <option value="REVISION" style={{fontSize: '15px' }}>REVISION</option>
                    <option value="EXAM" style={{fontSize: '15px' }}>EXAM</option>
                    <option value="QUIZ" style={{fontSize: '15px' }}>QUIZ</option>
                </select>
            </div>
            <div style={{width: '100%'}}>
                <h1 style={{fontSize: '18px' , marginRight: '10px'}}>Subject</h1>
                <select value={filterBySubject} onChange={(e)=>{setFilterBySubject(e.target.value)}} style={{width: '100%',padding : '4px 10px' ,border: 'none' , outline: 'none' , fontSize: '18px' , marginBottom: '10px'}}>
                    <option value="All" style={{fontSize: '15px' }}>All</option>
                    {
                        subjects.map( subject => {
                            return <option value={subject.subject} style={{fontSize: '15px', display: 'flex'  }}> <span> {subject.subject}</span> <span style={{alignSelf: 'flex-start'}}> / {subject.grade}</span> </option>
                        })
                    }
                </select>   
            </div>
        </div>
    )
}