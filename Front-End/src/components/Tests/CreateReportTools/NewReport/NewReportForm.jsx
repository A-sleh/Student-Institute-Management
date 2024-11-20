
/***  
    CSS-OPTIMAIZATION : DONE , 
    COMPONENTS OPTIMIZATION : DONE ,
    USING REACT QURY : 
*/

import { FormRowStyle, FormStyle, FormSubRowStyle, InputStyle, LabelStyle, SubmitBtnStyle, TextAreaInputStyle } from '../../../shared/style/styleTag'
import {useState} from 'react'
import DataServices from '../../../../Data/dynamic/DataServices'
import Notification from '../../../Global/Notification'
import ErrorMessage from '../../../shared/ErrorMessage'
import { successActionLogic } from '../../../shared/logic/logic'

const initailState =   {
    reportTitle: '',
    startDate: '',
    finishDate: null,
}

export default function NewReportForm() {

    const [reportForm,setReportForm] = useState(initailState)
    const [successCreateReport,setSuccessCreateReport] = useState(false)
    const [validation,setValidation] = useState({
        reportTitle: false,
        startDate: false,
    })
    
    function validInputs() {
        const { reportTitle , startDate } = reportForm

        setValidation({
            reportTitle: reportTitle == '',
            startDate: startDate == '',
        })
        return (startDate == '' || reportTitle == '')
    }
    
    function handleSubmitClicked(e) {
        e.preventDefault() ;

        if(!validInputs()) {
            DataServices.CreateNewReport(reportForm).then( _ => {
                setReportForm(initailState)
                successActionLogic(setSuccessCreateReport)
            })
        }
    }

    return (
        <>
            <Notification title={'create report'} type={'success'} state ={successCreateReport} setState={setSuccessCreateReport}/>
        
            <FormStyle onSubmit={(e)=>{handleSubmitClicked(e)}}>
                <h3>Report Information</h3>

                <FormRowStyle>
                    <FormSubRowStyle width={'100%'}>
                        <LabelStyle color={'#056699'}>Report Title</LabelStyle>
                        <TextAreaInputStyle className={validation.reportTitle ? 'error': ''} value={reportForm.reportTitle} onChange={(e)=>setReportForm({...reportForm,reportTitle: e.target.value})}  />
                        <ErrorMessage message={'Please enter the report title'} showMessage={validation.reportTitle}/>
                        
                    </FormSubRowStyle>
                </FormRowStyle>

                <FormRowStyle>
                    <FormSubRowStyle width={'100%'}>
                        <LabelStyle color={'#056699'}>Start Date</LabelStyle>
                        <InputStyle type="date" className={validation.startDate ? 'error': ''} value={reportForm.startDate} onChange={(e) => setReportForm({...reportForm,startDate: e.target.value})}/>
                        <ErrorMessage message={'You must determain the report date'} showMessage={validation.startDate}/>
                    </FormSubRowStyle>
                </FormRowStyle>

                <SubmitBtnStyle >Create</SubmitBtnStyle>
            </FormStyle>
        </>
    )
}