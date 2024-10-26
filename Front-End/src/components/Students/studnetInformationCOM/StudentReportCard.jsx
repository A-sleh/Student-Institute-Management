import { useState } from "react"
import DataServices from "../../../Data/dynamic/DataServices"
import { theadThStyle } from "../../Global/globalStyle"
import { HeightContainerAnimation } from "../../Tests/CreateTestTools/EmentsStyle"

export default function StudentReportCard({studdentId,selectedReport,setSelectedReport}) {

    const [studentReports,setStudentReports] = useState([])
    DataServices.ShowAllClassReports(1).then( reports => {
        setStudentReports(reports)
    })

    const data = [
        {
            reportId : 1,
            reportTitle : 'The First Report' ,
            reportDate : '2024 / 9 / 1',
            mark : '2300' , 
            totalMark: '2600' , 
        },
        {
            reportId : 2,
            reportTitle : 'The Second Reports' ,
            reportDate : '2024 / 10 / 15',
            mark : '2200' , 
            totalMark: '2700' , 
        },
        {
            reportId : 3,
            reportTitle : 'The Third Report' ,
            reportDate : '2024 / 9 / 20',
            mark : '2000' , 
            totalMark: '2500' , 
        },
    ] 

    function handleReportClicked(reportId,reportTitle) {

        // if the user click on the report twice we will remove it in the second once he clicked
        
        if(selectedReport != null && reportId == selectedReport.reportId ) {
            setSelectedReport(null)
            return
        }
        setSelectedReport({
            reportId,
            reportTitle
        })
    }


    return (
        <div style={{width: '100%' , display: 'flex' , flexDirection: 'column' , position: 'relative' }}>
            <span style={{padding: '3px 10px' , borderRadius: '5px 5px 0 0 ' , backgroundColor: '#066599' , color: 'white' , width: '100%' , display: 'block' , marginBottom: '10px'}}>Student Reports</span>
            <div style={{ padding: '15px 8px 0 8px' , borderRadius: '0 0 5px 5px' , background: '#f3f1f1d7' ,flex: '1'}}>
                <table >
                <thead >
                    <tr>
                        <th style={theadThStyle} >
                            <span style={{ marginLeft: "5px" }} className="thead-cell"></span>
                        </th>
                        <th style={theadThStyle} >
                            <span style={{ marginLeft: "5px" }} className="thead-cell">Report Title</span>
                        </th>
                        <th style={theadThStyle} >
                            <span style={{ marginLeft: "5px" }} className="thead-cell">Report Date</span>
                        </th>
                        <th style={theadThStyle} >
                            <span style={{ marginLeft: "5px" }} className="thead-cell">Mark</span>
                        </th>
                        <th style={theadThStyle} >
                            <span style={{ marginLeft: "5px" }} className="thead-cell">Total Mark</span>
                        </th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor: "white"}}>
                    {
                        data.map( (report,index) => {
                            const {reportId,reportTitle , reportDate , mark , totalMark } = report
                            return <tr onClick={()=>{handleReportClicked(reportId,reportTitle)}} style={{cursor: 'pointer',backgroundColor: selectedReport == null ? 'transparent': selectedReport.reportId == reportId ? '#0565992f': 'transparent'}}>
                                <td style={{backgroundColor: '#05659929',color: '#056699',border: 'none',padding: '7px', fontSize: '13px' , fontWeight: 'bold' ,width: '10%'}} >{index + 1 }</td>
                                <td style={{border: 'none',padding: '7px', fontSize: '13px' , fontWeight: 'bold' }}>{reportTitle}</td>
                                <td style={{border: 'none',padding: '7px', fontSize: '13px' , fontWeight: 'bold' }} >{reportDate}</td>
                                <td style={{border: 'none',padding: '7px', fontSize: '13px' , fontWeight: 'bold' }} >{mark}</td>
                                <td style={{border: 'none',padding: '7px', fontSize: '13px' , fontWeight: 'bold' }} >{totalMark}</td>
                            </tr>
                        })
                    }
                </tbody>
                </table>
            </div>  
        </div>
    )
}