import { useEffect, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices";
import ClassesTable from "./ClassesTable";
import { HeaderControal } from "../../../Bills/TeacherPaysCom/ShowBillTeacherDetails";

export default function RecevingMarkes() {

    const [classesGrade,setClassesGrade] = useState([]) ; 
    const [selectedGrade,setSelectedGrade] = useState('bachelor')
    const [search,setSearch] = useState('')
    
    useEffect(() => {
        DataServices.ShowAllSubject().then( subjects => {
            let gradesObj = new Set() , gradeArray = [] ;

            subjects.map( subjects => {
                gradesObj.add(subjects.grade)
            })
            gradesObj.forEach(itemt => {
                gradeArray.push(itemt)
            })
            setClassesGrade(gradeArray)
        })
    } , [])

    return (
        <div style={{display: 'flex' , flexDirection: 'column'}}>
            <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
                <select onChange={(e)=>setSelectedGrade(e.target.value)} style={{textTransform:'uppercase', padding: "8px 5px",color: '#066599',borderRadius: "5px",backgroundColor: "#ddd", fontWeight: '500' , border: 'none',width: '30%' , outline: 'none',cursor: 'pointer' , fontSize: '1em'}}>
                    {
                        classesGrade.map( grade => {
                            return <option value={grade} >{grade}</option>
                        })
                    }
                </select>
                <div style={{width: '30%'}}>
                    <HeaderControal searcByName={search} setSearcByName={setSearch} />
                </div>
            </div>
            <ClassesTable selectedGrade={selectedGrade} search={search}/> 
        </div>
    )
}