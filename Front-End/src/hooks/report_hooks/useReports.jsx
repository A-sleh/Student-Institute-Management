
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useReports(gradeId,filterReport,reportDate) {


    const [reports,setReports] = useState([])
    const [filteringReports,setFilteringReports] = useState([])
    
    function filterReportFn(reports) {

        return reports.filter( report => {
            return (((new Date(reportDate) - new Date(report.startDate)) > 0 || reportDate == '') && ((report.reportTitle?.toLowerCase().includes(filterReport?.toLowerCase())) || report == '') )
        })
    }

    useEffect(() => {

        if(gradeId == '' || gradeId == undefined ) return
        DataServices.ShowAllReportsFilteredByGrade(gradeId).then( reports => {
            setReports(reports) ;
            setFilteringReports(filterReportFn(reports))
        })
    } ,[gradeId])

    useEffect(() => {

        if(filterReport == '' && reportDate == '') return 
        setFilteringReports(filterReportFn(reports))

    } ,[filterReport,reportDate])

    return [filteringReports,reports]   
}