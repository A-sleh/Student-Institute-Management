import { useEffect, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"

export default function ShowAllReport({selectedReport,setSelectedReport}) {

    const [reports,setReports] = useState([])
    useEffect(() => {
        DataServices.ShowAllNativeReports().then( reports => {
            setReports(reports) ;
        })
    } ,[])

    

    return (
        <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px',gap: '20px' , padding: '10px' ,paddingTop: '4px', margin: '10px 0' ,display: 'flex'}}>
            {
                reports.map( report => {
                    return <ReportCard report={report} />
                })
            }
        </div>
    )
}

function ReportCard({report}) {

    const {reportTitle,finishDate} = report

    return (
        <div style={{display: 'flex' , gap: '20px' , minWidth: '140px', padding: '10px' , alignItems: 'center' , backgroundColor: 'white'}}>
            <span>{reportTitle}</span>
            {
                finishDate == null ? 
                    <span style={{padding: '5px' ,borderRadius: '3px', backgroundColor: '#03aa35ee' ,fontSize: '14px', color: 'white'}}>completed</span>
                :
                    <span style={{padding: '5px' ,borderRadius: '3px', backgroundColor: '#e40000ec' ,fontSize: '14px', color: 'white'}}>pending</span>
            }
        </div>
    )
}

