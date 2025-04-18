
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { lazy, Suspense, useMemo, useState } from "react"
import { NavigateSubHeaderStyle } from "../../style/styleTage"
import DataServices from "../../../../Data/dynamic/DataServices"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ClassPdfPage from "./ClassPdfPage"
import StudentsPDF from "./StudentsPDF"
import Loader from "../../../Modal/Loader"
import { GoBackBtnStyle, InputStyle } from "../../../shared/style/styleTag"
import Table from "../../../shared/Table"
import useGetClassReportsAvg from "../../../../hooks/class_hooks/useGetClassReportsAvg"
import { REPORTCOLUMNS_2 } from "../columnsTools/reportCOUMN_2"
import { PopupModalTEXT, PrintReportTEXT } from "../../../../Data/static/test/CreateReportTools/PrintReportTEXT"
import { useSelector } from "react-redux"
import { getDateOnly } from "../../../shared/logic/logic"

export default function ClassReportPrint() {
    
    const {currentLange} = useSelector( state => state.language)
    const {downloadPdfBtn} = PopupModalTEXT[currentLange]
    const {reportsTitle ,backBtn,createClassReportBtn ,createStudentsReportBtn} = PrintReportTEXT[currentLange]

    const classDetailsEncode = useLocation().state
    const classDetailsDecode = JSON.parse(decodeURIComponent(classDetailsEncode))
    const [reports] = useGetClassReportsAvg(classDetailsDecode.classId)
    const [searchByDate,setSearchByDate] = useState('')
    const gotoPage = useNavigate()

    // start pdf states
    const GeneratePDF = lazy(() => import('../../../Modal/GeneratePDF'))
    const [generateClassPDF,setGenerateClassPDF] = useState(false)
    const [generateStudentsPDF,setGenerateStudentsPDF] = useState(false)
    const [selectedDataToPrint,setSelectedDataToPrint] = useState([])
    const [pdfTitle,setPdfTitle] = useState('')

    async function handleCreateClassPDFClicked(classDetials,pdfTitle) {
        const {ClassId,ReportId} = classDetials
        const studnetsAvgInTheClass = await DataServices.ShowAllStudentsForCurrentReport(ReportId,ClassId)
        setPdfTitle(pdfTitle)
        setGenerateClassPDF(true)
        setSelectedDataToPrint({...classDetials,students:studnetsAvgInTheClass})
    }

    async function handleCreateStudentsPDFClicked(classDetials,pdfTitle) {
        const {ClassId,ReportId} = classDetials
        const studnetsTestMarksInCurrentReport = await DataServices.GetAllStduentTestsMarkInCurrentReport(ReportId,ClassId,)
        
        setPdfTitle(pdfTitle)
        setGenerateStudentsPDF(true)
        setSelectedDataToPrint({...classDetials,students:studnetsTestMarksInCurrentReport})
    }

    function handlePrintClicked(type) {
        if(type == 'students' ) {
            setTimeout(() => setGenerateStudentsPDF(false) ,500)
        }else {
            setTimeout(() =>setGenerateClassPDF(false),500)
        }
    }

    const TableHeader = useMemo(() => [
        ...REPORTCOLUMNS_2 , 
        {   
            Header: {
                english: 'Action' ,
                arabic: 'طباعة'
            }  ,
            accessor: 'action',
            Cell: ({row}) => {
                const {title ,ReportTitle ,ClassId,ReportId} = row.original
                return (
                    <div>
                        <button onClick={()=> handleCreateClassPDFClicked(row.original,`report_${ReportTitle}_class_${title}`)} style={{textDecoration: 'none', padding: '4px 10px' , color: 'white' , cursor: 'pointer', backgroundColor: '#056699' , outline: 'none' , border: 'none' , borderRadius: '2px'}}>{createClassReportBtn}</button>
                        <button onClick={()=> handleCreateStudentsPDFClicked(row.original,`report_${ReportTitle}_class_${title}_students`)} style={{textDecoration: 'none', padding: '4px 10px' , margin: '0 5px' ,color: 'white' , cursor: 'pointer', backgroundColor: '#056699' , outline: 'none' , border: 'none' , borderRadius: '2px'}}>{createStudentsReportBtn}</button>
                    </div>
                )
            }
        }

    ],[currentLange])

    const filteringReportsByDate = useMemo(() => {
        return reports?.filter( report => {
            if(searchByDate == '') return true
            return ((getDateOnly(searchByDate) - getDateOnly(report?.StartDate)) <= 0 ) 
        })
    },[searchByDate,reports])
    
    return (
        <>  
            {
                generateClassPDF && 
                <Suspense fallback={<Loader />} >
                    <GeneratePDF data={selectedDataToPrint} pdfTitle={pdfTitle} printingType={'class'} setDeleteModal={setGenerateClassPDF} >
                        <PDFDownloadLink onClick={()=>handlePrintClicked('class')} document={<ClassPdfPage data={selectedDataToPrint}  currentLange={currentLange}/>} fileName={pdfTitle +".pdf"} style={{marginRight: '5px',textDecoration: 'none', padding: '1px 10px' , color: 'white' , cursor: 'pointer', backgroundColor: '#056699' , outline: 'none' , border: 'none' , borderRadius: '2px'}}>{downloadPdfBtn}</PDFDownloadLink>
                    </GeneratePDF> 
                </Suspense>
                || 
                generateStudentsPDF && 
                <Suspense fallback={<Loader />}>
                    <GeneratePDF data={selectedDataToPrint} pdfTitle={pdfTitle} printingType={'students'} setDeleteModal={setGenerateStudentsPDF} >
                        <PDFDownloadLink onClick={()=>handlePrintClicked('students')} document={<StudentsPDF data={selectedDataToPrint} currentLange={currentLange}/>} fileName={pdfTitle +".pdf"} style={{marginRight: '5px',textDecoration: 'none', padding: '1px 10px' , color: 'white' , cursor: 'pointer', backgroundColor: '#056699' , outline: 'none' , border: 'none' , borderRadius: '2px'}}>{downloadPdfBtn}</PDFDownloadLink>
                    </GeneratePDF>
                </Suspense>
            }

            <div>
                <NavigateSubHeaderStyle >
                    <span style={{width: '100%'}}>{classDetailsDecode.title} / {classDetailsDecode.grade}</span>
                </NavigateSubHeaderStyle >
                <Table column={TableHeader} data={filteringReportsByDate || []}>

                    <div style={{display: 'flex'}}>
                        <InputStyle type={'date'}  value={searchByDate} onChange={(e)=>{setSearchByDate(e.target.value)}}/>
                        <button style={{padding: '0 5px' , border: 'none' , color: 'white',backgroundColor: 'red',cursor: 'pointer'}} onClick={()=>setSearchByDate('')}>x</button>
                    </div>
                    <h3 style={{color: '#066599' }}>{reportsTitle}</h3>
                </Table>
                <GoBackBtnStyle onClick={()=>{gotoPage(-1)}} >{backBtn}</GoBackBtnStyle>
            </div>
        </>
    )
}



