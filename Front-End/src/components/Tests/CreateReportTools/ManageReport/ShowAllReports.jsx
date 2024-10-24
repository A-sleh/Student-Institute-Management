import { useEffect, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import { format } from "date-fns";
import { HeaderControal } from "../../../Bills/TeacherPaysCom/ShowBillTeacherDetails";
import { FormInputFieldStyle } from "../../CreateTestTools/EmentsStyle";

export default function ShowAllReport({selectedReport,setSelectedReport}) {

    const [reports,setReports] = useState([])
    const [search,setSearch] = useState('')
    const [searchByDate,setSearchByDate] = useState('')
    useEffect(() => {
        DataServices.ShowAllNativeReports().then( reports => {
            setReports(reports) ;
        })
    } ,[])

    

    return (
        <>
            <div style={{backgroundColor:'#f3f1f1d7' ,borderRadius: '5px', padding: '10px' ,marginBottom: '10px'}}>
                <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: 'center'}}>
                    <FormInputFieldStyle type={'date'} style={{width: '30%'}} value={searchByDate} onChange={(e)=>{setSearchByDate(e.target.value)}}/>
                    <h3 style={{padding: '2px' , color: '#056699' , fontWeight: '600' , textAlign: '',borderRadius: '0 0 10px  10px'}}>REFPORTS</h3>
                    <HeaderControal searcByName={search}setSearcByName={setSearch} style={{width: '30%'}}/>
                </div>
                <div style={{display: 'grid',gap: '10px' , gridTemplateColumns:"auto auto", backgroundColor: 'white' ,padding: '10px'}}>
                    {
                        reports.map( (report,index) => {
                            const {reportTitle,startDate} = report ;
                            if( (new Date(startDate) - new Date(searchByDate)) < 0 ) return ;
                            
                            if(!(reportTitle.toLowerCase().includes(search.toLowerCase()))) return
                            return <ReportCard report={report} selectedReport={selectedReport}setSelectedReport={setSelectedReport} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

function ReportCard({report,selectedReport,setSelectedReport}) {

    const {reportTitle,startDate,reportId} = report


    return (
        <div onClick={()=>{setSelectedReport(reportId)}} style={{display: 'flex' , gap: '20px' , minWidth: '140px', padding: '8px' , justifyContent: 'space-between',alignItems: 'center' , backgroundColor: selectedReport == reportId ?  '#056699': '#f3f1f1d7'   , cursor: 'pointer',borderLeft: selectedReport == reportId ? '4px solid #f3f1f1d7' : '4px solid #056699' , borderRadius: '3px' , transition: '.4s' }}>
            <span style={{padding: '2px 10px' , borderRadius: '3px' , backgroundColor: 'white'}}>{reportTitle}</span>
            <span  style={{color: selectedReport == reportId ? 'white': 'black' }}>{format(new Date(startDate), "yyyy / MM / dd")}</span>
        </div>
    )
}

