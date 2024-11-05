import useClassGrade from "../../../hooks/useClassGrade"

export default function SubHeaderFilterClassByGrade({setSelectedGrade}) {

    const [classesGrade] = useClassGrade()

    return (
        <select onChange={(e)=>setSelectedGrade(e.target.value)} style={{textTransform:'uppercase', padding: "8px 5px",color: '#066599',borderRadius: "5px",backgroundColor: "#ddd", fontWeight: '500' , border: 'none',width: '280px' , outline: 'none',cursor: 'pointer' , fontSize: '1em'}}>
            {
                classesGrade.map( grade => {
                    return <option value={grade} >{grade}</option>
                })
            }
        </select>
    )
}