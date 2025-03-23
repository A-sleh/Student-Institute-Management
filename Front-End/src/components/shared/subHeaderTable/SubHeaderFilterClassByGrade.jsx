import { useEffect } from "react"
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade"
import { useDispatch, useSelector } from "react-redux"
import { CHANGE_GRADE } from "../../../Redux/actions/type"

export default function SubHeaderFilterClassByGrade() {

    const {grade} = useSelector(state => state.grade)
    const changeGrade = useDispatch()
    const [grades] = useGetAllGrade()

    useEffect(() => {
        changeGrade({
            type: CHANGE_GRADE ,
            payload: grade == null ? grades[0] : grade
        })
    }, [grades])

    function handleGradeChanged(grade) {
        changeGrade({
            type: CHANGE_GRADE ,
            payload: JSON.parse(decodeURIComponent(grade))
        })
    }

    return (
        <select onChange={(e)=>handleGradeChanged(e.target.value)} value={encodeURIComponent(JSON.stringify(grade))} style={{textTransform:'uppercase', padding: "8px 5px",color: '#066599',borderRadius: "5px",backgroundColor: "#ddd", fontWeight: '500' , border: 'none',width: '180px',marginRight: '10px' , outline: 'none',cursor: 'pointer' , fontSize: '1em',height: 'fit-content'}}>
            {
                grades.map( (grade,index) => {
                    return <option key={index} value={encodeURIComponent(JSON.stringify(grade))} >{grade.grade}</option>
                })
            }
        </select>
    )
}