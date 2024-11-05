import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"
import DataServices from "../../../../Data/dynamic/DataServices"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { thStyle } from "../../../Teachers/teacherInformation/TeacherSubjects"
import { format } from "date-fns"
import { PDFDownloadLink } from "@react-pdf/renderer"
import PrintingPage from "./PrintingPage"
import StudentsPDF from "./StudentsPDF"
import Loader from "../../../Modal/Loader"
import { NavigateSubHeaderStyle } from "../../style/styleTage"
import { GoBackBtnStyle, InputStyle } from "../../../shared/style/styleTag"
import { REPORTCOLUMNS } from "../columnsTools/REPORTCOLUMNS"
import Table from "../../../shared/Table"
import useReportOfClassStatistics from "../../../../hooks/useReportOfClassStatistics"



export default function ClassReportPrint() {
    
    const classDetailsEncode = useLocation().state
    const classDetailsDecode = JSON.parse(decodeURIComponent(classDetailsEncode))
    const [reports] = useReportOfClassStatistics(classDetailsDecode.classId,classDetailsDecode.title)
    const [searchByDate,setSearchByDate] = useState('')
    const gotoPage = useNavigate()

    // start pdf states
    const GeneratePDF = lazy(() => import('../../../Modal/GeneratePDF'))
    const [generateClassPDF,setGenerateClassPDF] = useState(false)
    const [generateStudentsPDF,setGenerateStudentsPDF] = useState(false)
    const [selectedDataToPrint,setSelectedDataToPrint] = useState([])
    const [pdfTitle,setPdfTitle] = useState('')

    function handleCreateClassPDFClicked(classReport,pdfTitle) {
        setPdfTitle(pdfTitle)
        setGenerateClassPDF(true)
        setSelectedDataToPrint(classReport)
    }

    function handleCreateStudentsPDFClicked(studentsReport,pdfTitle) {
        setPdfTitle(pdfTitle)
        setGenerateStudentsPDF(true)
        setSelectedDataToPrint(studentsReport)
    }

    function handlePrintClicked(type) {
        if(type == 'students' ) {
            setTimeout(() => setGenerateStudentsPDF(false) ,500)
        }else {
            setTimeout(() =>setGenerateClassPDF(false),500)
        }

    }

    const TableHeader = useMemo(() => [
        ...REPORTCOLUMNS , 
        {   
            Header: 'Action' ,
            Cell: ({row}) => {
                const {reportTitle ,classTitle } = row.original
                return (
                    <div>
                        <button onClick={()=> handleCreateClassPDFClicked([],`report_${reportTitle}_class_${classTitle}`)} style={{textDecoration: 'none', padding: '4px 10px' , color: 'white' , cursor: 'pointer', backgroundColor: '#056699' , outline: 'none' , border: 'none' , borderRadius: '2px'}}>Create class result PDF</button>
                        <button onClick={()=> handleCreateStudentsPDFClicked([],`report_${reportTitle}_class_${classTitle}_students`)} style={{textDecoration: 'none', padding: '4px 10px' , marginLeft: '2px' ,color: 'white' , cursor: 'pointer', backgroundColor: '#056699' , outline: 'none' , border: 'none' , borderRadius: '2px'}}>Create students report PDF</button>
                    </div>
                )
            }
        }

    ],[])

    


    return (
        <>  
            {
                generateClassPDF && 
                <Suspense fallback={<Loader />} >
                    <GeneratePDF data={selectedDataToPrint} pdfTitle={pdfTitle} printingType={'class'} setDeleteModal={setGenerateClassPDF} >
                        <PDFDownloadLink onClick={()=>handlePrintClicked('class')} document={<PrintingPage data={selectedDataToPrint} />} fileName={pdfTitle +".pdf"} style={{marginRight: '5px',textDecoration: 'none', padding: '1px 10px' , color: 'white' , cursor: 'pointer', backgroundColor: '#056699' , outline: 'none' , border: 'none' , borderRadius: '2px'}}>Download PDF</PDFDownloadLink>
                    </GeneratePDF> 
                </Suspense>
                || 
                generateStudentsPDF && 
                <Suspense fallback={<Loader />}>
                    <GeneratePDF data={selectedDataToPrint} pdfTitle={pdfTitle} printingType={'students'} setDeleteModal={setGenerateStudentsPDF} >
                        <PDFDownloadLink onClick={()=>handlePrintClicked('students')} document={<StudentsPDF data={selectedDataToPrint} />} fileName={pdfTitle +".pdf"} style={{marginRight: '5px',textDecoration: 'none', padding: '1px 10px' , color: 'white' , cursor: 'pointer', backgroundColor: '#056699' , outline: 'none' , border: 'none' , borderRadius: '2px'}}>Download PDF</PDFDownloadLink>
                    </GeneratePDF>
                </Suspense>
            }

            <div>
                <NavigateSubHeaderStyle >
                    <span style={{width: '100%'}}>{classDetailsDecode.title} / {classDetailsDecode.grade}</span>
                </NavigateSubHeaderStyle >
                <Table column={TableHeader} data={reports}>
                    <InputStyle type={'date'}  value={searchByDate} onChange={(e)=>{setSearchByDate(e.target.value)}}/>
                    <h3 style={{color: '#066599' }}>Reports</h3>
                </Table>
                <GoBackBtnStyle onClick={()=>{gotoPage(-1)}} >Back</GoBackBtnStyle>
            </div>
        </>
    )
}

