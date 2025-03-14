import { useEffect } from "react"
import useGetAllGrade from "../../../hooks/Grade_hooks/useGetAllGrade"

export default function SubHeaderFilterClassByGrade({setSelectedGrade}) {

    const [grades] = useGetAllGrade()

    useEffect(() => {
        setSelectedGrade(grades[0])
    }, [grades])

    return (
        <select onChange={(e)=>setSelectedGrade(JSON.parse(decodeURIComponent(e.target.value)))} style={{textTransform:'uppercase', padding: "8px 5px",color: '#066599',borderRadius: "5px",backgroundColor: "#ddd", fontWeight: '500' , border: 'none',width: '180px',marginRight: '10px' , outline: 'none',cursor: 'pointer' , fontSize: '1em',height: 'fit-content'}}>
            {
                grades.map( (grade,index) => {
                    return <option key={index} value={encodeURIComponent(JSON.stringify(grade))} >{grade.grade}</option>
                })
            }
        </select>
    )
}