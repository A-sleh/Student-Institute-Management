import { useEffect } from "react"
import useClassGrade from "../../../hooks/class_hooks/useClassGrade"
import { useSelector } from "react-redux"
import { ARABIC } from "../../../Redux/actions/type"


export function FilterClassByGradeI({selectedClass,setSelectedClass,gradeId}) {

    const [classes] = useClassGrade(gradeId)
    const {currentLange} = useSelector( state => state.language)

    useEffect(() => {
        setSelectedClass('all')
    }, [gradeId])
    
    return (
        <select value={encodeURIComponent(JSON.stringify(selectedClass))} onChange={(e)=>setSelectedClass(JSON.parse(decodeURIComponent(e.target.value)))} style={{textTransform:'uppercase', padding: "8px 5px",color: '#066599',borderRadius: "5px",backgroundColor: "#ddd", fontWeight: '500' , border: 'none',width: '280px' , outline: 'none',cursor: 'pointer' , fontSize: '1em',height: 'fit-content'}}>
            <option key={0} value={encodeURIComponent(JSON.stringify('all'))} >{ currentLange == ARABIC ? 'جميع الصفوف':'All'}</option>
            {
                classes.map( (Class,index) => {
                    if(Class?.students?.length == 0 ) return 
                    return <option key={index + 1} value={encodeURIComponent(JSON.stringify(Class))} >{Class.title}</option>
                })
            }
        </select>
    )
}