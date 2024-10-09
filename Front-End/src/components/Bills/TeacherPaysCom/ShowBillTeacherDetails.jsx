import { useEffect, useState } from "react"
import DataServices from "../../../Data/dynamic/DataServices"
import {  thStyle } from "../../Teachers/teacherInformation/TeacherSubjects"
import { useNavigate } from "react-router-dom";
import addSpaceBetweenDigit from "../../Global/globalStyle";

export default function ShowBillTeacherDetails({type}) {

    const gotoStudentBillDetails = useNavigate() ;
    const [searcByName,setSearcByName] = useState('')
    const [teacherDetails,setTeacherDetails] = useState([])

    useEffect(() => {
        DataServices.TeacherInformaion().then( teachers => {
            setTeacherDetails(teachers.map( teacher => {
                return {
                    teacherId : teacher.teacherId , 
                    name : teacher.name , 
                    lastName : teacher.lastName, 
                }
            }))
        })
    } ,[])


    return (
        <>
            <HeaderControal searcByName={searcByName} setSearcByName={setSearcByName} />
            <div style={{backgroundColor: '#f3f1f1d7' , padding: '10px' , paddingTop: '20px' , borderRadius: '10px' , marginTop: '10px'}}>
                <table>
                    <thead  style={{position: 'relative' , top: '-10px' }}>                    
                        <tr>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Name </th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Total</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Paid</th>
                            <th style={{...thStyle,border: 'none' , padding: '15px' }}>Required</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            teacherDetails.map( (teacher,index) => {              
                                    
                                    const fullName = teacher.name + ' ' + teacher.lastName ;
                                    if(fullName.toLowerCase().includes(searcByName.toLowerCase()) == false ) return
                                    return <tr style={{ textAlign: 'center' ,cursor:'pointer'}} className="hovering-row" key={index} onClick={()=>{
                                        gotoStudentBillDetails(`/TeachersSalaries/TeacherBillDetails/${teacher.teacherId}`,{state:{type: type , fullName:fullName }})
                                    }} ><TeacherBillInfo teacher={teacher} /></tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}


function TeacherBillInfo({teacher}) {

    const { teacherId , name , lastName } = teacher
    const [teacherBillsDetails,setTeacherBillsDetails] = useState({
        "paid": 0,
        "required": 0,
        "total": 0
    })

    useEffect(() => {
        DataServices.ShowTeacherBillBalanc(teacherId).then( teacherBills => {
            setTeacherBillsDetails(teacherBills)
        })
    } ,[])
    
    return (
            <>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>
                    {name + ' ' + lastName}
                </td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>
                    {addSpaceBetweenDigit(teacherBillsDetails.total) }
                </td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>
                    {addSpaceBetweenDigit(teacherBillsDetails.paid) }
                </td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>
                    {addSpaceBetweenDigit(teacherBillsDetails.required) }
                </td>
            </>
    )
}

export function HeaderControal({searcByName,setSearcByName}) {

    return (
        <div  style={{ marginTop: "20px", marginBottom: "10px"}}>
            <form
                action=""
                style={{
                width: "",
                padding: "10px 0 ",
                borderRadius: "5px",
                backgroundColor: "#ddd",
                display: "flex",
                alignItems: "center",
                }}
            >
                <i
                className="bi bi-search"
                style={{ margin: "0 10px", color: "gray", fontWeight: "bold" }}
                ></i>
                <input
                type="search"
                id="search"
                style={{
                    backgroundColor: "transparent",
                    fontWeight: "500",
                    color: "gray",
                    width: '100%'
                }}
                placeholder="Search Students..."
                value={searcByName || ''}
                onChange={(e) => {setSearcByName(e.target.value)}}
                />
                <button
                style={{
                    padding: "3px 20px",
                    margin: "0px 10px",
                    border: "none",
                    color: "white",
                    backgroundColor: "#066599",
                    borderRadius: "2.4px",
                    display: 'block',
                    marginLeft: 'auto'
                }}
                >
                Search
                </button>
            </form>
        </div>
    )
}




