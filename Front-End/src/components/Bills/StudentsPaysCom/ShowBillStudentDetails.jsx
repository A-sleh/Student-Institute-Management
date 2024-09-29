import { useEffect, useState } from "react"
import DataServices from "../../../Data/dynamic/DataServices"
import {  thStyle } from "../../Teachers/teacherInformation/TeacherSubjects"
import { useNavigate } from "react-router-dom";
import addSpaceBetweenDigit from "../../Global/globalStyle";

export default function ShowBillStudentDetails({type}) {

    const gotoStudentBillDetails = useNavigate() ;
    const [searcByName,setSearcByName] = useState('')
    const [fileterByClass,setFileterByClass] = useState('All')
    const [studentDetails,setStudentDetails] = useState([])
    useEffect(() => {
        DataServices.StudentsInformaion().then( students => {
            setStudentDetails(students.map( student => {
                return {
                    name : student.name , 
                    lastName : student.lastName , 
                    studentId : student.studentId, 
                    classId : student.class?.classId
                }
            }))
        })
    } ,[])


    return (
        <>
            <HeaderControal searcByName={searcByName} setSearcByName={setSearcByName} fileterByClass={fileterByClass} setFileterByClass={setFileterByClass} />
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
                            studentDetails.map( (student,index) => {              
                                    if( fileterByClass != 'All' && fileterByClass != student.classId ) return
                                    const fullName = student.name + ' ' + student.lastName ;
                                    if(fullName.toLowerCase().includes(searcByName.toLowerCase()) == false ) return

                                    return <tr style={{ textAlign: 'center' ,cursor:'pointer'}} key={index} onClick={()=>{
                                        gotoStudentBillDetails(`/StudentsPays/StudentBillDetails/${student.studentId}`,{state: type})
                                    }} ><StudentBillInfo student={student} /></tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}




function StudentBillInfo({student}) {

    const { studentId , name , lastName } = student
    const [studnetBillDetails,setStudnetBillDetails] = useState({
        "paid": 0,
        "required": 0,
        "total": 0
    })

    useEffect(() => {
        DataServices.ShowStudentBillBalanc(studentId).then( studentBills => {
            setStudnetBillDetails(studentBills)
        })
    } ,[])
    
    return (
            <>
                <td style={{padding: '15px' , backgroundColor: 'white' , margin: '5px 0' , border: 'none' }}>
                    {name + ' ' + lastName}
                </td>
                <td style={{padding: '15px' , backgroundColor: 'white' , margin: '5px 0' , border: 'none' }}>
                    {addSpaceBetweenDigit(studnetBillDetails.total) }
                </td>
                <td style={{padding: '15px' , backgroundColor: 'white' , margin: '5px 0' , border: 'none' }}>
                    {addSpaceBetweenDigit(studnetBillDetails.paid) }
                </td>
                <td style={{padding: '15px' , backgroundColor: 'white' , margin: '5px 0' , border: 'none' }}>
                    {addSpaceBetweenDigit(studnetBillDetails.required) }
                </td>
            </>
    )
}

function HeaderControal({searcByName,setSearcByName,setFileterByClass,fileterByClass}) {

    const [allClasses,setAllClasses] = useState([]);
    const [classBalance,setClassBalance] = useState({
        total : 0 , 
        paid: 0 ,
        remaining: 0
    });
    
    useEffect(() => {
        DataServices.showCalsses().then( Classes => {
            setAllClasses(Classes.map( Class => {
                return {
                    classId : Class.classId ,
                    title : Class.title
                }
            }))
        })
        if(fileterByClass != 'All') {
            DataServices.ShowClassBillsDetails(fileterByClass).then( details => {
                setClassBalance(details)
            })
        } 
    },[fileterByClass])

    return (
        <div  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", marginBottom: "10px"}}>
            <div style={{position: 'relative'}}>
                <h3 style={{position: 'absolute',color: 'black',fontWeight: '500' , top : '-15px', left: '8px' , fontSize: '15px' , backgroundColor: 'white' , padding: '0px 5px' , borderRadius: '5px'}}>Filter by class </h3>
                <select
                    value={fileterByClass}
                    onChange={(value) => setFileterByClass(value.target.value)}
                    style={{padding: "10px",borderRadius: "5px",backgroundColor: "#ddd" , border: 'none' , outline: 'none', color: "#066599", fontWeight: "400" , minWidth: '200px'}}
                    >
                    <option value={'All'} style={{ padding: "20px" , color: 'black' }}>All</option>
                    {allClasses.map((Class, index) => (
                        <option
                            value={Class.classId}
                            key={index}
                            style={{ padding: "20px" , color: 'black' }}
                        >
                        {Class.title}
                        </option>
                    ))}
                </select>
            </div>
            {
                fileterByClass != 'All' &&
                <div style={{padding: '12px 5px 5px 5px' , position: 'relative' , backgroundColor: '#ddd' , borderRadius: '5px' , display: 'grid' , gap: '10px' , gridTemplateColumns: 'auto auto auto' }}>
                    {/* <h3 style={{position: 'absolute',color: 'black',fontWeight: '500' , top : '-15px', left: '8px' , fontSize: '15px' , backgroundColor: 'white' , padding: '0px 5px' , borderRadius: '5px'}}>class information </h3> */}
                    <div style={{position: 'relative' , padding: '5px' , borderRadius: '3px' , backgroundColor: 'white' , minWidth: '10em' }}>
                        <div style={{position: 'absolute',color: '#066599' ,right: 0, bottom: '50%' , fontWeight: '600' , backgroundColor: 'white' , padding: '0px 3px 0 3px' , borderRadius: '5px'}}>Total</div>
                        <span style={{fontSize: '14px', fontWeight: 'bold'}}>{addSpaceBetweenDigit(classBalance.total)}</span>
                    </div>
                    <div style={{position: 'relative', padding: '5px' , borderRadius: '3px' , backgroundColor: 'white', minWidth: '10em'}}>
                        <div style={{position: 'absolute',color: '#066599' , right: 0,bottom: '50%' , fontWeight: '600' , backgroundColor: 'white' , padding: '0px 3px 0 3px' , borderRadius: '5px'}}>Paid</div>
                        <span style={{fontSize: '14px', fontWeight: 'bold'}}>{addSpaceBetweenDigit(classBalance.paid)}</span>
                    </div>
                    <div style={{position: 'relative' , padding: '5px' , borderRadius: '3px' , backgroundColor: 'white', minWidth: '10em'}}>
                        <div style={{position: 'absolute',color: '#066599' , right: 0,bottom: '50%' , fontWeight: '600' , backgroundColor: 'white' , padding: '0px 3px 0 3px' , borderRadius: '5px'}}>Remaining</div>
                        <span style={{fontSize: '14px', fontWeight: 'bold'}} >{addSpaceBetweenDigit(classBalance.remaining)}</span>
                    </div>
                </div>
            }
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
                }}
                >
                Search
                </button>
            </form>
        </div>
    )
}




