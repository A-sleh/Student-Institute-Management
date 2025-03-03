
import DataServices from "../../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useReports(filterReport,reportDate) {


    const [reports,setReports] = useState([])
    const [filteringReports,setFilteringReports] = useState([])
    
    function filterReportFn(reports) {

        return reports.filter( report => {
            return (((new Date(reportDate) - new Date(report.startDate)) > 0 || reportDate == '') && ((report.reportTitle?.toLowerCase().includes(filterReport?.toLowerCase())) || report == '') )
        })
    }

    useEffect(() => {
        DataServices.ShowAllNativeReports().then( reports => {
            setReports(reports) ;
            setFilteringReports(filterReportFn(reports))
        })
    } ,[])

    useEffect(() => {

        if(filterReport == '' && reportDate == '') return 
        setFilteringReports(filterReportFn(reports))

    } ,[filterReport,reportDate])

    return [filteringReports,reports]   
}