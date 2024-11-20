
import DataServices from "../Data/dynamic/DataServices"
import { useEffect, useState } from "react"

export default function useReportOfClassStatistics(classId,classTitle) {
    
    const [reports,setReports] = useState([])
    const [reportsDetails,setReportsDetails] = useState([])

    async function ExamAndQuizAvrageOfEachReports(reports) {

        let reportsDetails = []
        return new Promise( resolve => {
                reports.map( async (report) => {
                    const reprotExamAvg = await DataServices.ShowExamAvarageInCurrentClassReport(report.reportId,classId)
                    const reprotQuizAvg = await DataServices.ShowQuizAvarageInCurrentClassReport(report.reportId,classId)
                
                    reportsDetails.push({...report ,classId,quizAvg :reprotQuizAvg[0].Average || 0, examAvg: reprotExamAvg[0].Average || 0 ,classTitle})

                    if(reports.length == reportsDetails.length ) {
                        resolve(reportsDetails)
                    }
                })
        })
    }

    useEffect(() => {
        DataServices.ShowAllClassReports(classId).then( reportsRES => {
            setReports(reportsRES)
        })
    },[])

    useEffect(() => {
        ExamAndQuizAvrageOfEachReports(reports).then( reportsRes => {
            setReportsDetails(reportsRes)
        })
    } ,[reports])
    
    return [reportsDetails]
}