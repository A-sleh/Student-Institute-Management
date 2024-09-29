import { useEffect, useState } from "react"
import DataServices from "../../../Data/dynamic/DataServices";
import { tBStyle, thStyle } from "./TeacherSubjects";
import addSpaceBetweenDigit from "../../Global/globalStyle";
import { format } from "date-fns";

export default function TeacherBills({teacherId}) {

    const [teacherBills,setTeacherBills] = useState([]) ; 
    useEffect(() => {
        DataServices.ShowTeacherBillsDetails(teacherId).then( Bills => {
            setTeacherBills(Bills)
        })
    } ,[])

    return(
        <div style={{width: '100%' , marginBottom: '20px'}}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Teacher Bills</span>
            <div style={{ padding: '15px 8px' , borderRadius: ' 0 0 5px 5px' , background: '#f3f1f1d7' }}>
                <table >
                    <thead >                    
                        <tr >
                            <th style={thStyle}>Count</th>
                            <th style={thStyle}>Bill Number</th>
                            <th style={thStyle}>Amount</th>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Note</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            teacherBills.map((bill,index) => {
                                const {billNo , amount , date , note} = bill
                                return  <tr >
                                    <td style={tBStyle}>{index + 1}</td>
                                    <td style={tBStyle}>{billNo}</td>
                                    <td style={tBStyle}>{ addSpaceBetweenDigit(amount)}</td>
                                    <td style={tBStyle}>{format(new Date(date) ,'yyyy / MM / dd')}</td>
                                    <td style={tBStyle}>{note}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>    
    )
}