function ShowReportBody({report,classId,examAvg,setExamAvg,quizAvg,setQuizAvg,handleCreateStudentsPDFClicked,handleCreateClassPDFClicked}) {

    const data = {
        month: 'Octobar' ,
        grade : 'Ninth',
        data : [        
            {
                name : 'raboo rashed' ,
                mark: 2300 ,
                totalMark : 2300
            },
            {
                name : 'ahamad kreet' ,
                mark: 2200 ,
                totalMark : 2300
            },
            {
                name : 'murhaf abd aljalil' ,
                mark: 2000 ,
                totalMark : 2300
            },
            {
                name : 'mustafa fares' ,
                mark: 1950 ,
                totalMark : 2300
            },
            {
                name : 'yaser araje' ,
                mark: 1900 ,
                totalMark : 2300
            },
            {
                name : 'ali shabo' ,
                mark: 1850 ,
                totalMark : 2300
            },
            {
                name : 'zaid shanan' ,
                mark: 1800 ,
                totalMark : 2300
            },
            {
                name : 'loai khoga' ,
                mark: 1750 ,
                totalMark : 2300
            },
            {
                name : 'majad karaksha' ,
                mark: 1700 ,
                totalMark : 2300
            },
            {
                name : 'raboo rashed' ,
                mark: 2300 ,
                totalMark : 2300
            },
            {
                name : 'ahamad kreet' ,
                mark: 2200 ,
                totalMark : 2300
            },
            {
                name : 'murhaf abd aljalil' ,
                mark: 2000 ,
                totalMark : 2300
            },
            {
                name : 'mustafa fares' ,
                mark: 1950 ,
                totalMark : 2300
            },
            {
                name : 'yaser araje' ,
                mark: 1900 ,
                totalMark : 2300
            },
            {
                name : 'ali shabo' ,
                mark: 1850 ,
                totalMark : 2300
            },
            {
                name : 'zaid shanan' ,
                mark: 1800 ,
                totalMark : 2300
            },
            {
                name : 'loai khoga' ,
                mark: 1750 ,
                totalMark : 2300
            },
            {
                name : 'majad karaksha' ,
                mark: 1700 ,
                totalMark : 2300
            },
            {
                name : 'raboo rashed' ,
                mark: 2300 ,
                totalMark : 2300
            },
            {
                name : 'ahamad kreet' ,
                mark: 2200 ,
                totalMark : 2300
            },
            {
                name : 'murhaf abd aljalil' ,
                mark: 2000 ,
                totalMark : 2300
            },
            {
                name : 'mustafa fares' ,
                mark: 1950 ,
                totalMark : 2300
            },
            {
                name : 'yaser araje' ,
                mark: 1900 ,
                totalMark : 2300
            },
            {
                name : 'ali shabo' ,
                mark: 1850 ,
                totalMark : 2300
            },
            {
                name : 'zaid shanan' ,
                mark: 1800 ,
                totalMark : 2300
            },
            {
                name : 'loai khoga' ,
                mark: 1750 ,
                totalMark : 2300
            },
            {
                name : 'majad karaksha' ,
                mark: 1700 ,
                totalMark : 2300
            },
            {
                name : 'zaid shanan' ,
                mark: 1800 ,
                totalMark : 2300
            },
            {
                name : 'loai khoga' ,
                mark: 1750 ,
                totalMark : 2300
            },
            {
                name : 'majad karaksha' ,
                mark: 1700 ,
                totalMark : 2300
            }
        ]
    }
    const data_1 = {
        reportId : 1 ,
        reportTitle: 'التقرير الاول',
        classTitle : 'المميزون',
        month: 'ايلول',
        grade: 'بكالوريا',
        students : [
            {
                id: 1,
                fatherName : 'محمد',
                name: 'عبدالفتاح عصله',
                quizAvg: '%90' ,
                order : '25 / 1',
                avrage: '%88' ,
                reportMark : 2900 ,
                reportTotalMark : 3200 ,
                exam : [
                    {
                        subject: 'عربي' ,
                        mark: 350 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'رياضيات' ,
                        mark: 586 ,
                        totalMark : 600 
                    },
                    {
                        subject: 'علوم' ,
                        mark: 330 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'فيزياء' ,
                        mark: 360 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'كيمياء' ,
                        mark: 170 ,
                        totalMark : 200 
                    },
                    {
                        subject: 'انجليزي' ,
                        mark: 284 ,
                        totalMark : 300 
                    },
                    {
                        subject: 'فرنسي' ,
                        mark: 280 ,
                        totalMark : 300 
                    },
                    {
                        subject: 'وطنيه' ,
                        mark: 180 ,
                        totalMark : 200 
                    },
                    {
                        subject: 'ديانه' ,
                        mark: 190 ,
                        totalMark : 200 
                    },
                ]
            },
            {
                id: 2,
                fatherName : 'محمد',
                name: 'محمد ربيع رشيد',
                quizAvg: '%90' ,
                avrage: '%88' ,
                reportMark : 2900 ,
                reportTotalMark : 3200 ,
                order : '25 / 2',
                exam : [
                    {
                        subject: 'عربي' ,
                        mark: 350 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'رياضيات' ,
                        mark: 586 ,
                        totalMark : 600 
                    },
                    {
                        subject: 'علوم' ,
                        mark: 330 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'فيزياء' ,
                        mark: 360 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'كيمياء' ,
                        mark: 170 ,
                        totalMark : 200 
                    },
                    {
                        subject: 'انجليزي' ,
                        mark: 284 ,
                        totalMark : 300 
                    },
                    {
                        subject: 'فرنسي' ,
                        mark: 280 ,
                        totalMark : 300 
                    },
                    {
                        subject: 'وطنيه' ,
                        mark: 180 ,
                        totalMark : 200 
                    },
                    {
                        subject: 'ديانه' ,
                        mark: 190 ,
                        totalMark : 200 
                    },
                ]
            },
            {
                id: 3,
                name: 'احمد قريط',
                fatherName : 'محمد',
                avrage: '%88' ,
                reportMark : 2900 ,
                reportTotalMark : 3200 ,
                quizAvg: '%90' ,
                order : '25 / 3',
                exam : [
                    {
                        subject: 'عربي' ,
                        mark: 350 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'رياضيات' ,
                        mark: 586 ,
                        totalMark : 600 
                    },
                    {
                        subject: 'علوم' ,
                        mark: 330 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'فيزياء' ,
                        mark: 360 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'كيمياء' ,
                        mark: 170 ,
                        totalMark : 200 
                    },
                    {
                        subject: 'انجليزي' ,
                        mark: 284 ,
                        totalMark : 300 
                    },
                    {
                        subject: 'فرنسي' ,
                        mark: 280 ,
                        totalMark : 300 
                    },
                    {
                        subject: 'وطنيه' ,
                        mark: 180 ,
                        totalMark : 200 
                    },
                    {
                        subject: 'ديانه' ,
                        mark: 190 ,
                        totalMark : 200 
                    },
                ]
            },
            {
                id: 4,
                name: 'مرهف عبدالجليل',
                fatherName : 'محمد',
                avrage: '%88' ,
                reportMark : 2900 ,
                reportTotalMark : 3200 ,
                quizAvg: '%90' ,
                order : '25 / 4',
                exam : [
                    {
                        subject: 'عربي' ,
                        mark: 350 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'رياضيات' ,
                        mark: 586 ,
                        totalMark : 600 
                    },
                    {
                        subject: 'علوم' ,
                        mark: 330 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'فيزياء' ,
                        mark: 360 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'كيمياء' ,
                        mark: 170 ,
                        totalMark : 200 
                    },
                    {
                        subject: 'انجليزي' ,
                        mark: 284 ,
                        totalMark : 300 
                    },
                    {
                        subject: 'فرنسي' ,
                        mark: 280 ,
                        totalMark : 300 
                    },
                    {
                        subject: 'وطنيه' ,
                        mark: 180 ,
                        totalMark : 200 
                    },
                    {
                        subject: 'ديانه' ,
                        mark: 190 ,
                        totalMark : 200 
                    },
                ]
            },
            {
                id: 5,
                name: 'محمد علاو',
                fatherName : 'محمد',
                avrage: '%88' ,
                reportMark : 2900 ,
                reportTotalMark : 3200 ,    
                quizAvg: '%90' ,
                order : '25 / 5',
                exam : [
                    {
                        subject: 'عربي' ,
                        mark: 350 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'رياضيات' ,
                        mark: 586 ,
                        totalMark : 600 
                    },
                    {
                        subject: 'علوم' ,
                        mark: 330 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'فيزياء' ,
                        mark: 360 ,
                        totalMark : 400 
                    },
                    {
                        subject: 'كيمياء' ,
                        mark: 170 ,
                        totalMark : 200 
                    },
                    {
                        subject: 'انجليزي' ,
                        mark: 284 ,
                        totalMark : 300 
                    },
                    {
                        subject: 'فرنسي' ,
                        mark: 280 ,
                        totalMark : 300 
                    },
                    {
                        subject: 'وطنيه' ,
                        mark: 180 ,
                        totalMark : 200 
                    },
                    {
                        subject: 'ديانه' ,
                        mark: 190 ,
                        totalMark : 200 
                    },
                ]
            },
        ]
    }

    const {reportTitle,startDate,tests,reportId} = report
    useEffect(() => {
        DataServices.ShowExamAvarageInCurrentClassReport(reportId,classId).then(examAVG => {
            setExamAvg(examAVG[0]?.Average || 0)
        })
        DataServices.ShowQuizAvarageInCurrentClassReport(reportId,classId).then(quizAVG => {
            setQuizAvg(quizAVG[0]?.Average || 0)
        })

    } ,[])
    


    return (
        <>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}></td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{reportTitle}</td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{format(new Date(startDate),'yyyy/MM/dd')}</td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{quizAvg}</td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{examAvg}</td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>{tests?.length}</td>
                <td style={{padding: '15px' , margin: '5px 0' , border: 'none' }}>
                    <div>
                        <button onClick={()=> handleCreateClassPDFClicked(data,reportTitle + '_class')} style={{textDecoration: 'none', padding: '4px 10px' , color: 'white' , cursor: 'pointer', backgroundColor: '#056699' , outline: 'none' , border: 'none' , borderRadius: '2px'}}>Create class result PDF</button>
                        <button onClick={()=> handleCreateStudentsPDFClicked(data_1,reportTitle + '_students')} style={{textDecoration: 'none', padding: '4px 10px' , marginLeft: '2px' ,color: 'white' , cursor: 'pointer', backgroundColor: '#056699' , outline: 'none' , border: 'none' , borderRadius: '2px'}}>Create students report PDF</button>
                    </div>
                </td>
        </>
    )

}


